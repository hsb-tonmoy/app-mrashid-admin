<script context="module">
	export async function load({ params }) {
		console.log(params.username);
		return {};
	}
</script>

<script>
	import CardSettings from '$lib/Dashboard/Components/Cards/CardSettings.svelte';
	import CardProfile from '$lib/Dashboard/Components/Cards/CardProfile.svelte';
</script>

<div class="flex flex-wrap">
	<div class="w-full lg:w-8/12 px-4">
		<CardSettings />
	</div>
	<div class="w-full lg:w-4/12 px-4">
		<CardProfile />
	</div>
</div>
