// Regenerates the Open Graph images in static/images/ from the HTML sources in
// this directory using locally installed Chrome's headless screenshot mode. No
// extra dependencies.
//
// Usage: node og-image/build.mjs

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const IMAGES = [
	{ source: 'og-philip.html', output: 'og-philip.png', size: '1200,630' },
	// Project covers are rendered at 2x for sharp cards and write-up headers.
	{
		source: 'covers/brokerage-mcp.html',
		output: 'projects/brokerage-mcp/cover.png',
		size: '800,556',
		scale: 2
	}
];

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

for (const { source, output, size, scale = 1 } of IMAGES) {
	const sourcePath = path.join(__dirname, source);
	const outputPath = path.join(__dirname, '..', 'static', 'images', output);

	execFileSync(
		chrome,
		[
			'--headless=new',
			'--disable-gpu',
			`--window-size=${size}`,
			`--force-device-scale-factor=${scale}`,
			'--hide-scrollbars',
			'--virtual-time-budget=3000',
			`--screenshot=${outputPath}`,
			`file://${sourcePath}`
		],
		{ stdio: 'inherit' }
	);

	console.log(`OG image built: ${path.relative(process.cwd(), outputPath)}`);
}
