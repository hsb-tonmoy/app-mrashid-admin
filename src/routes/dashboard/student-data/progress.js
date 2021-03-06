import * as api from '$lib/api.js';

export async function patch({ url, locals, request }) {
	const body = await request.json();

	const res = await api.patch(
		`student_progress/${url.searchParams.get('id')}/`,
		body,
		locals.access
	);

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
