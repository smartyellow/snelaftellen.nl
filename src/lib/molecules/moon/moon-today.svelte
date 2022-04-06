<script lang="ts">
	import { daysOfWeek } from '$lib/constants';
	import IconInfo from '$lib/gfx/svg/icon-info.svelte';
	import { Moon } from 'lunarphase-js';
	import { moonPhases } from './helpers';
	import tooltip from '$lib/ui/tooltip';

	export let d: Date;
	export let showDate = true;

	const phase = Moon.lunarPhase(d);
	const alt = moonPhases[phase][0];
	const src = moonPhases[phase][1];
	const viceversa = moonPhases[phase][2];
</script>

<div class="today">
	<img {src} {alt} title={alt} class:viceversa />
	<div class="info">
		{#if showDate}
			<p class="day">
				Vandaag ({daysOfWeek[d.getDay() - 1] || 'zondag'})
			</p>
		{/if}

		<p class="title">
			{alt}
			<a
				href={moonPhases[phase][3]}
				title="Info over {alt.toLowerCase()}"
				target="_blank"
				use:tooltip
			>
				<IconInfo />
				<span class="sr">Info</span>
			</a>
		</p>
	</div>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.today {
		display: flex;
		align-items: center;
		p {
			margin: 0;
		}
		img {
			margin-right: $padding;
		}
		.info {
			.title {
				font-family: 'Sora', $font-base;
				font-size: 2rem;
			}
			.day {
				text-transform: uppercase;
				color: $grey;
				font-size: 1rem;
			}
		}
	}
</style>
