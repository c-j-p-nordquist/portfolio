// Lookalike domain generation. Pure functions, shared by the /lookslike page (browser)
// and its plain-text endpoint (server).

const KEYS = {
	q: 'wa',
	w: 'qeas',
	e: 'wrsd',
	r: 'etdf',
	t: 'ryfg',
	y: 'tugh',
	u: 'yihj',
	i: 'uojk',
	o: 'ipkl',
	p: 'ol',
	a: 'qwsz',
	s: 'awedxz',
	d: 'serfcx',
	f: 'drtgvc',
	g: 'ftyhbv',
	h: 'gyujnb',
	j: 'huikmn',
	k: 'jiolm',
	l: 'kop',
	z: 'asx',
	x: 'zsdc',
	c: 'xdfv',
	v: 'cfgb',
	b: 'vghn',
	n: 'bhjm',
	m: 'njk',
	1: '2q',
	2: '13w',
	3: '24e',
	4: '35r',
	5: '46t',
	6: '57y',
	7: '68u',
	8: '79i',
	9: '80o',
	0: '9p'
};

const GLYPHS = {
	o: ['0'],
	0: ['o'],
	l: ['1', 'i'],
	i: ['1', 'l'],
	1: ['l', 'i'],
	m: ['rn', 'nn'],
	rn: ['m'],
	w: ['vv'],
	vv: ['w'],
	d: ['cl'],
	cl: ['d'],
	g: ['q', '9'],
	q: ['g'],
	s: ['5'],
	5: ['s'],
	e: ['3'],
	a: ['4'],
	t: ['7'],
	z: ['2'],
	u: ['v'],
	v: ['u'],
	b: ['6', 'lb'],
	n: ['h', 'r'],
	h: ['n'],
	c: ['e'],
	k: ['lc']
};

const IDN = {
	a: ['à', 'á', 'â', 'ä', 'å', 'а'],
	e: ['é', 'è', 'ê', 'ë', 'е'],
	o: ['ó', 'ò', 'ô', 'ö', 'ø', 'о'],
	i: ['í', 'ì', 'ï', 'ı', 'і'],
	u: ['ú', 'ù', 'ü'],
	c: ['ç', 'с'],
	p: ['р'],
	x: ['х'],
	y: ['ý', 'ÿ', 'у'],
	s: ['ś', 'š', 'ѕ'],
	n: ['ñ', 'ń'],
	z: ['ž', 'ż'],
	l: ['ł'],
	å: ['a'],
	ä: ['a', 'æ'],
	ö: ['o', 'ø'],
	é: ['e'],
	ü: ['u'],
	ø: ['o', 'ö'],
	æ: ['ae', 'ä']
};

const TLDS = [
	'com',
	'net',
	'org',
	'co',
	'io',
	'info',
	'biz',
	'eu',
	'se',
	'nu',
	'no',
	'dk',
	'fi',
	'de',
	'app',
	'dev',
	'online',
	'site',
	'shop',
	'xyz',
	'top',
	'cc',
	'cm',
	'om'
];

const KEYWORDS = ['login', 'secure', 'support', 'account', 'portal', 'mail'];

// Two-label public suffixes worth knowing about; anything else is treated as name.tld.
const SUFFIX2 = new Set([
	'co.uk',
	'org.uk',
	'ac.uk',
	'gov.uk',
	'me.uk',
	'com.au',
	'net.au',
	'org.au',
	'co.nz',
	'co.jp',
	'com.br',
	'co.za',
	'com.tr',
	'com.mx',
	'co.in',
	'com.sg',
	'com.cn',
	'com.hk',
	'com.tw',
	'co.kr',
	'com.ar',
	'com.pl',
	'co.il',
	'com.ua'
]);

const replaceAt = (chars, i, to) => {
	const copy = [...chars];
	copy[i] = to;
	return copy.join('');
};

