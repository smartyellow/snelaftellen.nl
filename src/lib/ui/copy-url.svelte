<!--
	NOTE: On Safari the navigator.clipboard.writeText only works with HTTPS
	enabled. It's treated as unsafe to copy text from a non-HTTPS site. You
	can start the dev server with a self-signed SSL certificate by running
	`npm run dev -- -H`.
-->

<script lang="ts">
	import IconCopy from '$lib/gfx/svg/icon-copy.svelte';
	import tooltip from '$lib/ui/tooltip';

	export let url: string;

	function copy() {
		navigator.clipboard.writeText(url);
	}
</script>

<ins class="select">
	<a href={url}>{url}</a>
	<button on:click={copy} title="Naar klembord kopiëren" use:tooltip>
		<span class="sr">Naar klembord kopiëren</span>
		<IconCopy />
	</button>
</ins>

<style lang="scss">
	@import '../styles/vars';

	ins {
		display: flex;
		border: 2px solid #808080;
		padding: 5px;
		background-color: #e2e2e2;
		text-align: center;
		overflow-x: auto;
		font-family: Arial, sans-serif;
		align-items: center;
		gap: $padding-sm;
		@media (max-width: 600px) {
			flex-direction: column;
		}
	}

	a {
		display: block;
		flex-grow: 1;
		word-break: normal;
		overflow-wrap: anywhere;
		white-space: pre-wrap !important;
	}

	button {
		height: 100%;
		margin: 0;
		margin-right: auto;
		padding: 0.5rem;

		:global(svg) {
			width: 30px;
			height: 30px;
			stroke: currentColor;
			transform: none;
		}

		@media (max-width: 600px) {
			margin-left: auto;
		}
	}
</style>
