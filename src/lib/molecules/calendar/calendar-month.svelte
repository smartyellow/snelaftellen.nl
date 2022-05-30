<script lang="ts">
	import { daysOfWeek, months, monthsEn } from '$lib/constants';
	import { areDatesEqual } from '$lib/dates';
	import { getCountdownUrl } from '../pimp/helpers';
	import CalendarDay from './calendar-day.svelte';
	import type { MonthMatrix, YearCalendar } from './helpers';

	export let year = new Date().getFullYear();
	export let month = new Date().getMonth();
	export let showYear = false;
	export let calendar: YearCalendar;

	const today = new Date();
	const monthCalendar: MonthMatrix = calendar.filter(m =>
		m[0] === monthsEn[month].toLowerCase().slice(0, 3)
	)[0][1];
	today.setHours(0, 0, 0, 0);
</script>

<div class="cal-month">
	<table>
		<caption>{months[month]} {showYear ? year : ''}</caption>

		<thead>
			<tr>
				<th class="week">wk</th>
				{#each daysOfWeek as day}
					<th class="dayname" title={day}>{day.slice(0, 2)}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each monthCalendar as week}
				<tr>
					<th class="week">
						{#if week[1].length}
							<CalendarDay label={week[0]} href="/week-{week[0]}-van-{year}" />
						{:else}
							&nbsp;
						{/if}
					</th>

					{#each week[1] as day}
						<td>
							{#if day !== null}
								<CalendarDay
									label={day}
									href={areDatesEqual(today, new Date(year, month, day))
										? '/vandaag'
										: getCountdownUrl(new Date(year, month, day))}
									today={areDatesEqual(today, new Date(year, month, day))}
								/>
							{:else}
								&nbsp;
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../../styles/vars';

	.cal-month {
		border: 1px solid #000;
		border-bottom-width: 2px;

		table {
			text-align: center;
			padding: 0;
			border-collapse: collapse;
			border-spacing: 0;
			width: 100%;

			caption {
				font-weight: 700;
				background-color: $accent-light;
				color: $light;
				padding: $padding-sm;
			}

			td,
			th {
				min-width: 30px;
			}

			thead {
				th {
					font-weight: 600;
					padding: 5px;

					&.dayname {
						border-bottom: 1px solid $grey;
					}

					&.week {
						color: darken($grey, 20);
					}
				}
			}

			th.week {
				background-color: $light;
				border-right: 1px solid $grey;
			}
		}
	}
</style>
