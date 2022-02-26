import * as api from '$lib/api.js';

export async function post({ url, locals, request }) {
	const body = await request.json();
	const res = await api.post(`send_email/${url.search}`, body, locals.access);

	if (res.error) {
		return {
			status: 400,
			ok: false,
			body
		};
	}

	return {
		status: 200,
		ok: true,
		body
	};
}
