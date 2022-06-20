<script>
	import { convertDate } from '$lib/convertDate';
	export let data;
</script>

<div
	class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
	<div class="rounded-t bg-white mb-0 px-6 py-6">
		<div class="flex flex-col">
			<a
				href={`/dashboard/document-submission/${data.student_data.id}`}
				class="flex items-center gap-x-2 mb-3 text-xs text-gray-500 hover:text-black"
				><i class="fa-solid fa-arrow-left" />Return to document list</a
			>
			<h1 class="text-blueGray-700 text-xl font-bold">{data.title}</h1>
			<p class="text-gray-600 text-sm">
				{data.category.name}, uploaded {convertDate(data.uploaded_at, false)}
			</p>
		</div>
	</div>
	<div class="flex justify-center px-4 lg:px-10 py-10">
		<object
			type="application/pdf"
			data={data.document}
			aria-label={data.title}
			class="w-5/6 h-[60vh]"><embed src={data.document} /></object
		>
	</div>
</div>
