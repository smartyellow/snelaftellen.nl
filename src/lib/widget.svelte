<div class="widget">
	<slot />
</div>

<style>
	div {
		padding: 1rem;
		border: 2px dashed var(--accent-light);
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
	:global(.widget + .widget) {
		margin-top: 10px;
	}
</style>
