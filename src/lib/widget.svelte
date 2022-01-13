<script>
	export let highlighted = false;
</script>

<div class="widget" class:highlighted>
	<slot />
</div>

<style>
	div {
		padding: 1rem;
		border: 2px dashed var(--accent-light);
	}
	div.highlighted {
		background-color: var(--yellow);
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
</style>
