<script lang="ts">
	const currentdate = new Date();
	const oneJan = new Date(currentdate.getFullYear(),0,1);
	const numberOfDays = Math.floor((currentdate.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000));
	const weeknum = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

	export let week = weeknum;
	export let year = new Date().getFullYear();
</script>

<select bind:value={week}>
	{#each Array.from({ length: 52 }, (_, i) => i + 1) as i}
		<option value={i} selected={week == i}>{i}</option>
	{/each}
</select>

<input type="number" bind:value={year} />

<a role="button" href="/week-{week}-van-{year}" class="btn"> Aftellen </a>

<style>
	input,
	select {
		width: 100%;
		margin-bottom: 5px;
	}
</style>
