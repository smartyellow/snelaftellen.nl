<script lang="ts">
	import { slide } from 'svelte/transition';
	import { countdownOptions } from '../constants';
	import Widget from '../layout/widget.svelte';

	let show = false;
</script>

<a href="/aftellen" class="btn" on:click|preventDefault={() => show = !show}>
	Aftellen!
</a>

{#if show}
	<div class="cols" transition:slide>
		{#each countdownOptions as option}
			<Widget>
				<a href="/aftellen-naar-{option}" on:click={() => show = false}>
					Naar een {option}
				</a>
			</Widget>
		{/each}
	</div>
{/if}

<style lang="scss">
	@import '../styles/vars';
	a {
		display: block;
		text-align: center;
		font-size: 1.8rem;
	}
	.btn {
		padding: 10px;
	}
	.cols {
		border: 1px solid $accent-light;
		margin-top: 0;
		padding: 10px;
	}
</style>
