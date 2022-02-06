<script lang="ts">
	import { months } from '$lib/constants';

	export let year = new Date().getFullYear();
	export let month = 1;
	export let day = 1;
</script>

<select bind:value={day}>
	{#each Array.from({ length: 31 }, (_, i) => i + 1) as i}
		<option value={i} selected={day == i}>{i}</option>
	{/each}
</select>

<select bind:value={month}>
	{#each [...Array(12).keys()] as i}
		<option value={i + 1} selected={month == i}>{months[i]}</option>
	{/each}
</select>

<input type="number" bind:value={year} />

<a role="button" href="/{day}-{months[month - 1]}-{year}" class="btn"> Aftellen </a>

<style lang="scss">
	input,
	select {
		width: 100%;
		margin-bottom: 5px;
	}
</style>
