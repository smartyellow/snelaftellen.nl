<script lang="ts">
	import DatepickerDate from '$lib/countdown/datepicker-date.svelte';
	import DatepickerWeek from '$lib/countdown/datepicker-week.svelte';
	import Meta from '$lib/layout/meta.svelte';
	import Widget from '$lib/layout/widget.svelte';
	import calendarWeek from '$lib/gfx/calendar-week@0.5x.webp?w=200&h=200&img';
	import calendarDate from '$lib/gfx/calendar-date@0.5x.webp?w=200&h=200&img';
	import type { countdownOptions } from '$lib/constants';
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';

	export let option: typeof countdownOptions[number] = undefined;

	const title = option
		? `Aftellen naar een ${option}`
		: 'Tel af naar datums en weken';

	function selected(o: typeof countdownOptions[number]): boolean {
		return !!(option === o || !option);
	}
</script>

<Meta title="{title} op SnelAftellen.nl" />

<h1>{title}</h1>

<p>
	Gebruik deze
	<a href="/kalender" class="btn" sveltekit:prefetch>
		<IconCalendar />
		Jaarkalender
	</a>, of gebruik een van de opties hieronder. Ben je benieuwd hoe het werkt?
	Lees het <a href="/over" sveltekit:prefetch>hier</a>!
</p>

<div class="cols">
	{#if selected('datum')}
		<Widget>
			<a sveltekit:prefetch href="/datum">
				<img src={calendarDate} alt="" />
				<h2>Tel af naar een datum</h2>
			</a>
			<p>Tel af naar je favoriete datum!</p>
			<DatepickerDate />
			<p>Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch gekozen.</p>
			<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
		</Widget>
	{/if}

	{#if selected('week')}
		<Widget>
			<a sveltekit:prefetch href="/week">
				<img src={calendarWeek} alt="" />
				<h2>Tel af naar een week</h2>
			</a>
			<p>Tel af naar een bepaald weeknummer van een jaar.</p>
			<DatepickerWeek />
			<p>Stel dat je week 2 in 2022 invult, dan zal er worden afgeteld naar maandag 10 januari 2022.</p>
			<p>We gaan dus uit van het begin van de week.</p>
		</Widget>
	{/if}
</div>

<style lang="scss">
	:global(.widget) img {
		width: 80px;
		height: 80px;
		float: right;
	}
	@media screen and (max-width: 500px) {
		.cols {
			flex-direction: column;
		}
	}
</style>
