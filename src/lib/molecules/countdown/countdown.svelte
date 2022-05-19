<script lang="ts">
	import { localeOptions } from '$lib/constants';
	import Widget from '$lib/ui/widget.svelte';
	import CountdownIcons from './countdown-icons.svelte';

	import calendarImage from '$lib/gfx/calendar.webp?format=png&width=250&img';

	export let count: number;
	export let date: Date;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
	const countStyle = `background-image: url('${calendarImage}');`;
</script>

<Widget highlighted>
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

		<CountdownIcons d={date} />
	</div>
</Widget>

<style lang="scss">
	@import '../../styles/vars';

	.countdown {
		display: flex;

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
		text-align: center;
		font-size: 1.3rem;
	}

	.count {
		font-size: 4rem;
		font-weight: 700;
		width: 200px;
		height: 200px;
		margin: 0;
		padding-top: 60px;
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
