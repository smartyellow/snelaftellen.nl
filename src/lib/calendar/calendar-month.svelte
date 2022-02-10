<script lang="ts">
	import { daysOfWeek, months } from "$lib/constants";
	import { convertDayNumberFromMondayToSunday, getDateFromDayWeekAndYear, getDateFromWeekNumber, getDayNumber, getWeekNumber } from "$lib/helpers";

	export let year = new Date().getFullYear();
	export let month = new Date().getMonth();

	const startDate = new Date(year, month, 1);
	const offset = getDayNumber(startDate);
	const weekOffset = getWeekNumber(startDate); // === 52 ? 0 : getWeekNumber(startDate)
</script>

<table>
	<caption>{months[month]}</caption>

	<thead>
		<tr>
			<th></th>
			{#each daysOfWeek as day}
				<th title={day}>{day.slice(0, 2)}</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each Array(6) as _, iWeek}
			{@const week = iWeek > 52 ? iWeek + 1 : iWeek + weekOffset}

			<tr>
				<th>{week === 0 ? 52 : week}</th>

				{#each Array(7) as _, iWeekDay}
					{@const empty = iWeek === 0 && iWeekDay < offset}
					<td class:empty>
						{#if !empty}
							{getDateFromDayWeekAndYear(convertDayNumberFromMondayToSunday(iWeekDay), week, year).getDate()}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	@import '../styles/vars';
	table {
		text-align: center;
		caption {
			font-weight: 700;
		}
		thead {
			th {
				font-weight: 600;
			}
		}
		tbody {
			th {
				background-color: $grey;
			}
		}
	}
</style>
