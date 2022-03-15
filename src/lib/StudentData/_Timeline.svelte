<script>
	export let student_progress;

	export const timeline_options = [
		{
			title: 'Account Creation',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.account_creation
		},
		{
			title: 'File Opening',
			icon: 'account',
			route: '/dashboard/file_opening',
			status: student_progress.file_opening
		},
		{
			title: 'Document Submission',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.docu_submission
		},
		{
			title: 'Application Submission',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.application_submission
		},
		{
			title: 'Reception of I-20',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.i20_reception
		},
		{
			title: 'SEVIS Payment',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.sevis_payment
		},
		{
			title: 'DS-160 Submission',
			icon: 'account',
			route: '/dashboard/',

			status: student_progress.ds160_submission
		},
		{
			title: 'Visa Fee Payment',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.visa_fee
		},
		{
			title: 'Visa Interview Prep',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.visa_interview
		},
		{
			title: 'Visa Collection',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.visa_collection
		},
		{
			title: 'Pre-departure Session',
			icon: 'account',
			route: '/dashboard/',
			status: student_progress.pre_dept_session
		},
		{
			title: 'Welcoming in the USA',
			icon: 'account',
			route: '/dashboard/',

			status: student_progress.welcoming_in_us
		}
	];
</script>
