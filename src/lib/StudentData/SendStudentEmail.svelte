<script>
	import { post } from '$lib/utils.js';
	import { toast } from '@zerodevx/svelte-toast';
	export let first_name, last_name, id;
	let show = true;

	let subject = '',
		message = '';

	async function sendEmail(sub, msg) {
		const response = await post(`send-email?id=${id}`, { subject: sub, message: msg });

		if (response.subject) {
			toast.push(`Email successfully sent!`, {
				duration: 3000,

				theme: {
					'--toastBackground': '#48BB78',
					'--toastBarBackground': '#2F855A'
				}
			});
			subject = '';
			message = '';

			show = true;
		} else {
			console.log(response.error);
			toast.push(`${response.error ? response.error : 'Something went wrong'}`, {
				duration: 5000,

				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
		}
	}
</script>

<button
	on:click={() => {
		show = !show;
	}}
	class="bg-sky-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
	type="button"
>
	Send an Email
</button>

<div
	class:hidden={show}
	class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black/50"
>
	<div class="relative w-full max-w-2xl h-full md:h-auto">
		<div class="relative bg-blueGray-100 px-4 rounded-lg shadow dark:bg-gray-700">
			<div class="flex justify-end py-2">
				<button
					on:click={() => {
						show = !show;
					}}
					type="button"
					class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
				>
					<svg
						class="w-5 h-5"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
						><path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/></svg
					>
				</button>
			</div>

			<form>
				<div class="flex flex-wrap pb-10">
					<div class="w-full lg:w-12/12 px-4">
						<h6 class="text-blueGray-700 text-xl font-bold mb-10">
							Send an email to {first_name}
							{last_name}
						</h6>
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="email_subject"
							>
								Subject
							</label>
							<input
								id="email_subject"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								bind:value={subject}
							/>
						</div>
					</div>
					<div class="w-full lg:w-12/12 px-4">
						<div class="relative w-full mb-3">
							<label
								class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
								for="email_message"
							>
								Message
							</label>
							<textarea
								id="email_message"
								type="text"
								class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
								rows="8"
								bind:value={message}
							/>
						</div>
						<div class="flex justify-between">
							<button
								type="button"
								on:click={() => {
									sendEmail(subject, message);
								}}
								class="bg-green-500 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
