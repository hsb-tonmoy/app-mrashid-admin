<script>
	import { convertDate } from '$lib/convertDate';
	import TableDropdown from '$lib/Dashboard/Components/Dropdowns/TableDropdown.svelte';

	export let color = 'light';

	const headers = [
		'ID',
		'Email',
		'First Name',
		'Last Name',
		'Destination',
		'Degree',
		'Major',
		'English Proficiency',
		'Status',
		'Rating',
		'Created At'
	];

	const data = [
		{
			id: 2,
			email: 'hasibaman.tonmoy@gmail.com',
			first_name: 'Hasibaman',
			last_name: 'Tonmoy',
			destination: 'USA',
			degree: 'Undergraduate',
			major: 'Aviation',
			english_proficiency: 'ielts',
			created: '2022-02-16T17:37:35.672123-06:00',
			status: 0,
			rating: 1
		},
		{
			id: 1,
			email: 'hasibuzZaman.tonmoy@gmail.com',
			first_name: 'Hasibuzzaman',
			last_name: 'Tonmoy',
			destination: 'USA',
			degree: 'Undergraduate',
			major: 'Aviation',
			english_proficiency: 'ielts',
			created: '2022-02-15T16:37:24-06:00',
			status: 4,
			rating: 1
		}
	];
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light'
		? 'bg-white'
		: 'bg-red-800 text-white'}"
>
	<div class="rounded-t mb-0 px-4 py-3 border-0">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
					Student Data
				</h3>
			</div>
		</div>
	</div>
	<div class="block w-full overflow-x-auto">
		<!-- Projects table -->
		<table class="items-center w-full bg-transparent border-collapse">
			<thead>
				<tr>
					{#each headers as header}
						<th
							class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left {color ===
							'light'
								? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
								: 'bg-red-700 text-red-200 border-red-600'}"
						>
							{header}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each data as student}
					<tr>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.id}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.email}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.first_name}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.last_name}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.destination}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.degree}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.major}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.english_proficiency}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.status}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{student.rating}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
						>
							{convertDate(student.created)}
						</td>
						<td
							class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
						>
							<TableDropdown />
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
