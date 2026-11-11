// DNS-over-HTTPS lookups for lookalike variants. Works in the browser, Node and Workers;
// callers may pass their own fetch (the endpoint uses that to count subrequests).

const RESOLVERS = {
	cf: (n, t) => `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(n)}&type=${t}`,
	google: (n, t) => `https://dns.google/resolve?name=${encodeURIComponent(n)}&type=${t}`
};

async function queryOnce(provider, name, type, fetchFn) {
	const ctl = new AbortController();
	const timer = setTimeout(() => ctl.abort(), 7000);
	try {
		const res = await fetchFn(RESOLVERS[provider](name, type), {
			headers: { accept: 'application/dns-json' },
			signal: ctl.signal
		});
		if (!res.ok) throw new Error('HTTP ' + res.status);
		return await res.json();
	} finally {
		clearTimeout(timer);
	}
}

/** One DNS question; falls back to the other resolver if the chosen one fails. */
export async function query(provider, name, type, fetchFn = fetch) {
	try {
		return await queryOnce(provider, name, type, fetchFn);
	} catch {
		return await queryOnce(provider === 'cf' ? 'google' : 'cf', name, type, fetchFn);
	}
}

function classify(ns) {
	if (ns.Status === 3) return 'available';
	if (ns.Status === 0 && (ns.Answer || []).some((r) => r.type === 2)) return 'registered';
	if (ns.Status === 2) return 'broken';
	return 'unknown';
}

/** Fills in status, A and MX records on a variant. One query if unregistered, three if not. */
export async function check(provider, v, fetchFn = fetch) {
	try {
		v.status = classify(await query(provider, v.ascii, 'NS', fetchFn));
		if (v.status === 'registered') {
			const [a, mx] = await Promise.all([
				query(provider, v.ascii, 'A', fetchFn),
				query(provider, v.ascii, 'MX', fetchFn)
			]);
			v.a = (a.Answer || []).filter((r) => r.type === 1).map((r) => r.data);
			v.mx = (mx.Answer || [])
				.filter((r) => r.type === 15)
				.map((r) => String(r.data).split(/\s+/).pop().replace(/\.$/, ''))
				.filter(Boolean);
		}
	} catch {
		v.status = 'unknown';
	}
}

export function level(v) {
	if (v.status !== 'registered') return v.status;
	return v.mx.length ? 'mail' : v.a.length ? 'web' : 'parked';
}

export const LEVEL_TEXT = {
	mail: 'Email ready',
	web: 'Live',
	parked: 'Registered',
	broken: 'Registered, DNS failing',
	unknown: 'Unclear',
	available: 'Unregistered',
	pending: 'Waiting'
};

export const LEVEL_ORDER = ['mail', 'web', 'parked', 'broken', 'unknown', 'pending', 'available'];

/** Whether a finished variant belongs in the default (taken or unclear) result list. */
export const isFinding = (v) => ['registered', 'broken', 'unknown'].includes(v.status);

export function toCsv(rows) {
	const q = (s) => '"' + String(s).replace(/"/g, '""') + '"';
	return ['domain,punycode,technique,status,ip,mail_server']
		.concat(
			rows.map((v) =>
				[v.domain, v.ascii, v.technique, LEVEL_TEXT[level(v)], v.a.join(' '), v.mx.join(' ')]
					.map(q)
					.join(',')
			)
		)
		.join('\n');
}
