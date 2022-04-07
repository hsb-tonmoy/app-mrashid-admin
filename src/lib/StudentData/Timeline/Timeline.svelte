<script>
	import { toast } from '@zerodevx/svelte-toast';
	import { createForm } from 'svelte-forms-lib';

	import TimelineItem from './TimelineItem.svelte';

	export let student_progress;
	export let student_id;

	const { form, state, isValid, handleChange, handleSubmit } = createForm({
		initialValues: {
			account_creation: student_progress.account_creation,
			file_opening: student_progress.file_opening,
			docu_submission: student_progress.docu_submission,
			application_submission: student_progress.application_submission,
			i20_reception: student_progress.i20_reception,
			sevis_payment: student_progress.sevis_payment,
			ds160_submission: student_progress.ds160_submission,
			visa_fee: student_progress.visa_fee,
			visa_interview: student_progress.visa_interview,
			visa_collection: student_progress.visa_collection,
			pre_dept_session: student_progress.pre_dept_session,
			welcoming_in_us: student_progress.welcoming_in_us,
			student_data: student_progress.student_data
		},
		onSubmit: (values) => {
			changeProgress(values);
		}
	});

	async function changeProgress(body) {
		const response = await fetch(
			`/dashboard/student-data/progress/?id=${student_progress.student_data}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			}
		);

		if (!response.ok) {
			console.log(response);
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

<form on:submit={handleSubmit}>
	<section class="timeline-grid overflow-y-auto">
		<TimelineItem
			title="Account Creation"
			route={'/dashboard/'}
			icon="account"
			bind:status={$form.account_creation}
		/>
		<TimelineItem
			title="File Opening"
			route={'/dashboard/file_opening'}
			icon="account"
			bind:status={$form.file_opening}
		/>
		<TimelineItem
			title="Document Submission"
			route={'/dashboard/document-submission/' + student_id}
			icon="account"
			bind:status={$form.docu_submission}
		/>
		<TimelineItem
			title="Application Submission"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.application_submission}
		/>
		<TimelineItem
			title="Reception of I-20"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.i20_reception}
		/>
		<TimelineItem
			title="SEVIS Payment"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.sevis_payment}
		/>
		<TimelineItem
			title="DS-160 Submission"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.ds160_submission}
		/>
		<TimelineItem
			title="Visa Fee Payment"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.visa_fee}
		/>
		<TimelineItem
			title="Visa Interview Prep"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.visa_interview}
		/>
		<TimelineItem
			title="Visa Collection"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.visa_collection}
		/>
		<TimelineItem
			title="Pre-departure Session"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.pre_dept_session}
		/>
		<TimelineItem
			title="Welcoming in the USA"
			route={'/dashboard/docu_submission'}
			icon="account"
			bind:status={$form.welcoming_in_us}
		/>
	</section>
</form>

<style>
	:root {
		--subdued-color: rgb(87 83 78);
		--text-color: hsl(200, 100%, 20%);
		--avatar-size: 2.25rem;
		--status-size: 1.25rem;
		--grid-gap: 1.5rem;
		--group-header-spacing: 1rem;
	}

	:global(.timeline-grid) {
		display: grid;
		grid-template-columns: fit-content(100%) var(--avatar-size) var(--avatar-size);
		grid-template-rows: auto;
		gap: var(--grid-gap);
		width: 100%;
		margin: 0 auto;
	}

	:global(.timeline-icon::after) {
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

	:global(.timeline-status::after) {
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

	:global(.timeline-icon:nth-last-child(2)::after) {
		display: none;
	}

	:global(.timeline-status:nth-last-child(1)::after) {
		display: none;
	}
</style>
