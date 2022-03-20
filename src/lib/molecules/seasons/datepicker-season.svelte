<script lang="ts">
	import IconArchery from "$lib/gfx/svg/icon-archery.svelte";
	import { capitalize } from "$lib/helpers";
	import { seasonNames } from "./helpers";

	export let season = 'zomer';
</script>

<select bind:value={season}>
	{#each seasonNames as s}
		<option value={s}>{capitalize(s)}</option>
	{/each}
</select>

<a role="button" href="/{season}" class="btn">
	<IconArchery />
	Aftellen
</a>

<style lang="scss">
	select {
		width: 100%;
		margin-bottom: 5px;
	}
</style>
