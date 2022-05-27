<script lang="ts">
	import { months } from '$lib/constants';
	import iconArchery from '$lib/gfx/svg/icon-archery.svg?raw';

	const now = new Date();

	export let year = now.getFullYear();
	export let month = now.getMonth() + 1;
	export let day = now.getDate();
</script>

<select bind:value={day}>
	{#each Array.from({ length: 31 }, (_, i) => i + 1) as i}
		<option value={i} selected={day == i}>{i}</option>
	{/each}
</select>

<select bind:value={month}>
	{#each [...Array(12).keys()] as i}
		<option value={i + 1} selected={month === 1 + 1}>{months[i]}</option>
	{/each}
</select>

<input type="number" bind:value={year} />

<a role="button" href="/{day}-{months[month - 1]}-{year}" class="btn">
	{@html iconArchery} Aftellen
</a>

<style lang="scss">
	input,
	select {
		width: 100%;
		margin-bottom: 5px;
	}
</style>
