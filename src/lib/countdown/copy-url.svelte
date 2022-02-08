<!--
	NOTE: On Safari the navigator.clipboard.writeText only works with HTTPS
	enabled. It's treated as unsafe to copy text from a non-HTTPS site. You
	can start the dev server with a self-signed SSL certificate by running
	`npm run dev -- -H`.
-->
<script lang="ts">
	export let url: string;
	let copied = false;

	function copy() {
		navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<ins>
	<a href={url}>{url}</a>
	<button on:click={copy} title="Naar klembord kopiëren">
		<span class="sr">Naar klembord kopiëren</span>
		{#if copied}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					fill-rule="evenodd"
					d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
				/>
				<path
					d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
				/>
				<path
					d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
				/>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
				<path
					d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
				/>
				<path
					d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
				/>
			</svg>
		{/if}
	</button>
</ins>

<style lang="scss">
	@import '../styles/vars';
	ins {
		-moz-user-select: all;
		-webkit-user-select: all;
		-ms-user-select: all;
		user-select: all;
		display: flex;
		border: 2px solid #808080;
		padding: 5px;
		background-color: #e2e2e2;
		text-align: center;
		overflow-x: auto;
		font-family: Arial, sans-serif;
		align-items: center;
		gap: $padding-sm;
		@media screen and (max-width: 600px) {
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
		svg {
			width: 30px;
			height: 30px;
			fill: currentColor;
		}
		@media screen and (max-width: 600px) {
			margin-left: auto;
		}
	}
</style>
