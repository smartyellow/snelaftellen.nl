<script lang="ts">
	import { daysOfWeek } from '$lib/constants';
	import tooltip from '$lib/ui/tooltip';
	import type { LunarPhase, LunarPhaseWithDate } from './helpers';

	import IconInfo from '$lib/gfx/svg/icon-info.svelte';

	export let date: Date;
	export let phase: LunarPhase | LunarPhaseWithDate;
	export let showDate = true;
</script>

<div class="today">
	<img
		src="/img/moon/{phase.id}.svg"
		alt={phase.nl}
		title={phase.nl}
	/>

	<div class="info">
		{#if showDate}
			<p class="day">
				Vandaag ({daysOfWeek[date.getDay() - 1] || 'zondag'})
			</p>
		{/if}

		<p class="title">
			{phase.nl}
			<a
				href={phase.url}
				title="Info over {phase.nl.toLowerCase()}"
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
		gap: $padding;

		p {
			margin: 0;
		}

		img {
			max-width: 100px;
		}

		.info {
			.title {
				font-family: 'Sora', $font-base;
				font-size: 2rem;
				line-height: 1;
			}

			.day {
				text-transform: uppercase;
				color: $grey;
				font-size: 1rem;
			}
		}
	}
</style>
