import { redirect } from '@sveltejs/kit';

// Ivory was selected; keep old preview links working.
export function load() {
	throw redirect(308, '/');
}
