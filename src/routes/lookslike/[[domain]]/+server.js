// Terminal side of /lookslike. SvelteKit sends requests that prefer text/html to the
// page next to this file and everything else (curl, wget, fetch) here.
//
//   curl https://philip.nordquist.me/lookslike/example.se
//   curl 'https://philip.nordquist.me/lookslike?example.se'
//
// Each DNS question is one Cloudflare subrequest. The free Workers plan allows 50 per
// request and paid plans 10,000, so the scan stops at LOOKSLIKE_MAX_LOOKUPS (default 45)
// and prints the command that continues from there.
import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { DEFAULT_TECHNIQUES, generate, parseDomain } from '$lib/lookalike/variants.js';
import { check, isFinding, level } from '$lib/lookalike/dns.js';

const CONCURRENCY = 6; // Workers only keep six outgoing connections waiting at once.
const PER_VARIANT = 3; // NS, then A and MX when the name is registered.
// Most registered lookalikes are other endings and lookalike characters, so those go
// first: on the free plan one request only gets through about 40 variants.
const PRIORITY = ['Other ending', 'Lookalike characters', 'Accented and Cyrillic'];
const TAGS = {
	mail: 'EMAIL',
	web: 'LIVE',
	parked: 'REG',
	broken: 'BROKEN',
	unknown: '?',
	available: '-'
};

const usage = (origin) => `lookslike: which typo and lookalike versions of a domain are registered?

  curl ${origin}/lookslike/example.se
  curl '${origin}/lookslike?example.se'

Options (query string):
  format=json   JSON instead of text (or send Accept: application/json)
  all           include unregistered variants
  dns=google    ask Google DNS instead of Cloudflare DNS
  from=N        continue a scan that stopped at its lookup limit
  list          only print the variants, one per line, without looking them up

Output columns: status, domain, technique, IP address, mail server.
  EMAIL   has MX records, so it can send and receive mail as that name
  LIVE    points to a server
  REG     registered, but points nowhere yet
  BROKEN  registered, DNS failing
  ?       unclear

A registered lookalike is not proof of bad intent, and the list is a lower bound.

One request does a limited number of DNS lookups, most likely variants first, then
prints the command that continues. To check everything in one go, resolve locally:

  curl -s '${origin}/lookslike/example.se?list' | while read d; do
    [ -n "$(dig +short NS "$d")" ] && echo "$d"; done

Open ${origin}/lookslike in a browser for the interactive version.
`;

const plain = (body, status = 200) =>
	new Response(body, {
		status,
		headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store' }
	});

function requestedDomain(url, params) {
	if (params.domain) return params.domain;
	const named = url.searchParams.get('domain');
	if (named) return named;
	// Bare form: /lookslike?example.se
	for (const [key, value] of url.searchParams) if (value === '' && key.includes('.')) return key;
	return '';
}

function lookupLimit() {
	const configured = Number(env.LOOKSLIKE_MAX_LOOKUPS);
	if (configured > 0) return configured;
	return dev ? Infinity : 45;
}

/**
 * Checks rows[from..] in order until done, stopped, or the lookup limit cannot cover
 * another variant. Returns the index of the first variant that was not checked.
 */
async function scan(rows, { from, provider, limit, onResult, stopped }) {
	let next = from;
	let used = 0;
	let reserved = 0;

	const worker = async () => {
		while (!stopped() && next < rows.length && used + reserved + PER_VARIANT <= limit) {
			const v = rows[next++];
			let held = PER_VARIANT;
			reserved += held;
			const counted = (input, init) => {
				used++;
				if (held > 0) {
					held--;
					reserved--;
				}
				return fetch(input, init);
			};
			await check(provider, v, counted);
			reserved -= held;
			onResult(v);
		}
	};
	await Promise.all(Array.from({ length: CONCURRENCY }, worker));

	// Workers that quit early on stop() leave nothing half-done; `next` is the resume point.
	return { next, used };
}

const summarise = (rows) => ({
	checked: rows.filter((v) => v.status !== 'pending').length,
	registered: rows.filter((v) => v.status === 'registered' || v.status === 'broken').length,
	live: rows.filter((v) => v.a.length).length,
	email: rows.filter((v) => v.mx.length).length
});

