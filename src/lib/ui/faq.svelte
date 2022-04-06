<script lang="ts">
	import IconArrowFlatBottom from '$lib/gfx/svg/icon-arrow-flat-bottom.svelte';
	import { onMount } from 'svelte';

	export let question: string;
	export let icon: any = undefined;
	export let open = false;

	let hasJs = false;

	function toggle() {
		open = !open;
	}

	onMount(() => {
		hasJs = true;
	});
</script>

<div class="faq" class:js={hasJs} class:open>
	<div class="header" role="button" on:click={toggle}>
		{#if icon}
			<div class="icon">
				<svelte:component this={icon} />
			</div>
		{/if}

		<h3 class="title">{question}</h3>

		{#if hasJs}
			<div class="arrow"><IconArrowFlatBottom /></div>
		{/if}
	</div>

	{#if open || !hasJs}
		<div class="slot detail"><slot /></div>
	{/if}
</div>

<style lang="scss">
	@import '../styles/vars';
	.faq {
		margin-bottom: $padding;
		border-bottom: $border solid $grey;
		will-change: border-left;
		transition: border-left 0.3s;
		.header {
			display: flex;
			padding: $padding;
			.title {
				font-weight: 700;
				font-size: 1.1rem;
				margin: 0;
			}
			.icon {
				margin-right: $padding;
				vertical-align: middle;
				min-width: 1.5rem;
			}
		}
		.detail {
			padding: $padding;
		}
	}
	.faq.js {
		.header {
			cursor: pointer;
			.title {
				font-weight: 400;
			}
			.arrow {
				will-change: transform;
				transition: transform 0.8s;
				transform-style: preserve-3d;
				margin-left: auto;
				min-width: 1.5rem;
			}
		}
		&.open {
			border-left: 2px solid $accent-light;
			.header {
				.title {
					font-weight: 700;
				}
				.arrow {
					transform: rotate(180deg);
				}
			}
		}
	}
</style>
