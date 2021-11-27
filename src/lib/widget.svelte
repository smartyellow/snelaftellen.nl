<div>
	<slot></slot>
</div>

<style>
	div {
		background-color: #f8f5c3;
		padding: 1rem;
		border: 2px dashed #42401d;
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
</style>
