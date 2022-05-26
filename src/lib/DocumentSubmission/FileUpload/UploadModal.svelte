<script>
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';
	import { toast } from '@zerodevx/svelte-toast';
	import Uploader from './Uploader.svelte';

	let show = true;

	let files = {
		accepted: []
	};

	export let user_id;

	export let document_category = [];

	export let student_id;

	const schema = yup.object({
		title: yup.string().required()
	});

	const { form, data, errors } = createForm({
		initialValues: {
			title: '',
			description: '',
			category: 1,
			student_data: student_id,
			checked_by: user_id || null,
			is_approved: true,
			is_rejected: false,
			document: null
		},
		extend: validator({ schema }),
		onSubmit(values, context) {
			handleUpload(values);
		}
	});

	$: $data.document = files.accepted && files.accepted[0];
	$: $data.title = files.accepted[0] && files.accepted[0].name;

	async function handleUpload(values) {
		let formData = new FormData();
		formData.append('title', values.title);
		formData.append('description', values.title);
		formData.append('category', values.category);
		formData.append('student_data', values.student_data);
		formData.append('checked_by', values.checked_by);
		formData.append('is_approved', values.is_approved);
		formData.append('is_rejected', values.is_rejected);
		formData.append('document', values.document);

		const res = await fetch('/dashboard/document-submission/upload', {
			method: 'POST',
			credentials: 'include',

			body: formData
		});

		if (res.ok) {
			toast.push(`File successfully uploaded!`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});
			files.accepted = [];
			show = true;
			location.reload();
		} else {
			console.log(res);
		}
	}
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white
		"
>
	<div class="rounded-t mb-0 px-4 py-5 border-0 text-right">
		<button
			on:click={() => {
				show = !show;
			}}
			class="bg-green-600 text-white hover:bg-green-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
			type="button"
		>
			<i class="fas fa-upload mr-2" /> Upload
		</button>
	</div>
</div>

<div
	class:hidden={show}
	class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50"
>
	<div class="relative bg-white w-full max-w-2xl h-full md:h-auto">
		<div class="relative bg-blueGray-100 px-4 rounded-lg shadow dark:bg-gray-700">
			<div class="flex justify-end py-2">
				<button
					on:click={() => {
						show = !show;
					}}
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
				>
					<svg
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>

			<form use:form>
				<div class="flex flex-wrap pb-10">
					<div class="w-full lg:w-12/12 px-4">
						<h6 class="text-lg text-lightText mb-6">Upload a New Document</h6>
						<div class="w-full flex gap-x-4">
							<div class="relative w-3/5 mb-3">
								<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="title">
									Document Name
								</label>
								<input
									id="title"
									name="title"
									type="text"
									bind:value={$data.title}
									class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								/>
							</div>
							<div class="relative w-2/5 mb-3">
								<label
									class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
									for="category"
								>
									Document Type
								</label>
								<select
									id="category"
									name="category"
									class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								>
									{#each document_category as category}
										<option value={category.id}>{category.name}</option>
									{/each}
								</select>
							</div>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 mt-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="description"
							>
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows="4"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4 mt-4">
						<div class="relative w-full mb-3">
							<Uploader bind:files />
						</div>
						<div class="flex gap-x-2 mt-8">
							<button
								type="submit"
								class="bg-green-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
							>
								Upload
							</button>
							<button
								on:click={() => {
									show = !show;
								}}
								type="button"
								class="bg-red-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
