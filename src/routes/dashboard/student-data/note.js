import * as api from '$lib/api.js';

export async function post({ locals, request }) {
	const body = await request.json();

	const res = await api.post(`note/`, body, locals.access);

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