export const TECHNIQUES = [
	{
		id: 'omission',
		label: 'Missing letter',
		on: true,
		fn: (c) => c.map((_, i) => c.filter((_, j) => j !== i).join(''))
	},
	{
		id: 'repetition',
		label: 'Doubled letter',
		on: true,
		fn: (c) => c.map((ch, i) => [...c.slice(0, i), ch, ...c.slice(i)].join(''))
	},
	{
		id: 'transposition',
		label: 'Swapped letters',
		on: true,
		fn: (c) => {
			const out = [];
			for (let i = 0; i < c.length - 1; i++) {
				if (c[i] === c[i + 1]) continue;
				const d = [...c];
				[d[i], d[i + 1]] = [d[i + 1], d[i]];
				out.push(d.join(''));
			}
			return out;
		}
	},
	{
		id: 'replacement',
		label: 'Neighbouring key',
		on: true,
		fn: (c) => c.flatMap((ch, i) => [...(KEYS[ch] || '')].map((k) => replaceAt(c, i, k)))
	},
	{
		id: 'insertion',
		label: 'Extra key press',
		on: true,
		fn: (c) => {
			const out = [];
			c.forEach((ch, i) => {
				for (const k of KEYS[ch] || '') {
					out.push([...c.slice(0, i + 1), k, ...c.slice(i + 1)].join(''));
					if (i > 0) out.push([...c.slice(0, i), k, ...c.slice(i)].join(''));
				}
			});
			return out;
		}
	},
	{
		id: 'homoglyph',
		label: 'Lookalike characters',
		on: true,
		fn: (c) => {
			const s = c.join('');
			const out = [];
			for (const [from, tos] of Object.entries(GLYPHS)) {
				let at = s.indexOf(from);
				while (at !== -1) {
					for (const to of tos) out.push(s.slice(0, at) + to + s.slice(at + from.length));
					at = s.indexOf(from, at + 1);
				}
			}
			return out;
		}
	},
	{
		id: 'idn',
		label: 'Accented and Cyrillic',
		on: true,
		fn: (c) => c.flatMap((ch, i) => (IDN[ch] || []).map((to) => replaceAt(c, i, to)))
	},
	{
		id: 'vowel',
		label: 'Vowel swap',
		on: true,
		fn: (c) =>
			c.flatMap((ch, i) =>
				'aeiou'.includes(ch)
					? [...'aeiou'].filter((v) => v !== ch).map((v) => replaceAt(c, i, v))
					: []
			)
	},
	{
		id: 'hyphen',
		label: 'Added hyphen',
		on: true,
		fn: (c) => {
			const out = [];
			for (let i = 1; i < c.length; i++) {
				if (c[i] !== '-' && c[i - 1] !== '-') {
					out.push([...c.slice(0, i), '-', ...c.slice(i)].join(''));
				}
			}
			return out;
		}
	},
	{
		id: 'bitsquat',
		label: 'Bit flip',
		on: true,
		fn: (c) => {
			const out = [];
			c.forEach((ch, i) => {
				const code = ch.charCodeAt(0);
				if (ch.length !== 1 || code > 127) return;
				for (let b = 0; b < 8; b++) {
					const flipped = String.fromCharCode(code ^ (1 << b));
					if (/[a-z0-9-]/.test(flipped)) out.push(replaceAt(c, i, flipped));
				}
			});
			return out;
		}
	},
	{
		id: 'addition',
		label: 'Extra character at end',
		on: false,
		fn: (c) => [...'abcdefghijklmnopqrstuvwxyz0123456789'].map((k) => c.join('') + k)
	},
	{
		id: 'keyword',
		label: 'Added word',
		on: true,
		fn: (c) => {
			const s = c.join('');
			return KEYWORDS.flatMap((k) => [s + '-' + k, s + k, k + '-' + s]);
		}
	},
	{ id: 'tld', label: 'Other ending', on: true, tld: true }
];

export const DEFAULT_TECHNIQUES = TECHNIQUES.filter((t) => t.on).map((t) => t.id);

function toAscii(host) {
	try {
		const h = new URL('http://' + host).hostname;
		return /^(?=.{4,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]*[a-z0-9]$/.test(h)
			? h
			: null;
	} catch {
		return null;
	}
}

/** Accepts a domain, URL or email address and returns its registrable name and suffix. */
export function parseDomain(input) {
	const invalid = { error: 'Enter a full domain such as example.se.' };
	let s = String(input || '')
		.trim()
		.toLowerCase();
	s = s.replace(/^[a-z][a-z0-9+.-]*:\/\//, '').split(/[/?#]/)[0];
	if (s.includes('@')) s = s.slice(s.lastIndexOf('@') + 1);
	s = s
		.replace(/:\d+$/, '')
		.replace(/\.$/, '')
		.replace(/^www\./, '');
	const labels = s.split('.');
	if (labels.length < 2 || labels.some((l) => !l)) return invalid;
	const suffixLen = labels.length > 2 && SUFFIX2.has(labels.slice(-2).join('.')) ? 2 : 1;
	const suffix = labels.slice(-suffixLen).join('.');
	const name = labels[labels.length - suffixLen - 1];
	if (!name) return invalid;
	const ascii = toAscii(name + '.' + suffix);
	if (!ascii) return { error: 'That does not look like a valid domain name.' };
	return { name, suffix, domain: name + '.' + suffix, ascii };
}

/** Deduplicated variants of a parsed domain for the enabled technique ids (a Set). */
export function generate(parsed, enabled) {
	const seen = new Set([parsed.ascii]);
	const out = [];
	const chars = [...parsed.name];
	for (const t of TECHNIQUES) {
		if (!enabled.has(t.id)) continue;
		const candidates = t.tld
			? TLDS.filter((x) => x !== parsed.suffix).map((x) => parsed.name + '.' + x)
			: t.fn(chars).map((n) => n + '.' + parsed.suffix);
		for (const domain of candidates) {
			const ascii = toAscii(domain);
			if (!ascii || seen.has(ascii)) continue;
			seen.add(ascii);
			out.push({ domain, ascii, technique: t.label, status: 'pending', a: [], mx: [] });
		}
	}
	return out;
}
