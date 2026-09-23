import { redirect } from '@sveltejs/kit';

// The profile moved to /about when the site became projects-first.
export function load() {
	throw redirect(308, '/about');
}
