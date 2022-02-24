import * as api from '$lib/api.js';

export async function get({ url, params, locals }) {
	const res = await api.get(`student_data/${params.username}`, locals.access);

	if (res.detail) {
		return {
			status: 404,
			ok: false
		};
	}

	return {
		ok: true,
		body: {
			data: res
		}
	};
}
