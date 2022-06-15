import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const res = await api.get(`document_category/${params.id}/`, locals.access);

	if (res.detail) {
		return {
			status: 404,
			ok: false
		};
	}

	return {
		ok: true,
		body: { data: res }
	};
}

export async function patch({ params, locals, request }) {
	const body = await request.json();
	const res = await api.patch(`document_category/${params.id}/`, body, locals.access);

	if (res.detail) {
		return {
			status: 400,
			ok: false
		};
	}

	return {
		status: 200,
		ok: true,
		body: {
			data: res
		}
	};
}
