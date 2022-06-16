<script lang="ts">
	import { localeOptions } from '$lib/constants';
	import CountdownIcons from './countdown-icons.svelte';
	import { getCountdownUrl } from './pimp/helpers';

	export let count: number;
	export let date: Date;
	export let showIcons = true;
	export let showCountdownLink = false;

	const localeDate = date.toLocaleString('nl-NL', localeOptions);
</script>

<div class="card yellow">
	<div class="countdown">
		<div class="countdown-content">
			<svelte:element
				this={showCountdownLink ? 'a' : 'div'}
				href={showCountdownLink ? getCountdownUrl(date) : undefined}
			>
				{#if count > 0}
					<p>nog</p>
					<p class="count">{count}</p>
					<p>{count === 1 ? 'dag' : 'dagen'} tot {localeDate}</p>
				{:else}
					<p>{localeDate} is</p>
					<p class="count">{count * -1}</p>
					<p>{count === -1 ? 'dag' : 'dagen'} geleden</p>
				{/if}
			</svelte:element>
		</div>

		{#if showIcons}
			<CountdownIcons d={date} />
		{/if}
	</div>
</div>

<style lang="scss">
	p {
		margin: 0;
	}

	.countdown {
		display: flex;
		height: 100%;

		> * :global(:first-child) {
			margin-top: 0;
		}

		> * :global(:last-child) {
			margin-bottom: 0;
		}

		.countdown-content {
			flex-grow: 1;
			flex-shrink: 0;
			text-align: center;
			font-size: 1.3rem;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.count {
				font-size: 4rem;
				font-weight: 700;
				width: 200px;
				height: 200px;
				margin: 0;
				padding-top: 60px;
				vertical-align: middle;
				background-image: url('/img/countdown/calendar.svg');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center center;
				margin-left: auto;
				margin-right: auto;
				display: inline-block;
				color: #000000;
			}
		}
	}
</style>
