import * as api from '$lib/api.js';

export async function get({ url, params, locals }) {
	console.log(url);

	// const q = new URLSearchParams([
	// 	['page', page],
	// 	[type, encodeURIComponent(params.user)]
	// ]);

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
