import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const res = await api.get(`document/?student_data=${params.id}`, locals.access);

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
