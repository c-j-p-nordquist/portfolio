import { redirect } from '@sveltejs/kit';

// The project list lives on the home page.
export function load() {
	throw redirect(308, '/#projects');
}
