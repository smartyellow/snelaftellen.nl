<script lang="ts">
	//import { slide } from 'svelte/transition';
	//import { countdownOptions } from '../constants';
	//import Widget from '../layout/widget.svelte';

	let show = false;
</script>

<a sveltekit:prefetch href="/aftellen" class="btn shadow">
	Aftellen!
</a>

<!--<a href="/aftellen" class="btn" class:shadow={!show} on:click|preventDefault={() => (show = !show)}>
	Aftellen!
</a>

{#if show}
	<div class="cols" transition:slide>
		{#each countdownOptions as option}
			<Widget>
				<a sveltekit:prefetch href="/{option}" on:click={() => (show = false)}>
					Naar een {option}
				</a>
			</Widget>
		{/each}
	</div>
{/if}-->

<style lang="scss">
	@import '../styles/vars';
	a {
		display: block;
		text-align: center;
		font-size: 1.8rem;
	}
	.btn {
		padding: 10px;
		border-radius: 0;
		&.shadow {
			box-shadow: $shadow-flat $accent-light;
			border-radius: $radius;
			&:active {
				box-shadow: none;
			}
		}
	}
	//.cols {
	//	border: 1px solid $accent-light;
	//	margin-top: 0;
	//	padding: 10px;
	//}
</style>
