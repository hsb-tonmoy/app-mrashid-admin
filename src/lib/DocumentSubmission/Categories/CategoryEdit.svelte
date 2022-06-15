<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { toast } from '@zerodevx/svelte-toast';

	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	export let category_data;

	function slugify(string) {
		return string
			.toString()
			.normalize('NFD') // split an accented letter in the base letter and the acent
			.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
			.replace(/\s+/g, '-');
	}

	const schema = yup.object({
		name: yup.string().required('Name is required'),
		code: yup.string().required('Code is required'),
		slug: yup.string().required('Slug is required')
	});

	const { form, data, isValid } = createForm({
		initialValues: {
			name: category_data.name,
			code: category_data.code,
			description: category_data.description,
			slug: category_data.slug
		},
		extend: validator({ schema }),
		onSubmit: (values, context) => {
			handleSubmit(JSON.stringify(values));
		}
	});

	$: $data.slug = slugify($data.name);

	async function handleSubmit(body) {
		const response = await fetch(`/dashboard/document-categories/${$page.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (response.ok) {
			toast.push(`Document category updated`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});

			goto('/dashboard/document-categories');
		} else {
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
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="text-center flex justify-between">
			<h6 class="text-blueGray-700 text-xl font-bold">Add New Document Category</h6>
		</div>
	</div>
	<div class="flex-auto px-4 lg:px-10 py-10 pt-0 mt-4">
		<form use:form>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="name">
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="code">
							Code
						</label>
						<input
							id="code"
							name="code"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
				<div class="w-full px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="slug">
							Slug
						</label>
						<input
							disabled
							bind:value={$data.slug}
							id="slug"
							name="slug"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white disabled:bg-gray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-wrap">
				<div class="w-full lg:w-12/12 px-4">
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
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							rows="8"
						/>
					</div>
					<div class="flex justify-between">
						<button
							disabled={!$isValid}
							type="submit"
							class="bg-green-500 disabled:bg-gray-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
						>
							Update
						</button>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
