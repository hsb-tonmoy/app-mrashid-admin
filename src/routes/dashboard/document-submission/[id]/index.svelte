<script>
	import DocumentSubmission from '$lib/DocumentSubmission/DocumentSubmission.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.mrashid.net - Documents</title>
</svelte:head>

<div class="flex flex-wrap mt-4">
	<div class="w-full mb-12 px-4">
		<DocumentSubmission {data} />
	</div>
</div>
