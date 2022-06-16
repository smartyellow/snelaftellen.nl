<script lang="ts">
	export let image: string = undefined;
	export let overlay = false;

	$: style = image ? `background-image: url('${image}');` : undefined;
</script>

<div class="wrapper" class:overlay {style}>
	{#if $$slots.top}
		<div class="slot top">
			<slot name="top" />
		</div>
	{/if}

	{#if $$slots.bottom}
		<div class="slot bottom">
			<slot name="bottom" />
		</div>
	{/if}
</div>

<style lang="scss">
	div.wrapper {
		padding: $padding;
		border-radius: $radius;
		display: flex;
		flex-direction: column;
		gap: $padding;
		background-position: center center;
		background-size: cover;
		background-repeat: no-repeat;
		box-shadow: $shadow;
		min-height: 10rem;

		&.overlay {
			box-shadow: $shadow $dark, inset 0 0 0 2000px rgba(0, 0, 0, 0.4);
			color: $light;
		}

		.slot {
			&.top {
				margin-bottom: auto;
			}

			&.bottom {
				margin-top: auto;
			}
		}

		:global(:first-child) {
			margin-top: 0;
		}

		:global(:last-child) {
			margin-bottom: 0;
		}
	}
</style>
