<script>
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { CATEGORIES, NOTE_PRIORITY } from './options';

	export let student_id;

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, state, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			title: '',
			description: '',
			internal: false,
			priority: 1,
			category: '',
			student: student_id
		},
		// validationSchema: yup.object().shape({
		// 	email: yup
		// 		.string()
		// 		.email('Please enter a valid e-mail address')
		// 		.required('Email address is required')
		// 		.trim(),
		// 	password: yup.string().required('Password is required')
		// }),
		onSubmit: (values) => {
			handleStudentDataSubmit(JSON.stringify(values));
		}
	});

	async function handleStudentDataSubmit(body) {
		const response = await fetch(`/dashboard/student-data/${$page.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (response.ok) {
			toast.push(`${$form.first_name} ${$form.last_name}'s data successfully updated`, {
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

<form class="bg-blueGray-100 px-4" on:submit|preventDefault={handleSubmit}>
	<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Add a Note</h6>
	<div class="flex flex-wrap">
		<div class="w-full lg:w-6/12">
			<div class="relative w-full mb-3">
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-category">
					Category
				</label>
				<select
					id="grid-category"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.category}
					on:change={handleChange}
				>
					{#each CATEGORIES as option}
						<option value={option.id}>{option.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="w-full lg:w-6/12">
			<div class="relative w-full mb-3">
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-priority">
					Priority
				</label>
				<select
					id="grid-priority"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.priority}
					on:change={handleChange}
				>
					{#each NOTE_PRIORITY as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="w-full">
			<div class="relative w-full mb-3">
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-title">
					Title
				</label>
				<input
					id="grid-title"
					type="text"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.title}
					on:change={handleChange}
				/>
			</div>
		</div>
		<div class="w-full">
			<div class="relative w-full mb-3">
				<label
					class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
					for="grid-description"
				>
					Description
				</label>
				<textarea
					id="grid-description"
					type="text"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					rows="5"
					bind:value={$form.description}
					on:change={handleChange}
				/>
			</div>
		</div>
	</div>
</form>