export async function GET({ url, params, request }) {
	const input = requestedDomain(url, params);
	if (!input) return plain(usage(url.origin));

	const parsed = parseDomain(input);
	if (parsed.error) return plain(`${parsed.error}\n\n${usage(url.origin)}`, 400);

	const wantsJson =
		url.searchParams.get('format') === 'json' ||
		(request.headers.get('accept') || '').includes('application/json');
	const showAll = url.searchParams.has('all');
	const provider = url.searchParams.get('dns') === 'google' ? 'google' : 'cf';
	const rank = (v) => PRIORITY.indexOf(v.technique) + 1 || PRIORITY.length + 1;
	const rows = generate(parsed, new Set(DEFAULT_TECHNIQUES)).sort((x, y) => rank(x) - rank(y));
	if (url.searchParams.has('list')) return plain(rows.map((v) => v.ascii).join('\n') + '\n');
	const from = Math.min(
		Math.max(parseInt(url.searchParams.get('from') || '0', 10) || 0, 0),
		rows.length
	);
	const limit = lookupLimit();
	const wanted = (v) => showAll || isFinding(v);

	const continueUrl = (next) => {
		const u = new URL(`${url.origin}/lookslike/${parsed.ascii}`);
		for (const key of ['format', 'all', 'dns']) {
			if (url.searchParams.has(key)) u.searchParams.set(key, url.searchParams.get(key));
		}
		u.searchParams.set('from', next);
		return u.toString().replace(/=(&|$)/g, '$1');
	};

	if (wantsJson) {
		const { next } = await scan(rows, {
			from,
			provider,
			limit,
			onResult() {},
			stopped: () => false
		});
		const done = rows.slice(from, next);
		return json(
			{
				domain: parsed.domain,
				variants: rows.length,
				from,
				...summarise(done),
				next: next < rows.length ? continueUrl(next) : null,
				results: done.filter(wanted).map((v) => ({
					domain: v.domain,
					punycode: v.ascii,
					technique: v.technique,
					status: level(v),
					a: v.a,
					mx: v.mx
				}))
			},
			{ headers: { 'cache-control': 'no-store' } }
		);
	}

	// Text: one line per finding, written as soon as it is known.
	const width = Math.max(...rows.map((v) => v.ascii.length), 6) + 2;
	const line = (v) => {
		const first = (list) =>
			list.length ? list[0] + (list.length > 1 ? ` +${list.length - 1}` : '') : '-';
		return (
			[
				TAGS[level(v)].padEnd(7),
				v.ascii.padEnd(width),
				v.technique.padEnd(24),
				first(v.a).padEnd(18),
				first(v.mx)
			]
				.join('')
				.trimEnd() + '\n'
		);
	};

	const encoder = new TextEncoder();
	let cancelled = false;
	const started = Date.now();

	const stream = new ReadableStream({
		start(controller) {
			const write = (s) => !cancelled && controller.enqueue(encoder.encode(s));
			write(
				`lookslike ${parsed.domain}: ${rows.length} variants` +
					(from ? `, continuing from ${from}` : '') +
					`, ${provider === 'cf' ? 'Cloudflare' : 'Google'} DNS\n\n`
			);
			scan(rows, {
				from,
				provider,
				limit,
				onResult: (v) => wanted(v) && write(line(v)),
				stopped: () => cancelled
			})
				.then(({ next }) => {
					const s = summarise(rows.slice(from, next));
					const seconds = ((Date.now() - started) / 1000).toFixed(1);
					write(
						`\nchecked ${s.checked}, registered ${s.registered}, live ${s.live}, email ${s.email} (${seconds}s)\n`
					);
					if (next < rows.length) {
						write(
							`stopped at the lookup limit with ${rows.length - next} variants left. Continue:\n` +
								`  curl '${continueUrl(next)}'\n`
						);
					}
				})
				.catch((e) => write(`\nscan failed: ${e?.message || e}\n`))
				.finally(() => !cancelled && controller.close());
		},
		cancel() {
			cancelled = true;
		}
	});

	return new Response(stream, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'no-store',
			'x-content-type-options': 'nosniff'
		}
	});
}
