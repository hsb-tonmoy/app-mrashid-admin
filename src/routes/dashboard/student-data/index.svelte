<!-- <script context="module">
	export async function load({ fetch }) {
		const res = await fetch('/dashboard/student-data.json');
		const data = await res.json();

		if (res.ok && res.body) {
			return {
				props: { data }
			};
		}

		return {
			props: { data: null }
		};
	}
</script> -->
<script>
	import CardTable from '$lib/Dashboard/Components/Cards/CardTable.svelte';
</script>

<div class="flex flex-wrap mt-4">
	<div class="w-full mb-12 px-4">
		<CardTable />
	</div>
</div>
