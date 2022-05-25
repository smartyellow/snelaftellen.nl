<script lang="ts">
	import Alert from "$lib/ui/alert.svelte";
	import { browser } from "$app/env";
	import { units } from "./helpers";

	import IconMinus from "$lib/gfx/svg/icon-minus.svelte";
	import IconPlus from "$lib/gfx/svg/icon-plus.svelte";

	export let input = 1;
	export let output = 60;
	export let from = 'hours';
	export let to = 'minutes';
	export let decimals = 2;

	function change() {
		if (input && from && to) {
			const minutes = units[from].toMins(input);
			output = units[to].fromMins(minutes);
		}
	}
</script>

{#if browser}
	<div>
		<select bind:value={to} on:change={change}>
			{#each Object.keys(units) as unit}
				<option value={unit}>{units[unit].name}</option>
			{/each}
		</select>

		<div class="grid-50 mt">
			<button on:click={() => decimals--} disabled={decimals === 0}>
				<IconMinus /> Minder decimalen
			</button>
			<button on:click={() => decimals++} disabled={decimals === 10}>
				<IconPlus /> Meer decimalen
			</button>
		</div>

		<div class="output mt select center">
			<span class="in">
				{input}
				{input === 1 ? units[from].singular : units[from].name}
			</span>
			<span class="eq">=</span>
			<span class="out">
				{output.toFixed(decimals)}
				{output === 1 ? units[to].singular : units[to].name}
			</span>
		</div>
	</div>
{:else}
	<Alert>
		De omrekentool heeft JavaScript nodig om te werken.
	</Alert>
{/if}

<style lang="scss">
	@import '../../styles/vars';

	select {
		width: 100%;
		font-size: 1.3rem;
		padding: $padding !important;
	}

	.output {
		background-color: #f7c352;
		height: 100%;
		font-size: 1.5rem;
		border-radius: $radius;
		padding: $padding;

		.eq {
			opacity: 0.4;
			margin: 0 1rem;
		}
	}
</style>
