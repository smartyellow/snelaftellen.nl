<script lang="ts">
	import { getCountdownUrl } from '../pimp/helpers';
	import MoonToday from './moon-today.svelte';
	import MoonWeek from './moon-week.svelte';
	import { difference } from '$lib/dates';
	import type { LunarPhaseWithDate } from './helpers';

	import Countdown from '../countdown/countdown.svelte';

	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';
	import IconUmbrella from '$lib/gfx/svg/icon-umbrella.svelte';
import { months } from '$lib/constants';
import CalendarMonth from '../calendar/calendar-month.svelte';

	export let date: Date;
	export let phases: LunarPhaseWithDate[];
</script>

<div class="moon">
	<MoonToday {date} phase={phases[0]} />
	<MoonWeek {phases} />
</div>

<div class="grid-50 mt">
	<a href={getCountdownUrl(date)} class="btn">
		<IconCalendar /> Aftellen
	</a>

	<a href="/seizoenen" class="btn">
		<IconUmbrella /> Seizoenen
	</a>

	<Countdown
		{date}
		showIcons={false}
		showCountdownLink={true}
		count={difference(date)}
	/>

	<div class="card">
		<h2>Kalender {months[date.getMonth()]} {date.getFullYear()}</h2>
		<CalendarMonth
			month={date.getMonth()}
			year={date.getFullYear()}
			showYear={true}
		/>
		<p>
			<a href="/kalender-{date.getFullYear()}" sveltekit:prefetch>
				Bekijk de volledige kalender van {date.getFullYear()}.
			</a>
		</p>
	</div>
</div>

<style lang="scss">
	@import '../../styles/vars';

	.moon {
		:global(div:not(:last-child)) {
			margin-bottom: $padding;
		}
	}
</style>
