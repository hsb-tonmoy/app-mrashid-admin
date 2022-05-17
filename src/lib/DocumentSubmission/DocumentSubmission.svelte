<script>
	import DocumentTable from './DocumentTable.svelte';
	export let data;

	let document_data = data.reduce(function (r, a) {
		r[a.category.name] = r[a.category.name] || [];
		r[a.category.name].push(a);
		return r;
	}, Object.create(null));
</script>

<h3 class="text-black text-3xl text-center mt-40">No documents have been uploaded yet</h3>
{#each Object.entries(document_data) as [key, value]}
	<DocumentTable heading={key} data={value} />
{/each}
