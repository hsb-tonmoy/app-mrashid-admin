<script>
	import { page, session } from '$app/stores';
	import { toast } from '@zerodevx/svelte-toast';
	import Select from 'svelte-select';

	export let account_data;

	import { createForm } from 'felte';
	import { validator } from '@felte/validator-yup';
	import * as yup from 'yup';

	import loadStudentData from './SelectElement/student-data';
	import Item from './SelectElement/Item.svelte';

	const studentIdentifier = 'id';
	const getStudentLabel = (option) =>
		`${option.id} - ${option.first_name} ${option.last_name} (${option.email})`;
	const getSelectionLabel = (option) =>
		`${option.id} - ${option.first_name} ${option.last_name} (${option.email})`;

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
			account_type: account_data.account_type.toString(),
			student: account_data.student,
			is_staff: account_data.is_staff,
			is_active: account_data.is_active,
			date_joined: account_data.date_joined
		},
		extend: validator({ schema }),

		onSubmit(values, context) {
			handleAccountsSubmit(JSON.stringify(values));
		}
	});

	async function handleAccountsSubmit(body) {
		const response = await fetch(`/dashboard/accounts/${$page.params.username}`, {
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

<form
	use:form
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="text-center flex justify-between">
			<h6 class="text-blueGray-700 text-xl font-bold">
				{account_data.first_name}
				{account_data.last_name}
			</h6>
			{#if $session.user && ($session.user.account_type === 4 || $session.user.account_type === 5 || $session.user.account_type === 6)}
				<div class="flex w-auto lg:w-96 gap-x-4">
					<select
						id="account_type"
						name="account_type"
						class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
						bind:value={$data.account_type}
					>
						<option value="1">Visitor</option>
						<option value="2">Client</option>
						<option value="3">Consultant</option>
						<option disabled={$session.user.account_type < 4} value="4">Manager</option>
						<option disabled={$session.user.account_type < 5} value="5">Admin</option>
						<option disabled={$session.user.account_type < 6} value="6">SuperAdmin</option>
					</select>
				</div>
			{/if}
		</div>
	</div>
	<div class="flex-auto px-4 lg:px-10 py-10 pt-0">
		<section>
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
							optionIdentifier={studentIdentifier}
							{getSelectionLabel}
							getOptionLabel={getStudentLabel}
							{Item}
							bind:value={$data.student}
							id="student-data"
							placeholder="Student Data"
							containerClasses="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
							showChevron={true}
							on:select={(event) => {
								$data.student = event.detail;
							}}
							on:clear={() => {
								$data.student = null;
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
				<div class="w-full lg:w-6/12 px-4 mt-4">
					{#if ($session.user && $session.user.account_type === 4) || $session.user.account_type === 5 || $session.user.account_type === 6}
						<div>
							<label class="inline-flex items-center cursor-pointer">
								<input
									id="is_active"
									bind:checked={$data.is_active}
									type="checkbox"
									class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
								/>
								<span class="ml-2 text-sm font-semibold text-blueGray-600">
									Is the account active?
								</span>
							</label>
						</div>
					{/if}
					{#if $session.user && ($session.user.account_type === 5 || $session.user.account_type === 6)}
						<div>
							<label class="inline-flex items-center cursor-pointer">
								<input
									id="is_staff"
									bind:checked={$data.is_staff}
									type="checkbox"
									class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
								/>
								<span class="ml-2 text-sm font-semibold text-blueGray-600">
									Is the user a staff?
								</span>
							</label>
						</div>
					{/if}
				</div>
				<div class="w-full px-4 mt-6 text-right">
					<button
						class="bg-green-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
					>
						Update Data
					</button>
				</div>
			</div>

			<hr class="mt-6 border-b-1 border-blueGray-300" />
		</section>
	</div>
</form>
