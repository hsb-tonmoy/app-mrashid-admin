const API_URL = import.meta.env.VITE_API_URL;

async function send({ method, path, data, token }) {
	const opts = {
		method,
		headers: {}
	};

	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `JWT ${token}`;
	}

	return fetch(`${API_URL}/${path}`, opts)
		.then((r) => r.json())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}

export function patch(path, data, token) {
	return send({ method: 'PATCH', path, data, token });
}
