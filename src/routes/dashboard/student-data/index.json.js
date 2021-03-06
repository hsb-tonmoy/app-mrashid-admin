import * as api from '$lib/api.js';

export async function get({ url, params, locals }) {
	const body = await api.get(`student_data/${url.search}`, locals.access);

	if (body.detail) {
		return {
			status: 404,
			ok: false
		};
	}

	return {
		ok: true,
		body
	};
}
