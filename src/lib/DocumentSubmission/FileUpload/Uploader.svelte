<script>
	import Dropzone from 'svelte-file-dropzone';
	import { trash, upload } from '$lib/svg/document_submission';
	import { humanFileSize, extractExtension } from './helper';
	export let files = {
		accepted: []
	};

	function handleFilesSelect(e) {
		const { acceptedFiles, fileRejections } = e.detail;
		files.accepted = [...acceptedFiles];
	}

	function handleRemoveFile(index) {
		files.accepted.splice(index, 1);
		files.accepted = [...files.accepted];
	}
</script>

<Dropzone
	on:drop={handleFilesSelect}
	multiple={false}
	accept={['.pdf', '.doc', '.docx', '.jpg', '.png', '.jpeg']}
	disableDefaultStyles={true}
	containerClasses="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center"
>
	<p class="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
		<span>Drag and drop your</span>&nbsp;<span>files here or</span>
	</p>
	<input id="hidden-input" type="file" class="hidden" />
	<button
		id="button"
		type="button"
		class="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
	>
		Click here to select
	</button>
</Dropzone>
{#each files.accepted as item, i}
	<div class="flex justify-between items-center mt-6">
		<div class="flex gap-x-2">
			<div
				class="extension flex justify-center items-center h-14 w-12 border border-gray-200 bg-[#F8F9FA]"
			>
				<span class="text-[0.5rem]">{extractExtension(item.name)}</span>
			</div>
			<div class="info flex flex-col justify-center text-sm">
				<span class="">{item.name}</span>
				<span class="text-gray-400">{humanFileSize(item.size)}</span>
			</div>
		</div>
		<span
			on:click={() => {
				handleRemoveFile(i);
			}}
			class="h-5 w-5 cursor-pointer hover:text-accent1">{@html trash}</span
		>
	</div>
{/each}
