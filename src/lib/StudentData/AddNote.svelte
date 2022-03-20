<script>
	import { session } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { NOTE_CATEGORIES, NOTE_PRIORITY } from './options';

	import { post } from '$lib/utils';

	export let notes, student_id, addNoteShow;

	$: console.log($session.user.id);

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, state, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			title: '',
			description: '',
			internal: false,
			complete: false,
			priority: 1,
			category: 1,
			student: student_id,
			created_by: $session.user.id
		},
		validationSchema: yup.object().shape({
			'note-title': yup.string().required('Title is required').trim()
		}),
		onSubmit: (values) => {
			submitNote(values);
		}
	});

	async function submitNote(body) {
		delete body['note-title'];
		delete body['note-description'];
		const response = await post(`note`, body);

		if (response.title) {
			toast.push(`Note successfully sent!`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});
			addNoteShow = false;
			if (response.date_added) {
				notes = [...notes, response];
			}
		} else {
			console.log(response);
			toast.push(`${response.error ? response.error : 'Something went wrong'}`, {
				duration: 5000,

				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
		}
	}
</script>

<form
	class="animate__animated animate__slideInDown bg-blueGray-100 px-4 pt-2 mt-6"
	on:submit|preventDefault={handleSubmit}
>
	<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Add a Note</h6>
	<div class="flex flex-wrap">
		<div class="w-full lg:w-6/12">
			<div class="relative w-full mb-3">
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="note-category">
					Category
				</label>
				<select
					id="note-category"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					bind:value={$form.category}
					on:change={handleChange}
				>
					{#each $NOTE_CATEGORIES as option}
						<option value={option.id}>{option.name}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="w-full lg:w-6/12">
			<div class="relative w-full mb-3">
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="note-priority">
					Priority
				</label>
				<select
					id="note-priority"
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
				<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="note-title">
					Title
				</label>
				<input
					id="note-title"
					name="note-title"
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
					for="note-description"
				>
					Description
				</label>
				<textarea
					id="note-description"
					class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
					rows="5"
					bind:value={$form.description}
					on:change={handleChange}
				/>
			</div>
		</div>
		<div class="w-full lg:w-6/12">
			<div>
				<label class="inline-flex items-center cursor-pointer">
					<input
						id="note-internal"
						type="checkbox"
						class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
						bind:checked={$form.internal}
						on:change={handleChange}
					/>
					<span class="ml-2 text-sm font-semibold text-blueGray-600"> Hide from the student? </span>
				</label>
			</div>

			<div>
				<label class="inline-flex items-center cursor-pointer">
					<input
						id="note-complete"
						type="checkbox"
						class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
						bind:checked={$form.complete}
						on:change={handleChange}
					/>
					<span class="ml-2 text-sm font-semibold text-blueGray-600"> Mark complete? </span>
				</label>
			</div>
		</div>
		<div class="flex w-full gap-x-4">
			<button
				disabled={!$isValid || !$state.modified.title}
				type="submit"
				class="my-6 text-white bg-blueGray-600 disabled:bg-blueGray-300 hover:bg-blueGray-500 focus:ring-4 font-medium text-xs uppercase px-4 py-2.5 text-center"
			>
				Submit
			</button>
			<button
				on:click={() => (addNoteShow = !addNoteShow)}
				type="button"
				class="my-6 text-white bg-blueGray-600 hover:bg-blueGray-500 focus:ring-4 font-medium text-xs uppercase px-4 py-2.5 text-center"
			>
				Cancel
			</button>
		</div>
	</div>
</form>
