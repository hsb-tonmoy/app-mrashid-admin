<script>
	const registerBg2 = '../assets/img/register_bg_2.png';
</script>

<div>
	<main>
		<section class="flex items-center relative w-full h-full py-40 min-h-screen">
			<div
				class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
				style="background-image: url({registerBg2});"
			/>
			<slot />
		</section>
	</main>
</div>
