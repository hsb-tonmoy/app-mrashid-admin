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
