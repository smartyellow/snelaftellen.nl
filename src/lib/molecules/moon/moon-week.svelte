<script lang="ts">
	import { daysOfWeek, localeOptions, months } from '$lib/constants';
	import { getCountdownUrl } from '../countdown/pimp/helpers';
	import tooltip from '$lib/ui/tooltip';
	import type { LunarPhaseWithDate } from './helpers';

	export let phases: LunarPhaseWithDate[];
</script>

<div class="week">
	{#each phases as phase}
		<div class="day">
			<a
				href={getCountdownUrl(phase.date)}
				rel="external"
				title="Aftellen naar {phase.date.toLocaleString('nl-NL', localeOptions)}"
				use:tooltip
			>
				<img src="/img/moon/{phase.id}.svg" alt="" />
				<p class="day">{daysOfWeek[phase.date.getDay() - 1] || 'zondag'}</p>
				<p class="date" title="{phase.date.getDate()} {months[phase.date.getMonth()]} {phase.date.getFullYear()}">
					{phase.date.getDate()}-{phase.date.getMonth() + 1}
				</p>
				<p class="phase">{phase.nl}</p>
			</a>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../../styles/vars';

	.week {
		display: flex;
		justify-content: space-between;
		gap: $padding;
		flex-wrap: wrap;

		.day {
			flex: 1;
			text-align: center;

			&:last-child {
				margin-right: auto;
			}

			a {
				color: $dark;
				text-decoration: none;
				display: block;
				padding: $padding-sm 0;

				&:hover {
					background-color: $light;

					.day {
						text-decoration: underline;
					}
				}
			}

			p,
			img {
				margin: 0;
				margin-bottom: $padding-sm;
			}

			img {
				max-width: 3rem;
			}

			.day {
				text-transform: uppercase;
				font-weight: 700;
			}

			.date {
				color: $grey;
			}
		}
	}
</style>
