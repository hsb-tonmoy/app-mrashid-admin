<script>
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';

	export let color = 'light';

	let grid;

	export let data;
	const columns = [
		{
			id: 'id',
			name: 'ID',
			hidden: true
		},
		{
			id: 'code',
			name: 'Code',
			formatter: (cell, row) =>
				html(
					`<a href="/dashboard/document-categories/${row.cells[0].data}" class="text-blue-500">${cell}</a>`
				)
		},
		{
			id: 'name',
			name: 'Name'
		},
		{
			id: 'slug',
			name: 'Slug'
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
					Document Categories
				</h3>
			</div>
			<a
				href="/dashboard/document-categories/new/"
				class="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
				type="button"
			>
				Add New <i class="fas fa-plus ml-2" />
			</a>
		</div>
	</div>
	<div class="block w-full overflow-x-auto">
		<!-- Projects table -->

		<Grid {className} bind:instance={grid} {data} {columns} />
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
