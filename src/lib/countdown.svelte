<script>
	import { localeOptions } from "./constants";
	import Widget from "./widget.svelte";

	export let count;
	export let date;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
</script>

<Widget>
	<div>
	{#if count > 0}
		<p>nog</p>
		<p class="count">{count}</p>
		<p>dagen tot {localeDate}</p>
	{:else}
		<p>{localeDate} is</p>
		<p class="count">{count * -1}</p>
		<p>geleden</p>
	{/if}
	</div>
</Widget>

<style>
	div {
		text-align: center;
		font-size: 1.3rem;
	}
	.count {
		font-size: 3rem;
		font-weight: 700;
		margin: 0;
	}
	p {
		margin: 0;
	}
</style>
