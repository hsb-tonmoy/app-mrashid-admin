import * as api from '$lib/api';

export async function post() {
	const res = await api.post('auth/logout/');
	return {
		headers: {
			'set-cookie': [
				'refresh=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
				'access=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT',
				'user=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
			]
		},

		body: {
			ok: true
		}
	};
}
