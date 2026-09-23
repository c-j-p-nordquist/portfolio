// Import the authoritative base resume from the sibling cv project, unchanged.
// Usage: npm run resume:sync -- /path/to/base.pdf
// resume:build remains a compatibility alias; it no longer renders resume.html.
import { copyFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const directory = path.dirname(fileURLToPath(import.meta.url));
const source = process.argv[2]
	? path.resolve(process.argv[2])
	: path.resolve(directory, '../../cv/dist/base.pdf');
const output = path.resolve(directory, '../static/files/pn_resume_26.pdf');

try {
	const pdf = readFileSync(source);
	if (pdf.subarray(0, 5).toString() !== '%PDF-') {
		throw new Error('The source does not have a PDF header.');
	}
	copyFileSync(source, output);
	console.log(`Resume imported unchanged: ${source} -> ${output}`);
} catch (error) {
	console.error(`Could not import resume: ${error.message}`);
	console.error(
		'Build the base resume in the cv project, or pass its PDF path to npm run resume:sync.'
	);
	process.exitCode = 1;
}
