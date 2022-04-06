<script>
	import { daysOfWeek, months } from "$lib/constants";
	import Widget from "$lib/ui/widget.svelte";
	import calendarImage from '$lib/gfx/calendar.webp?format=png&width=200&img';
	import Meta from "$lib/layout/meta.svelte";
	import CalendarMonth from "../calendar/calendar-month.svelte";
	import MoonToday from "../moon/moon-today.svelte";

	const date = new Date();
	const countStyle = `background-image: url('${calendarImage}');`;
</script>

<Meta
	title="Alles over vandaag op SnelAftellen.nl"
	description="Bekijk alle informatie over vandaag de dag op SnelAftellen.nl."
/>

<h1>Vandaag de dag</h1>

<Widget highlighted>
	<p class="event-date">
		<span class="day">{daysOfWeek[date.getDay()]}</span>
		<span class="date count" style={countStyle}>
			{date.getDate()}
		</span>
		<span class="month">{months[date.getMonth()]}</span>
		<span class="year">{date.getFullYear()}</span>
	</p>
</Widget>

<div class="cols">
	<Widget>
		<h2>
			<a href="/kalender-{date.getFullYear()}" sveltekit:prefetch>
				Kalender
			</a>
			{months[date.getMonth()]} {date.getFullYear()}
		</h2>

		<CalendarMonth
			month={date.getMonth()}
			year={date.getFullYear()}
			showYear
		/>

		<p>
			<a href="/kalender-{date.getFullYear()}" sveltekit:prefetch>
				Bekijk de volledige kalender van {date.getFullYear()}
			</a>
		</p>
	</Widget>

	<Widget>
		<h2>
			<a href="/maanstand-{date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}" sveltekit:prefetch>
				Maanstand
			</a>
			{date.getDate()} {months[date.getMonth()]}
		</h2>

		<MoonToday d={date} showDate={false} />

		<p>
			<a href="/maanstand-{date.getDate()}-{months[date.getMonth()]}-{date.getFullYear()}" sveltekit:prefetch>
				Bekijk de maanstanden van de komende 7 dagen
			</a>
		</p>
	</Widget>
</div>

<style lang="scss">
	@import '../../styles/vars';
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
			background-repeat: no-repeat;
			background-size: contain;
			background-position: center center;
			display: inline-block;
			color: #000000;
		}
	}
	.cols {
		margin-top: $padding-sm;
		:global {
			.widget {
				h2 {
					padding-bottom: $padding-sm;
					margin-bottom: $padding;
					border-bottom: $border solid $grey;
				}
			}
		}
	}
</style>
