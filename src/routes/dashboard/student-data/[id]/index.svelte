<script>
	import CardSettings from '$lib/Dashboard/Components/Cards/CardSettings.svelte';
	import CardProfile from '$lib/Dashboard/Components/Cards/CardProfile.svelte';
	export let data;
</script>

<svelte:head>
	<title>app.mrashid.net - {data.first_name} {data.last_name}</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="w-full lg:w-8/12 px-4">
		<CardSettings {data} />
	</div>
	<div class="w-full lg:w-4/12 px-4">
		<CardProfile />
	</div>
</div>
