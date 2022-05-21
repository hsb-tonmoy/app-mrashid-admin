<script>
	import { session } from '$app/stores';
	import { page } from '$app/stores';
	import UploadModal from './FileUpload/UploadModal.svelte';
	import DocumentTable from './DocumentTable.svelte';
	export let data = [];
	export let categories;

	const user_id = $session.user.id;
	const student_id = $page.params.id;

	let document_data = data.reduce(function (r, a) {
		r[a.category.name] = r[a.category.name] || [];
		r[a.category.name].push(a);
		return r;
	}, Object.create(null));
</script>

<UploadModal {user_id} {student_id} document_category={categories} />
{#if !(data.length > 0)}
	<h3 class="text-black text-3xl text-center mt-40">No documents have been uploaded yet</h3>
{/if}
{#each Object.entries(document_data) as [key, value]}
	<DocumentTable heading={key} data={value} />
{/each}
