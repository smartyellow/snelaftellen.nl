<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import IconArrowFlatBottom from '$lib/gfx/svg/icon-arrow-flat-bottom.svelte';

	export let title: string;
	export let icon: any = undefined;
	export let open = false;

	let hasJs = false;
	onMount(() => hasJs = true);
</script>

<div class="accordion" class:js={hasJs} class:open>
	<div class="header" role="button" on:click={() => open = !open}>
		{#if icon}
			<div class="icon">
				<svelte:component this={icon} />
			</div>
		{/if}

		<p class="title">{title}</p>

		{#if hasJs}
			<div class="arrow"><IconArrowFlatBottom /></div>
		{/if}
	</div>

	{#if open || !hasJs}
		<div class="slot detail" transition:slide><slot /></div>
	{/if}
</div>

<style lang="scss">
	@import '../styles/vars';

	.accordion {
		margin-bottom: $padding;
		border: 1px solid #000;
		border-bottom-width: 2px;

		.header {
			display: flex;
			padding: $padding;
			transition: background-color $transition, color $transition;

			.title {
				font-size: 1.1rem;
				margin: 0;
			}

			.icon {
				margin-right: $padding;
				vertical-align: middle;
				min-width: 1.5rem;

				:global(svg) {
					margin-top: -0.2rem;
				}
			}
		}

		.detail {
			padding: $padding;
		}
	}

	.accordion.js {
		.header {
			cursor: pointer;

			.arrow {
				will-change: transform;
				transition: transform 0.8s;
				transform-style: preserve-3d;
				margin-left: auto;
				min-width: 1.5rem;
			}
		}

		&.open {
			.header {
				background-color: $accent-light;
				color: $light;

				.arrow {
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
