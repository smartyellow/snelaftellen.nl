<script lang="ts">
	export let highlighted = false;
</script>

<div class="widget" class:highlighted>
	<slot />
</div>

<style lang="scss">
	@import '../styles/vars';
	div {
		padding: $padding;
		border: 2px dashed $accent-light;
		border-radius: $radius;
	}
	div.highlighted {
		background-color: $yellow;
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
</style>
