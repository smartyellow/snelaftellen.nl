<script lang="ts">
	import Widget from './widget.svelte';

	export let label: string = undefined;
</script>

<Widget>
	<div class="wrapper">
		{#if $$slots.icon}
			<div class="slot icon">
				<slot name="icon" />
			</div>
		{/if}

		{#if $$slots.label}
			<div class="slot label">
				<slot name="label" />
			</div>
		{/if}

		{#if label}
			<div class="label">
				{label}
			</div>
		{/if}
	</div>
</Widget>

<style lang="scss">
	.wrapper {
		text-align: center;
		.icon {
			:global(svg) {
				width: 2rem;
				height: 2rem;
			}
		}
		.label {
			font-size: 2rem;
			:global(a) {
				text-decoration: none;
				font-weight: 600;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
</style>
