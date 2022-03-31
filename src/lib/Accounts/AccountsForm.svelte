<script>
	import { page } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import Select from 'svelte-select';

	export let account_data;

	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import loadStudentData from './SelectElement/student-data';
	import Item from './SelectElement/Item.svelte';

	const tagIdentifier = 'id';
	const getTagLabel = (option) => option.first_name + ' ' + option.last_name;
	const getSelectionLabel = (option) => option.first_name + ' ' + option.last_name;

	const schema = yup.object({
		email: yup.string().email().required()
	});

	const { form, data, errors } = createForm({
		initialValues: {
			id: account_data.id,
			first_name: account_data.first_name,
			last_name: account_data.last_name,
			email: account_data.email,
			username: account_data.username,
			account_type: account_data.account_type,
			student: account_data.student,
			is_staff: account_data.is_staff,
			is_active: account_data.is_active,
			date_joined: account_data.date_joined
		},
		extend: validator({ schema }),
		onSubmit(values, context) {
			console.log(values);
			// handleAccountsSubmit(JSON.stringify(values));
		}
	});

	async function handleAccountsSubmit(body) {
		const response = await fetch(`/dashboard/accounts/${$page.params.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body
		});

		if (response.ok) {
			toast.push(`${$data.first_name} ${$data.last_name}'s data successfully updated`, {
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
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="text-center flex justify-between">
			<h6 class="text-blueGray-700 text-xl font-bold">
				{account_data.first_name}
				{account_data.last_name}
			</h6>
		</div>
	</div>
	<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
		<form use:form>
			<h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">Account Information</h6>
			<div class="flex flex-wrap">
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="id">
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
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="student-data"
						>
							Student Data
						</label>
						<Select
							loadOptions={loadStudentData}
							{tagIdentifier}
							{getSelectionLabel}
							{getTagLabel}
							{Item}
							bind:value={$data.student}
							id={'student-data'}
							placeholder="Student Data"
							containerClasses="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							showChevron={true}
							on:select={(event) => {
								console.log(event.detail);
							}}
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="id">
							Username
						</label>
						<input
							id="username"
							name="username"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">
							Email address
						</label>
						<input
							id="email"
							name="email"
							type="email"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label
							class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
							for="first_name"
						>
							First Name
						</label>
						<input
							id="first_name"
							name="first_name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
				<div class="w-full lg:w-6/12 px-4">
					<div class="relative w-full mb-3">
						<label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last_name">
							Last Name
						</label>
						<input
							id="last_name"
							name="last_name"
							type="text"
							class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						/>
					</div>
				</div>
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />
		</form>
	</div>
</div>
