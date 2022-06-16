<script>
	import iconInfo from '$lib/gfx/svg/icon-info.svg?raw';

	export let cls = '';
</script>

<div class="alert {cls}">
	{@html iconInfo}
	<div class="slot"><slot /></div>
</div>

<style lang="scss">
	.alert {
		display: flex;
		gap: $padding;
		background-color: rgba($accent-light, 0.3);
		border-bottom: 2px solid rgba(0, 0, 0, 0.1);
		padding: $padding;
		align-items: center;
	}
</style>
