<script>
	import { localeOptions } from './constants';

	export let count;
	export let date;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
</script>

<div>
	{#if count > 0}
		<p>nog</p>
		<p class="count">{count}</p>
		<p>dagen tot {localeDate}</p>
	{:else}
		<p>{localeDate} is</p>
		<p class="count">{count * -1}</p>
		<p>dagen geleden</p>
	{/if}
</div>

<style>
	div {
		text-align: center;
		font-size: 1.3rem;
		background-color: var(--yellow);
		padding: 1rem;
		border: 2px dashed var(--accent-light);
	}
	div :global(:first-child) {
		margin-top: 0;
	}
	div :global(:last-child) {
		margin-bottom: 0;
	}
	.count {
		font-size: 4rem;
		font-weight: 700;
		width: 200px;
		height: 200px;
		margin: 0;
		padding-top: 65px;
		vertical-align: middle;
		background-image: url('/img/countdown/calendar@0.5x.webp');
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
