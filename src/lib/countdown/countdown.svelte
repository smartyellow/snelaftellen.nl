<script lang="ts">
	import { localeOptions } from '../constants';
	import CountdownSeasonImage from './countdown-season-image.svelte';

	export let count: number;
	export let date: Date;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
</script>

<div class="countdown">
	<div class="countdown-content">
		{#if count > 0}
			<p>nog</p>
			<p class="count">{count}</p>
			<p>{count === 1 ? "dag" : "dagen"} tot {localeDate}</p>
		{:else}
			<p>{localeDate} is</p>
			<p class="count">{count * -1}</p>
			<p>{count === -1 ? "dag" : "dagen"} geleden</p>
		{/if}
	</div>

	<div class="countdown-icons">
		<CountdownSeasonImage d={date} />
	</div>
</div>

<style>
	.countdown {
		text-align: center;
		font-size: 1.3rem;
		background-color: var(--yellow);
		padding: 1rem;
		border: 2px dashed var(--accent-light);
		display: flex;
	}
	.countdown > * :global(:first-child) {
		margin-top: 0;
	}
	.countdown > * :global(:last-child) {
		margin-bottom: 0;
	}
	.countdown-content {
		flex-grow: 1;
		flex-shrink: 0;
	}
	.countdown-icons {
		height: 50px;
		flex-grow: 0;
		flex-shrink: 1;
	}
	.count {
		font-size: 4rem;
		font-weight: 700;
		width: 200px;
		height: 200px;
		margin: 0;
		padding-top: 65px;
		vertical-align: middle;
		background-image: url('../../static/img/countdown/calendar@0.5x.webp');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: center center;
		margin-left: auto;
		margin-right: auto;
		display: inline-block;
		color: #000000;
	}
	p {
		margin: 0;
	}
</style>
