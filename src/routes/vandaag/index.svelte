<script lang="ts">
	import TodayPage from '$lib/molecules/today/today-page.svelte';
	import type { LunarPhase } from '$lib/molecules/moon/helpers';
	import type { YearCalendar } from '$lib/molecules/calendar/helpers';

	export let lunarPhase: LunarPhase;
	export let calendar: YearCalendar;
</script>

<TodayPage {lunarPhase} {calendar} />
