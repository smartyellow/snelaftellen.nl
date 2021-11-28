<div>
	<slot></slot>
</div>

<style>
	div {
		background-color: var(--yellow);
		padding: 1rem;
		border: 2px dashed var(--accent-dark);
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
</style>
