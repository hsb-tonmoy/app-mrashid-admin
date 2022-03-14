import * as api from '$lib/api.js';

export async function get({ url, locals }) {
	console.log(url.search);
	const res = await api.get(`student_progress/${url.search.id}/`, locals.access);

	if (res.detail) {
		return {
			status: 400,
			ok: false,
			body: res
		};
	}

	return {
		status: 200,
		ok: true,
		body: res
	};
}

export async function patch({ url, locals, request }) {
	const body = await request.json();

	const res = await api.patch(`student_progress/${url.search}/`, body, locals.access);

	if (res.error) {
		return {
			status: 400,
			ok: false,
			body: res
		};
	}

	return {
		status: 200,
		ok: true,
		body: res
	};
}
