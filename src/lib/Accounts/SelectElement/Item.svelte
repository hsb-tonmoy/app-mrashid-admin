<script>
	export let item = undefined;
	export let isActive = false;
	export let isFirst = false;
	export let isHover = false;

	let itemClasses = '';

	$: {
		const classes = [];

		if (isActive) {
			classes.push('active');
		}
		if (isFirst) {
			classes.push('first');
		}
		if (isHover) {
			classes.push('hover');
		}
		itemClasses = classes.join(' ');
	}
</script>

<div class="customItem {itemClasses}">
	<div class="customItem_title">
		<div class="customItem_name">
			{`${item.id} - ${item.first_name} ${item.last_name} (${item.email})`}
		</div>
	</div>
</div>

<style>
	.customItem {
		display: flex;
		align-items: center;
		cursor: default;
		height: 40px;
		line-height: 40px;
		padding: 0 16px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.customItem:active {
		background: #b9daff;
	}

	.customItem.active {
		background: #007aff;
		color: #fff;
	}

	.customItem.first {
		border-radius: 4px 4px 0 0;
	}

	.customItem.hover:not(.active) {
		background: #e7f2ff;
	}

	.customItem_title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.customItem_name {
		display: inline-block;
		font-weight: 700;
		margin-right: 10px;
	}

	.customItem_tagline {
		display: inline-block;
	}
</style>
