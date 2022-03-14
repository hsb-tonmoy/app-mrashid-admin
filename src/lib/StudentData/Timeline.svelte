<script>
	import { timeline_options } from './timeline';

	export let data;
</script>

<section class="timeline-grid overflow-y-auto">
	{#each timeline_options as timeline_item}
		<div
			class="timeline-title font-normal text-black text-sm pb-4 2xl:pb-6 text-right mt-[0.50rem]"
		>
			<a href={timeline_item.route}> {timeline_item.title}</a>
		</div>
		<div class="timeline-icon relative">
			<a href={timeline_item.route}>
				<img
					src={`/assets/img/${timeline_item.icon}.png`}
					alt={timeline_item.icon}
					class="block w-9 h-9 p-1 border-2 border-gray-600 rounded-full"
				/></a
			>
		</div>

		<div
			class={`timeline-status relative mt-[0.50rem] w-3 h-3 2xl:w-5 2xl:h-5 p-1 border ${
				timeline_item.done ? 'bg-emerald-500 border-green-600' : 'border-[#C4C6CC] bg-[#F5F7FB]'
			} ${timeline_item.error ? 'bg-red-500 border-red-500' : ''} rounded-full`}
		>
			<span class="status" />
		</div>
	{/each}
</section>

<style>
	:root {
		--subdued-color: rgb(87 83 78);
		--text-color: hsl(200, 100%, 20%);
		--avatar-size: 2.25rem;
		--status-size: 1.25rem;
		--grid-gap: 1.5rem;
		--group-header-spacing: 1rem;
	}

	.timeline-grid {
		display: grid;
		grid-template-columns: fit-content(100%) var(--avatar-size) var(--avatar-size);
		grid-template-rows: auto;
		gap: var(--grid-gap);
		width: 100%;
		margin: 0 auto;
	}

	.timeline-icon::after {
		content: '';
		position: absolute;
		background-color: var(--subdued-color);
		width: 2px;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: var(--avatar-size);
		bottom: calc(var(--grid-gap) * -1);
	}

	.timeline-status::after {
		content: '';
		position: absolute;
		background-color: #e3e5e9;
		width: 1px;
		left: 0;
		right: 0;
		margin: 0 auto;
		top: var(--status-size);
		bottom: calc(var(--grid-gap) * -4);
	}

	.timeline-icon:nth-last-child(2)::after {
		display: none;
	}

	.timeline-status:nth-last-child(1)::after {
		display: none;
	}
</style>
