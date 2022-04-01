export default function loadStudentData(filterText) {
	return new Promise(async (resolve, reject) => {
		const res = await fetch(`/dashboard/student-data.json?search=${filterText}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await res.json();
		if (res.status === 200) {
			setTimeout(
				resolve(
					data.sort((a, b) => {
						if (a.id > b.id) return 1;
						if (a.id < b.id) return -1;
					})
				),
				2000
			);
		} else {
			reject();
		}
	});
}
