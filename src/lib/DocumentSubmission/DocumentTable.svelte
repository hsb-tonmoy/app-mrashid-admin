<script>
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import { convertDate } from '$lib/convertDate';
	import { checkmark, crossmark, pending } from '$lib/svg/accounts';

	export let color = 'light';

	let grid;

	export let data;
	export let heading;

	function returnStatus(accepted, rejected) {
		if (accepted) {
			return `<span class="block w-5 h-5 text-green-600">${checkmark}</span>`;
		} else if (!accepted && rejected) {
			return `<span class="block w-5 h-5 text-red-600">${crossmark}</span>`;
		} else {
			return `<span class="block w-5 h-5 text-amber-600">${pending}</span>`;
		}
	}

	const columns = [
		{
			id: 'id',
			name: 'ID',
			hidden: true
		},
		{
			id: 'title',
			name: 'Name',
			formatter: (cell, row) =>
				html(
					`<a href="/dashboard/document-submission/document/${row.cells[0].data}/" class="font-bold">${cell}</a>`
				)
		},
		{
			id: 'is_approved',
			name: 'Approved?',
			hidden: true
		},
		{
			id: 'is_rejected',
			name: 'Rejected?',
			hidden: true
		},
		{
			id: 'status',
			name: 'Status',
			formatter: (cell, row) => {
				return html(returnStatus(row.cells[2].data, row.cells[3].data));
			}
		},
		{
			id: 'uploaded_at',
			name: 'Uploaded At',
			formatter: (cell, row) => {
				return convertDate(cell);
			}
		},
		{
			id: 'checked_by',
			name: 'Checked By',
			formatter: (cell, row) => {
				if (cell) {
					return html(
						`<a href="/dashboard/accounts/${cell.username}/" class="font-medium">${cell.full_name}</a>`
					);
				} else {
					return 'NA';
				}
			}
		}
	];

	const className = {
		container: 'account-container',
		table: 'account-table',
		thead: 'account-thead',
		tr: 'account-tr',
		th: 'account-th',
		td: 'account-td',
		search: 'account-search'
	};
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light'
		? 'bg-white'
		: 'bg-red-800 text-white'}"
>
	<div class="rounded-t mb-0 px-4 py-5 border-0">
		<div class="flex flex-wrap items-center">
			<div class="relative w-full px-4 max-w-full flex-grow flex-1">
				<h3 class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}">
					{heading}
				</h3>
			</div>
		</div>
	</div>
	<div class="block w-full overflow-x-auto">
		<!-- Projects table -->

		<Grid {className} {columns} {data} bind:instance={grid} />
	</div>
</div>

<style lang="postcss" global>
	:global(.account-table) {
		@apply items-center w-full bg-transparent border-collapse;
	}

	:global(.account-th) {
		@apply px-6 pt-4 align-middle border border-solid text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100;
	}
	:global(.account-td) {
		@apply border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4;
	}

	:global(.account-pagination) {
		@apply flex justify-end items-center;
	}

	:global(.account-pagination-summary) {
		@apply text-xs;
	}

	:global(.account-pagination-button) {
		@apply px-4 py-2 text-sm font-medium text-blueGray-700 hover:text-blueGray-800 hover:bg-blueGray-100 focus:outline-none;
	}

	:global(.account-pagination-button-next) {
		@apply ml-2;
	}

	:global(.account-pagination-button-current) {
		@apply bg-blueGray-100;
	}

	:global(.account-pagination-button-previous) {
		@apply ml-2;
	}

	:global(.account-search) {
		@apply flex absolute ml-4 top-0 right-0 mt-3 mr-4;
	}
	:global(.gridjs-search-input) {
		@apply border-0 py-3 pr-6 lg:pr-10 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full;
	}

	:global(.account-profile-pic) {
		@apply inline w-10 h-10 mr-3 rounded-full border-none shadow;
	}
</style>
