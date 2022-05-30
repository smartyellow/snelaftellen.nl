<script lang="ts">
	import { months } from '$lib/constants';
	import CalendarMonth from './calendar-month.svelte';
	import CalendarYearPicker from './calendar-year-picker.svelte';
	import type { YearCalendar } from './helpers';

	export let year = new Date().getFullYear();
	export let calendar: YearCalendar;
</script>

<CalendarYearPicker {year} />

<div class="cal-year">
	{#each months as _, month}
		<CalendarMonth {year} {month} {calendar} />
	{/each}
</div>

<style lang="scss">
	@import '../../styles/vars';

	.cal-year {
		display: flex;
		flex-wrap: wrap;
		gap: $padding;

		> :global(*) {
			flex: 1 0 20%;
		}
	}
</style>
