<script>
	import AccountsForm from '$lib/Accounts/AccountsForm.svelte';
	import AccountsProfile from '$lib/Accounts/AccountsProfile.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.mrashid.net - {data.first_name} {data.last_name}</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="w-full lg:w-3/5 px-4">
		<AccountsForm account_data={data} />
	</div>
	<div class="w-full lg:w-2/5 px-4">
		<AccountsProfile account_data={data} />
	</div>
</div>
