// Regenerates static/images/og-image.png from og-image/og-image.html using
// locally installed Chrome's headless screenshot mode. No extra dependencies.
//
// Usage: node og-image/build.mjs

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, 'og-image.html');
const output = path.join(__dirname, '..', 'static', 'images', 'og-image.png');

const CHROME_CANDIDATES = [
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/Applications/Chromium.app/Contents/MacOS/Chromium',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium-browser',
	'/usr/bin/chromium'
];

const chrome = CHROME_CANDIDATES.find((p) => existsSync(p));

if (!chrome) {
	console.error('Could not find a Chrome/Chromium binary in the usual locations.');
	console.error('Install Google Chrome, or edit CHROME_CANDIDATES in og-image/build.mjs.');
	process.exit(1);
}

execFileSync(
	chrome,
	[
		'--headless=new',
		'--disable-gpu',
		'--window-size=1200,630',
		`--screenshot=${output}`,
		`file://${source}`
	],
	{ stdio: 'inherit' }
);

console.log(`OG image built: ${path.relative(process.cwd(), output)}`);
