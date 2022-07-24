<script lang="ts">
	import Alert from '$lib/ui/alert.svelte';
	import { browser } from '$app/env';
	import { units } from './helpers';

	import iconMinus from '$lib/gfx/svg/icon-minus.svg?raw';
	import iconPlus from '$lib/gfx/svg/icon-plus.svg?raw';
	import iconSwitch from '$lib/gfx/svg/icon-switch.svg?raw';

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

	function switchFromTo() {
		const _from = from;
		const _input = input;
		from = to;
		to = _from;
		input = output;
		output = _input;
	}
</script>

<svelte:window on:keydown={change} />

{#if browser}
	<div class="card">
		<div class="grid-33">
			<div>
				<label>
					<div class="desc">Hoeveelheid</div>
					<input type="number" bind:value={input} on:change={change} />
				</label>
			</div>
			<div>
				<label>
					<div class="desc">Van</div>
					<select bind:value={from} on:change={change}>
						{#each Object.keys(units) as unit}
							<option value={unit}>{units[unit].name}</option>
						{/each}
					</select>
				</label>
			</div>
			<div>
				<label>
					<div class="desc">Naar</div>
					<select bind:value={to} on:change={change}>
						{#each Object.keys(units) as unit}
							<option value={unit}>{units[unit].name}</option>
						{/each}
					</select>
				</label>
			</div>
		</div>

		<div class="grid-33 mt">
			<button on:click={() => decimals--} disabled={decimals === 0}>
				{@html iconMinus} Minder decimalen
			</button>
			<button on:click={() => decimals++} disabled={decimals === 10}>
				{@html iconPlus} Meer decimalen
			</button>
			<button on:click={switchFromTo}>
				{@html iconSwitch} Eenheden omwisselen
			</button>
		</div>

		<div class="output mt select center">
			<span class="in">
				{input}
				{input === 1 ? units[from].singular : units[from].name}
			</span>
			<span class="eq">=</span>
			<span class="out">
				{output.toLocaleString('nl-NL', {
					maximumFractionDigits: decimals,
					minimumFractionDigits: decimals,
				})}
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
	.desc {
		font-size: 1.5rem;
		margin-bottom: $padding-sm;
	}

	input, select {
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

	@media (max-width: 1200px) {
		.desc { margin-bottom: 0; }
		input, select { margin-top: 0; }
	}
</style>
