
<script lang="ts">
	import CountdownPage from '$lib/molecules/countdown/countdown-page.svelte';
	import type { YearCalendar } from '$lib/molecules/calendar/helpers';
	import type { LunarPhase } from '$lib/molecules/moon/helpers';
	import type { Season } from '$lib/molecules/seasons/helpers';
	import type { User } from '$lib/molecules/account/helpers';
	import type { Countdown } from '$lib/molecules/countdown/helpers';

	export let countdown: Countdown;
	export let season: Season;
	export let lunarPhase: LunarPhase;
	export let calendar: YearCalendar;
	export let user: User;
	export let csrf: string;

	$: countdown.countTo = new Date(countdown.countTo);
	$: countdown.title = countdown.title || `het begin van de ${season[0]}`;
</script>

<CountdownPage {countdown} {lunarPhase} {calendar} {user} {csrf} />
