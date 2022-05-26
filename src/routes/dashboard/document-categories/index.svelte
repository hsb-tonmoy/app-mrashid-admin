<script>
	import CategoryTable from '$lib/DocumentSubmission/Categories/CategoryTable.svelte';
	export let data = [];
</script>

<svelte:head>
	<title>app.mrashid.net - Document Categories</title>
</svelte:head>

<div class="flex flex-wrap mt-4">
	<div class="w-full mb-12 px-4">
		<CategoryTable {data} />
	</div>
</div>
