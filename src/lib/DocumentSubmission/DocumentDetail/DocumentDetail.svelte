<script>
	import { session } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	export let document_data, categories;

	const schema = yup.object({
		title: yup.string().required()
	});

	const { form, data, errors } = createForm({
		initialValues: {
			id: document_data.id,
			title: document_data.title,
			category: document_data.category,
			description: document_data.description,
			is_approved: document_data.is_approved,
			is_rejected: document_data.is_rejected,
			checked_by: $session.user.id || null
		},
		extend: validator({ schema }),

		onSubmit(values, context) {
			handleSubmit(
				JSON.stringify({
					...values,
					category: values.category.id
				})
			);
		}
	});

	$: {
		if ($data.is_approved) {
			$data.is_rejected = false;
		}
	}

	async function handleSubmit(body) {
		const response = await fetch(`/dashboard/document-submission/document/${document_data.id}/`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (response.ok) {
			toast.push(`Document successfully updated`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});
		} else {
			console.log(response);
			toast.push('Something went wrong! Please re-check the data', {
				duration: 5000,

				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
		}
	}
</script>

<div
	class="relative py-6 px-4 flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16 transition-all ease-in-out duration-300"
>
	<h6 class="text-blueGray-700 text-xl font-bold">Document Information</h6>
	<form use:form>
		<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
		<div class="flex flex-wrap">
			<div class="w-full px-4">
				<div class="relative w-full mb-3">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-id">
						ID
					</label>
					<input
						id="id"
						name="id"
						disabled
						type="text"
						class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					/>
				</div>
			</div>
			<div class="w-full px-4">
				<div class="relative w-full mb-3">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-id">
						Title
					</label>
					<input
						id="title"
						name="title"
						type="text"
						class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					/>
				</div>
			</div>

			<div class="w-full px-4">
				<div class="relative w-full mb-3">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="category">
						Category
					</label>
					<select
						id="category"
						bind:value={$data.category.id}
						class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					>
						{#each categories as option}
							<option value={option.id}>{option.name}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="w-full px-4">
				<div class="relative w-full mb-3">
					<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="description">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						rows="8"
					/>
				</div>
			</div>
			<div class="w-full px-4">
				<div>
					<label class="inline-flex items-center cursor-pointer">
						<input
							id="is_approved"
							type="checkbox"
							class="form-checkbox border border-blueGray-500 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
							bind:checked={$data.is_approved}
						/>
						<span class="ml-2 text-sm font-semibold text-blueGray-600"> Approved? </span>
					</label>
				</div>

				<div>
					<label class="inline-flex items-center cursor-pointer">
						<input
							id="is_rejected"
							type="checkbox"
							class="form-checkbox border border-blueGray-500 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
							bind:checked={$data.is_rejected}
						/>
						<span class="ml-2 text-sm font-semibold text-blueGray-600"> Rejected? </span>
					</label>
				</div>
			</div>
			<div class="w-full px-4 mt-6 text-right">
				<button
					class="bg-green-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
				>
					Update Data
				</button>
			</div>
		</div>
	</form>
</div>
