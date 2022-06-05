<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import tooltip from '$lib/ui/tooltip';

	export let show = false;
	export let title: string = undefined;
	export let close: (event?: MouseEvent) => void = () => {
		show = false;
	};
</script>

{#if show}
	<div class="modal outer" on:mousedown|self={close} transition:fade>
		<div class="inner" transition:fly={{ y: 100 }}>
			<div class="header">
				{#if title}
					<div class="title">
						{title}
					</div>
				{/if}
				<button class="close" on:click={close} title="Sluiten" use:tooltip> &times; </button>
			</div>
			<div class="slot">
				<slot />
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '../styles/vars';

	.outer {
		position: fixed;
		display: flex;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba($dark, 0.5);
		margin: 0;
		padding-top: $padding;
		cursor: pointer;
	}

	.inner {
		max-width: 80vw;
		max-height: 80vh;
		background-color: #ffffff;
		box-shadow: $shadow-lg;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: auto;
		width: 100%;
		border: 1px solid $grey;
		border-radius: $radius;
		display: flex;
		flex-direction: column;
		cursor: auto;

		:global(*:first-child) {
			margin-top: 0;
		}

		:global(*:last-child) {
			margin-bottom: 0;
		}

		.header {
			border-bottom: 1px solid $grey-light;
			display: flex;
			background-color: rgba($grey-light, 0.5);

			* {
				align-self: center;
			}

			.title {
				padding-left: $padding;
				font-weight: 600;
			}

			.close {
				margin-left: auto;
				background-color: inherit;
				border: none;
				height: 100%;
				font-size: 2rem;

				&:hover {
					background-color: $grey-light;
				}
			}
		}

		.slot {
			padding: $padding;
			overflow-y: auto;
			max-height: 100%;
		}
	}
	@media (max-width: 600px) {
		.outer {
			padding: 0;
		}
		.inner {
			max-width: 100%;
			max-height: 100%;
			width: 100%;
			margin-top: auto;
			margin-bottom: 0;
		}
	}
</style>
