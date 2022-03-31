// export default function loadStudentData(filterText) {
// 	return new Promise((resolve, reject) => {
// 		const xhr = new XMLHttpRequest();
// 		xhr.open('GET', `http://localhost:8000/api/v1/student_data/?search=${filterText}`);
// 		xhr.send();

// 		xhr.onload = () => {
// 			if (xhr.status >= 200 && xhr.status < 300) {
// 				setTimeout(
// 					resolve(
// 						JSON.parse(xhr.response).sort((a, b) => {
// 							if (a.name > b.name) return 1;
// 							if (a.name < b.name) return -1;
// 						})
// 					),
// 					2000
// 				);
// 			} else {
// 				reject();
// 			}
// 		};
// 	});
// }
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
