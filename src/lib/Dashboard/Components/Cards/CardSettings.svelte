<script>
	export let data;

	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';

	const { form, state, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			id: data.id,
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			destination: data.destination,
			degree: data.degree,
			phone: data.phone,
			social_media: data.social_media,
			major: data.major,
			education: data.education,
			english_proficiency: data.english_proficiency,
			english_proficiency_score: data.english_proficiency_score,
			message: data.message,
			dr_rashids_notes: data.dr_rashids_notes,
			status: data.status,
			rating: data.rating,
			created: data.created
		},
		validationSchema: yup.object().shape({
			email: yup
				.string()
				.email('Please enter a valid e-mail address')
				.required('Email address is required')
				.trim(),
			password: yup.string().required('Password is required')
		}),
		onSubmit: (values) => {
			handleLogin(values.email, values.password);
		}
	});
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="text-center flex justify-between">
			<h6 class="text-blueGray-700 text-xl font-bold">{data.first_name} {data.last_name}</h6>
			<button
				class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
				type="button"
			>
				Student Data
			</button>
		</div>
	</div>
	<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
		<form on:submit|preventDefault={handleSubmit}>
			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">User Information</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-id">
							ID
						</label>
						<input
							id="grid-id"
							disabled
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-gray-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.id}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-email"
						>
							Email address
						</label>
						<input
							id="grid-email"
							type="email"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.email}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-first-name"
						>
							First Name
						</label>
						<input
							id="grid-first-name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.first_name}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-last-name"
						>
							Last Name
						</label>
						<input
							id="grid-last-name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.last_name}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-phone"
						>
							Contact No.
						</label>
						<input
							id="grid-phone"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.phone}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-social"
						>
							Social Media
						</label>
						<input
							id="grid-social"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.social_media}
							on:change={handleChange}
						/>
					</div>
				</div>
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />

			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
				Study Abroad Information
			</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-destination"
						>
							Destination
						</label>
						<input
							id="grid-destination"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.destination}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-degree"
						>
							Degree
						</label>
						<input
							id="grid-degree"
							type="email"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.degree}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-major"
						>
							Major
						</label>
						<input
							id="grid-major"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.major}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-4/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-ep">
							English Proficiency
						</label>
						<input
							id="grid-ep"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							bind:value={$form.english_proficiency}
							on:change={handleChange}
						/>
					</div>
				</div>
				{#if data.english_proficiency === 'ielts' || data.english_proficiency === 'toefl' || data.english_proficiency === 'duolingo'}
					<div class="w-full lg:w-4/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="grid-ep-score"
							>
								English Proficiency Score
							</label>
							<input
								id="grid-ep-score"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={$form.english_proficiency_score}
								on:change={handleChange}
							/>
						</div>
					</div>
				{/if}
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />

			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Other</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-12/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-query"
						>
							Student Query
						</label>
						<textarea
							id="grid-query"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							rows="8"
							bind:value={$form.message}
							on:change={handleChange}
						/>
					</div>
				</div>
				<div class="w-full lg:w-12/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="grid-notes"
						>
							Dr. Rashid's Notes
						</label>
						<textarea
							id="grid-notes"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							rows="8"
							bind:value={$form.dr_rashids_notes}
							on:change={handleChange}
						/>
					</div>
				</div>
			</div>
		</form>
	</div>
</div>
