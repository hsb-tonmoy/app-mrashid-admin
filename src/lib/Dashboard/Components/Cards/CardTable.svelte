<script>
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	import { convertDate } from '$lib/convertDate';
	import TableDropdown from '$lib/Dashboard/Components/Dropdowns/TableDropdown.svelte';

	export let color = 'light';

	let grid;

	function statusLight(cell) {
		let color;
		let text;

		if (cell === 0) {
			color = 'text-gray-500';
			text = 'Default';
		} else if (cell === 1) {
			color = 'text-yellow-500';
			text = 'Package sent';
		} else if (cell === 2) {
			color = 'text-green-500';
			text = 'Converted';
		} else if (cell === 3) {
			color = 'text-orange-500';
			text = 'Follow-up';
		}

		return `<i class="fas fa-circle ${color} mr-2"></i> ${text}`;
	}

	const columns = [
		{
			id: 'id',
			name: 'ID'
		},
		{
			id: 'email',
			name: 'Email'
		},
		{
			id: 'first_name',
			name: 'First Name'
		},
		{
			id: 'last_name',
			name: 'Last Name'
		},
		{
			id: 'destination',
			name: 'Destination'
		},
		{
			id: 'degree',
			name: 'Degree'
		},
		{
			id: 'major',
			name: 'Major'
		},
		{
			id: 'english_proficiency',
			name: 'English Proficiency'
		},
		{
			id: 'status',
			name: 'Status',
			formatter: (cell) => html(`${statusLight(cell)}`)
		},
		{
			id: 'rating',
			name: 'Rating'
		},
		{
			id: 'created',
			name: 'Created At'
		}
	];

	const className = {
		container: 'studentdata-container',
		table: 'studentdata-table',
		thead: 'studentdata-thead',
		tr: 'studentdata-tr',
		th: 'studentdata-th',
		td: 'studentdata-td',
		pagination: 'studentdata-pagination',
		paginationSummary: 'studentdata-pagination-summary',
		paginationButton: 'studentdata-pagination-button',
		paginationButtonNext: 'studentdata-pagination-button-next',
		paginationButtonCurrent: 'studentdata-pagination-button-current',
		paginationButtonPrev: 'studentdata-pagination-button-previous'
	};
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

		<Grid
			{className}
			bind:instance={grid}
			sort={{
				multiColumn: false,
				server: {
					url: (prev, columns) => {
						if (!columns.length) return prev;

						const col = columns[0];
						const dir = col.direction === 1 ? '' : '-';
						let colName = [
							'id',
							'email',
							'first_name',
							'last_name',
							'destination',
							'degree',
							'major',
							'english_proficiency',
							'status',
							'rating',
							'created'
						][col.index];

						return `${prev}?ordering=${dir}${colName}`;
					}
				}
			}}
			pagination={{
				enabled: true,
				limit: 50,
				server: {
					url: (prev, page, limit) =>
						`${prev}${prev.includes('?') ? '&' : '?'}limit=${limit}&offset=${page * limit}`
				}
			}}
			server={{
				url: '/dashboard/student-data.json',
				then: (data) =>
					data.results.map((student) => {
						return [
							student.id,
							student.email,
							student.first_name,
							student.last_name,
							student.destination,
							student.degree,
							student.major,
							student.english_proficiency,
							student.status,
							student.rating,
							convertDate(student.created)
						];
					}),
				total: (data) => data.count
			}}
			{columns}
		/>
	</div>
</div>

<style lang="postcss" global>
	:global(.studentdata-table) {
		@apply items-center w-full bg-transparent border-collapse;
	}

	:global(.studentdata-th) {
		@apply px-6 pt-4 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100;
	}
	:global(.studentdata-td) {
		@apply border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4;
	}

	:global(.studentdata-pagination) {
		@apply flex justify-end items-center;
	}

	:global(.studentdata-pagination-summary) {
		@apply text-xs;
	}

	:global(.studentdata-pagination-button) {
		@apply px-4 py-2 text-sm font-medium text-blueGray-700 hover:text-blueGray-800 hover:bg-blueGray-100 focus:outline-none;
	}

	:global(.studentdata-pagination-button-next) {
		@apply ml-2;
	}

	:global(.studentdata-pagination-button-current) {
		@apply bg-blueGray-100;
	}

	:global(.studentdata-pagination-button-previous) {
		@apply ml-2;
	}
</style>
