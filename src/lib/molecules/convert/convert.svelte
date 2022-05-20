<script lang="ts">
	import { browser } from "$app/env";
	import Alert from "$lib/ui/alert.svelte";
	import Widget from "$lib/ui/widget.svelte";
	import { units } from "./helpers";

	export let input = 1;
	export let from = 'hours';
	export let to = 'minutes';
	export let output = 60;

	function change() {
		if (input && from && to) {
			const minutes = units[from].toMins(input);
			console.log(units[from].toMins, minutes);

			output = units[to].fromMins(minutes);
		}
	}
</script>

{#if browser}
	<Widget>
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

		<div class="output mt select center">
			<span class="in">{input} {input === 1 ? units[from].singular : units[from].name}</span>
			<span class="eq">=</span>
			<span class="out">{output} {output === 1 ? units[to].singular : units[to].name}</span>
		</div>
	</Widget>
{:else}
	<Alert>
		De omrekentool heeft JavaScript nodig om te werken.
	</Alert>
{/if}

<style lang="scss">
	@import '../../styles/vars';

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
</style>
