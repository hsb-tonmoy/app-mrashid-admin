<script>
	import CardSettings from '$lib/Dashboard/Components/Cards/CardSettings.svelte';
	import CardProfile from '$lib/Dashboard/Components/Cards/CardProfile.svelte';
	import CardTimeline from '$lib/Dashboard/Components/Cards/CardTimeline.svelte';
	import { NOTE_CATEGORIES } from '$lib/StudentData/options';
	export let data;
	export let notes;
	export let notes_categories;
	export let student_progress;

	$NOTE_CATEGORIES = notes_categories;
</script>

<svelte:head>
	<title>app.mrashid.net - {data.first_name} {data.last_name}</title>
</svelte:head>

<div class="flex flex-wrap">
	<div class="w-full lg:w-3/5 px-4">
		<CardSettings {data} />
	</div>
	<div class="w-full lg:w-2/5 px-4">
		<CardProfile {notes} />
		<CardTimeline student_id={data.id} {student_progress} />
	</div>
</div>
