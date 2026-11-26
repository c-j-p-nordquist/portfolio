import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	// Optional cap on DNS lookups per /lookslike request. Unset means the default in +server.js.
	LOOKSLIKE_MAX_LOOKUPS: {
		schema: (value) => (value ? Number(value) : undefined)
	}
});
