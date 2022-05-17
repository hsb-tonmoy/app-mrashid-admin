<script>
	export let account_data;
</script>

<div
	class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16"
>
	<div class="px-6">
		<div class="flex flex-wrap justify-center">
			<div class="w-full px-4 flex justify-center">
				<div class="relative">
					<img
						alt={`${account_data.first_name} ${account_data.last_name}`}
						src={account_data.profile_pic}
						class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
					/>
				</div>
			</div>
		</div>

		<div class="text-center mt-28">
			{#if account_data.student}
				<h3 class="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
					{`${account_data.first_name} ${account_data.last_name}`}
				</h3>
				<div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
					<i class="fas fa-plane-departure mr-2 text-lg text-blueGray-400" />
					{account_data.student.destination}
				</div>
				<div class="mb-2 text-blueGray-600 mt-10">
					<i class="fas fa-graduation-cap mr-2 text-lg text-blueGray-400" />
					{account_data.student.major}
				</div>
				<div class="mb-2 text-blueGray-600">
					<i class="fas fa-scroll mr-2 text-lg text-blueGray-400" />
					{account_data.student && account_data.student.english_proficiency.toUpperCase()}
				</div>
			{:else}
				<div class="flex justify-center items-center">
					<h3 class="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
						No associated student data
					</h3>
				</div>
			{/if}
		</div>
		<div class="mt-10 py-10 border-t border-blueGray-200 text-center" />
	</div>
</div>
