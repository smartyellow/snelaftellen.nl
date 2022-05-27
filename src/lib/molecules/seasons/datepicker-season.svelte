<script lang="ts">
	import { capitalize } from '$lib/helpers';
	import { seasonNames } from './helpers';
	import iconArchery from '$lib/gfx/svg/icon-archery.svg?raw';

	export let season = 'zomer';
</script>

<select bind:value={season}>
	{#each seasonNames as s}
		<option value={s}>{capitalize(s)}</option>
	{/each}
</select>

<a role="button" href="/{season}" class="btn">
	{@html iconArchery} Aftellen
</a>

<style lang="scss">
	select {
		width: 100%;
		margin-bottom: 5px;
	}
</style>
