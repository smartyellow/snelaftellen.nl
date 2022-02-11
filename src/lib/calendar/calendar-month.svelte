<script lang="ts">
	import { daysOfWeek, months } from "$lib/constants";
	import { areArraysEqual, getDayNumber, getWeekNumber, numberOfDaysInMonth } from "$lib/helpers";
	import CalendarDay from "./calendar-day.svelte";

	export let year = new Date().getFullYear();
	export let month = new Date().getMonth();

	const startDate = new Date(year, month, 1);
	const startOffset = getDayNumber(startDate);
	const weekNumOffset = getWeekNumber(startDate); // === 52 ? 0 : getWeekNumber(startDate)
	const matrix = getMonthMatrix();

	function getMonthMatrix() {
		let out: Array<Array<number | 'noop'>> = [];
		let currentDate = 1;
		let numberOfDays = numberOfDaysInMonth(month + 1, year);

		// each week of this month
		[...Array(6)].map((_, iWeek) => {
			let outWeek = [];

			// each day of this week
			[...Array(7)].map((_, iDay) => {
				if (
					iWeek === 0 && iDay < startOffset ||
					currentDate > numberOfDays
				) {
					outWeek.push('noop');
				} else {
					outWeek.push(currentDate)
					currentDate++;
				}
			});

			if (areArraysEqual(outWeek, Array(7).fill('noop'))) out.push([]);
			else out.push(outWeek);
		});

		return out;
	}
</script>

<div class="cal-month">
	<table>
		<caption>{months[month]}</caption>

		<thead>
			<tr>
				<th class="week">wk</th>
				{#each daysOfWeek as day}
					<th class="dayname" title={day}>{day.slice(0, 2)}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each matrix as weekDates, iWeek}
				{@const week = iWeek + weekNumOffset > 52 ? iWeek : iWeek + weekNumOffset}
				{@const weeknum = week === 0 ? 52 : week}

				<tr>
					<th class="week">
						{#if weekDates.length}
							<CalendarDay label={weeknum} href="/week-{weeknum}-van-{year}" />
						{:else}
							&nbsp;
						{/if}
					</th>
					{#each weekDates as day}
						<td>
							{#if day !== 'noop'}
								<CalendarDay label={day} href="/{day}-{months[month]}-{year}" />
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	@import '../styles/vars';
	.cal-month {
		border: 1px solid $grey;
		border-radius: $radius;
		box-shadow: $shadow;
		table {
			text-align: center;
			padding: 0;
			border-collapse: collapse;
			border-spacing: 0;
			caption {
				font-weight: 700;
				background-color: $accent-light;
				color: $light;
				padding: $padding-sm;
				border-top-left-radius: $radius;
				border-top-right-radius: $radius;
			}
			td, th {
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
				background-color: $grey-light;
				border-right: 1px solid $grey;
			}
			tbody tr:last-of-type th {
				border-bottom-left-radius: $radius;
			}
		}
	}
</style>
