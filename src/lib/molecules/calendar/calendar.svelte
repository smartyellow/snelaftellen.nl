<script lang="ts">
	import { months } from '$lib/constants';
	import CalendarMonth from './calendar-month.svelte';
	import CalendarYearPicker from './calendar-year-picker.svelte';

	export let year = new Date().getFullYear();
</script>

<CalendarYearPicker {year} />

<div class="cal-year">
	{#each months as _, month}
		<CalendarMonth {year} {month} />
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
