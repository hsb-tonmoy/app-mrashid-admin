<script>
	import CardLineChart from '$lib/Dashboard/Components/Cards/CardLineChart.svelte';
	import CardBarChart from '$lib/Dashboard/Components/Cards/CardBarChart.svelte';
	import CardPageVisits from '$lib/Dashboard/Components/Cards/CardPageVisits.svelte';
	import CardSocialTraffic from '$lib/Dashboard/Components/Cards/CardSocialTraffic.svelte';
</script>

<svelte:head>
	<title>app.mrashid.net - Dashboard</title>
</svelte:head>

<div>
	<div class="flex flex-wrap">
		<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
			<CardLineChart />
		</div>
		<div class="w-full xl:w-4/12 px-4">
			<CardBarChart />
		</div>
	</div>
	<div class="flex flex-wrap mt-4">
		<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
			<CardPageVisits />
		</div>
		<div class="w-full xl:w-4/12 px-4">
			<CardSocialTraffic />
		</div>
	</div>
</div>
