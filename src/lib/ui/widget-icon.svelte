<script lang="ts">
	export let label: string = undefined;
</script>

<div class="card">
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
</div>

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
