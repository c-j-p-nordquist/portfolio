// Regenerates static/files/pn_resume_26.pdf from resume/resume.html using
// locally installed Chrome's headless print-to-pdf. No extra dependencies
// (no puppeteer/playwright) — just a system Chrome binary.
//
// Usage: node resume/build.mjs

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(__dirname, 'resume.html');
const output = path.join(__dirname, '..', 'static', 'files', 'pn_resume_26.pdf');

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
	console.error('Install Google Chrome, or edit CHROME_CANDIDATES in resume/build.mjs.');
	process.exit(1);
}

execFileSync(
	chrome,
	[
		'--headless=new',
		'--disable-gpu',
		'--no-pdf-header-footer',
		`--print-to-pdf=${output}`,
		`file://${source}`
	],
	{ stdio: 'inherit' }
);

console.log(`Resume built: ${path.relative(process.cwd(), output)}`);
