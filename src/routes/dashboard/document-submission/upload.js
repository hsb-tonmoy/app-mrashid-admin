import * as api from '$lib/api.js';

export async function post({ locals, request }) {
	const body = await request.formData();

	const res = await api.post(`document/`, body, locals.access, true);

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
