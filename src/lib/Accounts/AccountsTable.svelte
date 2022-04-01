<script>
	import Grid from 'gridjs-svelte';
	import { html } from 'gridjs';
	import TimeAgo from 'javascript-time-ago';
	import en from 'javascript-time-ago/locale/en.json';
	TimeAgo.addLocale(en);
	const timeAgo = new TimeAgo('en-US');
	import { convertDate } from '$lib/convertDate';

	import { checkmark, crossmark } from '$lib/svg/accounts';
	import { DISPLAY_ACCOUNT_TYPES } from './constants';

	export let color = 'light';

	let grid;

	function returnAccountType(type) {
		let color = '';

		if (type === 1) color = `text-inherit`;
		else if (type === 2) color = `text-indigo-600`;
		else if (type === 3) color = `text-orange-600`;
		else if (type === 4) color = `text-emerald-600`;
		else if (type === 5) color = `text-red-600`;
		else if (type === 6) color = `font-bold text-red-600`;
		else color = 'text-inherit';

		return `<span class="${color}">${DISPLAY_ACCOUNT_TYPES[type]}</span>`;
	}

	function returnMark(value) {
		if (value === true) {
			return `<span class="block w-5 h-5 text-green-600">${checkmark}</span>`;
		} else {
			return `<span class="block w-5 h-5 text-red-600">${crossmark}</span>`;
		}
	}

	const columns = [
		{
			id: 'profile_pic',
			name: 'Last Name',
			hidden: true
		},
		{
			id: 'id',
			name: 'ID',
			hidden: true,
			formatter: (cell, row) =>
				html(`<a href="/dashboard/accounts/${row.cells[2].data}" class="text-blue-500">${cell}</a>`)
		},
		{
			id: 'username',
			name: 'Username',
			formatter: (cell, row) =>
				html(
					`<a href="/dashboard/accounts/${row.cells[2].data}"><img src=${row.cells[0].data} alt=${row.cells[2].data} class="account-profile-pic" /><span class="font-medium">${cell}</span></a>`
				)
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
			id: 'is_active',
			name: 'Active',
			formatter: (cell, row) => html(returnMark(cell))
		},
		{
			id: 'is_staff',
			name: 'Manager',
			hidden: true
		},
		{
			id: 'is_superuser',
			name: 'SuperAdmin',
			hidden: true
		},
		{
			id: 'account_type',
			name: 'Account Type',
			formatter: (cell, row) => html(returnAccountType(cell))
		},
		{
			id: 'date_joined',
			name: 'Joined'
		},
		{
			id: 'last_login',
			name: 'Last Login'
		}
	];

	const className = {
		container: 'account-container',
		table: 'account-table',
		thead: 'account-thead',
		tr: 'account-tr',
		th: 'account-th',
		td: 'account-td',
		pagination: 'account-pagination',
		paginationSummary: 'account-pagination-summary',
		paginationButton: 'account-pagination-button',
		paginationButtonNext: 'account-pagination-button-next',
		paginationButtonCurrent: 'account-pagination-button-current',
		paginationButtonPrev: 'account-pagination-button-previous',
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
					Accounts
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
							'username',
							'profile_pic',
							'is_active',
							'is_staff',
							'is_superuser',
							'account_type',
							'last_login',
							'date_joined'
						][col.index];

						return `${prev}${prev.includes('?') ? '&' : '?'}ordering=${dir}${colName}`;
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
			search={{
				server: {
					url: (prev, keyword) => `${prev}${prev.includes('?') ? '&' : '?'}search=${keyword}`
				}
			}}
			server={{
				url: '/dashboard/accounts.json',
				then: (data) =>
					data.results.map((account) => {
						return [
							account.profile_pic,
							account.id,
							account.username,
							account.email,
							account.first_name,
							account.last_name,
							account.is_active,
							account.is_staff,
							account.is_superuser,
							account.account_type,
							convertDate(account.date_joined),
							timeAgo.format(new Date(account.last_login))
						];
					}),
				total: (data) => data.count
			}}
			{columns}
		/>
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
