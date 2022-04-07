<script>
	import DocumentPreview from '$lib/DocumentSubmission/DocumentDetail/DocumentPreview.svelte';
	import DocumentDetail from '$lib/DocumentSubmission/DocumentDetail/DocumentDetail.svelte';
	export let data;
	export let categories;
</script>

<svelte:head>
	<title>app.mrashid.net - {data.title}</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="w-full lg:w-3/5 px-4">
		<DocumentPreview {data} />
	</div>
	<div class="w-full lg:w-2/5 px-4">
		<DocumentDetail {categories} document_data={data} />
	</div>
</div>
