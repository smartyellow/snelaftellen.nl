<script lang="ts">
	import { daysOfWeek, months } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import CalendarMonth from '../calendar/calendar-month.svelte';
	import MoonToday from '../moon/moon-today.svelte';
	import type { LunarPhase } from '../moon/helpers';
	import type { YearCalendar } from '../calendar/helpers';

	export let lunarPhase: LunarPhase;
	export let calendar: YearCalendar;

	const date = new Date();
</script>

<Meta
	title="Alles over vandaag op SnelAftellen.nl"
	description="Bekijk alle informatie over vandaag de dag op SnelAftellen.nl."
/>

<h1>Vandaag de dag</h1>

<div class="card yellow">
	<p class="event-date">
		<span class="day">{daysOfWeek[date.getDay()]}</span>
		<span class="date count">
			{date.getDate()}
		</span>
		<span class="month">{months[date.getMonth()]}</span>
		<span class="year">{date.getFullYear()}</span>
	</p>
</div>

<div class="grid-50">
	<div class="card">
		<h2>
			<a href="/kalender">Kalender</a>
			{months[date.getMonth()]}
			{date.getFullYear()}
		</h2>

		<CalendarMonth
			{calendar}
			month={date.getMonth()}
			year={date.getFullYear()}
			showYear
		/>

		<p>
			<a href="/kalender">
				Bekijk de volledige kalender van {date.getFullYear()}
			</a>
		</p>
	</div>

	<div class="card">
		<h2>
			<a
				href="/maanstand-{date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}"
				sveltekit:prefetch
			>
				Maanstand
			</a>
			{date.getDate()}
			{months[date.getMonth()]}
		</h2>

		<MoonToday date={date} showDate={false} phase={lunarPhase} />

		<p>
			<a
				href="/maanstand-{date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}"
				sveltekit:prefetch
			>
				Bekijk de maanstanden van de komende 7 dagen
			</a>
		</p>
	</div>
</div>

<style lang="scss">
	.event-date {
		text-align: center;
		font-size: 2.5rem;

		.date {
			font-weight: 700;
			width: 7rem;
			font-size: 3rem;
			height: 7rem;
			padding-top: 1.5rem;
			vertical-align: middle;
			text-align: center;
			background-image: url('/img/countdown/calendar.svg');
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center center;
			display: inline-block;
			color: #000000;
		}
	}

	.grid-50 {
		margin-top: $padding-sm;
	}
</style>
