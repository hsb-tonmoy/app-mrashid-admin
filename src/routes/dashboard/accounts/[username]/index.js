import * as api from '$lib/api.js';

export async function get({ params, locals }) {
	const res = await api.get(`accounts/${params.username}/`, locals.access);

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

	const student_id = body.student.id;
	body['student'] = student_id;

	const res = await api.patch(`accounts/${params.username}/`, body, locals.access);

	if (!(res.first_name && res.last_name)) {
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

export async function del({ params, locals }) {
	const { status, error } = await api.del(`accounts/${params.username}/`, locals.access);

	return {
		status,
		ok: true
	};
}
