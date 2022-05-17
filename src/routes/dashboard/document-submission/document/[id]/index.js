import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const res = await api.get(`document/${params.id}/`, locals.access);
	const categories = await api.get(`document_category/`, locals.access);

	if (res.detail) {
		return {
			status: 404,
			ok: false
		};
	}

	return {
		ok: true,
		body: {
			data: res,
			categories
		}
	};
}

export async function patch({ params, locals, request }) {
	const body = await request.json();

	const res = await api.patch(`document/${params.id}/`, body, locals.access);

	if (!res.title) {
		return {
			status: 400,
			ok: false
		};
	}

	return {
		status: 200,
		ok: true,
		body: { data: res }
	};
}
