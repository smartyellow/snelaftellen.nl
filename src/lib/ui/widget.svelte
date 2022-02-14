<script lang="ts">
	export let highlighted = false;
	export let padding = true;
</script>

<div class="widget" class:highlighted class:padding>
	<slot />
</div>

<style lang="scss">
	@import '../styles/vars';
	div {
		border: 2px dashed $accent-light;
		border-radius: $radius;
		&.highlighted {
			background-color: $yellow;
		}
		&.padding {
			padding: $padding;
		}
		:global(:first-child) {
			margin-top: 0;
		}
		:global(:last-child) {
			margin-bottom: 0;
		}
	}
</style>
