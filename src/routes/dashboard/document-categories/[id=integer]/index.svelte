<script>
	import CategoryEdit from '$lib/DocumentSubmission/Categories/CategoryEdit.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.mrashid.net - Document Categories</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="w-full lg:w-3/5 px-4">
		<CategoryEdit category_data={data} />
	</div>
</div>
