<script>
	export let route, title, icon, status;

	function changeStatus() {
		const options = [1, 2, 3];
		// status = options[Math.floor(Math.random() * options.length)];
		status = options[status++ % options.length];
	}

	let status_color_classes = 'border-[#C4C6CC] bg-[#F5F7FB]';

	$: {
		if (status === 1) {
			status_color_classes = 'border-[#C4C6CC] bg-[#F5F7FB]';
		} else if (status === 2) {
			status_color_classes = 'bg-amber-500 border-amber-500';
		} else if (status === 3) {
			status_color_classes = 'bg-emerald-500 border-green-600';
		}
	}
</script>

<div class="timeline-title font-normal text-black text-sm pb-4 2xl:pb-6 text-right mt-[0.50rem]">
	<a href={route}> {title}</a>
</div>
<div class="timeline-icon relative">
	<a href={route}>
		<img
			src={`/assets/img/${icon}.png`}
			alt={title}
			class="block w-9 h-9 p-1 border-2 border-gray-600 rounded-full"
		/></a
	>
</div>

<button
	type="submit"
	on:click={changeStatus}
	class={`timeline-status cursor-pointer relative mt-[0.50rem] w-3 h-3 2xl:w-5 2xl:h-5 p-1 border ${status_color_classes} rounded-full`}
>
	<span class="status" />
</button>
