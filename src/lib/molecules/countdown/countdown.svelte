<script lang="ts">
	import { localeOptions } from '$lib/constants';
	import CountdownSeasonImage from './countdown-season-image.svelte';
	import calendarImage from '$lib/gfx/calendar.webp?format=png&width=250&img';

	export let count: number;
	export let date: Date;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
	const countStyle = `background-image: url('${calendarImage}');`;
</script>

<div class="countdown">
	<div class="countdown-content">
		{#if count > 0}
			<p>nog</p>
			<p class="count" style={countStyle}>{count}</p>
			<p>{count === 1 ? 'dag' : 'dagen'} tot {localeDate}</p>
		{:else}
			<p>{localeDate} is</p>
			<p class="count" style={countStyle}>{count * -1}</p>
			<p>{count === -1 ? 'dag' : 'dagen'} geleden</p>
		{/if}
	</div>

	<div class="countdown-icons">
		<CountdownSeasonImage d={date} />
	</div>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.countdown {
		text-align: center;
		font-size: 1.3rem;
		background-color: $yellow;
		background-color: var(--yellow);
		padding: $padding;
		border: 2px dashed $accent-light;
		display: flex;
		gap: $padding-sm;
		> * :global(:first-child) {
			margin-top: 0;
		}
		> * :global(:last-child) {
			margin-bottom: 0;
		}
	}
	.countdown-content {
		flex-grow: 1;
		flex-shrink: 0;
	}
	.countdown-icons {
		height: 50px;
		flex-grow: 0;
		flex-shrink: 1;
		@media (max-width: 500px) {
			display: none;
		}
	}
	.count {
		font-size: 4rem;
		font-weight: 700;
		width: 200px;
		height: 200px;
		margin: 0;
		padding-top: 65px;
		vertical-align: middle;
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
