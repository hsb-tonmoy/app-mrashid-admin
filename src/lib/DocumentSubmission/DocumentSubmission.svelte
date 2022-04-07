<script>
	import DocumentTable from './DocumentTable.svelte';
	export let data;

	let document_data = data.reduce(function (r, a) {
		r[a.category.name] = r[a.category.name] || [];
		r[a.category.name].push(a);
		return r;
	}, Object.create(null));
</script>

{#each Object.entries(document_data) as [key, value]}
	<DocumentTable heading={key} data={value} />
{/each}
