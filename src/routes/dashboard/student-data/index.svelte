<script>
	import { page } from '$app/stores';
	import CardTable from '$lib/Dashboard/Components/Cards/CardTable.svelte';

	let server_url = '/dashboard/student-data.json/';

	$: server_url += $page.url.search;
</script>

<svelte:head>
	<title>app.mrashid.net - Student Data</title>
</svelte:head>

<div class="flex flex-wrap mt-4">
	<div class="w-full mb-12 px-4">
		<CardTable {server_url} />
	</div>
</div>
