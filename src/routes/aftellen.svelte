<script lang="ts">
	import type { countdownOptions } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import Widget from '$lib/ui/widget.svelte';
	import RelatedLinks from '$lib/ui/related-links.svelte';
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';

	import DatepickerSeason from '$lib/molecules/seasons/datepicker-season.svelte';
	import DatepickerDate from '$lib/molecules/countdown/datepicker-date.svelte';
	import DatepickerWeek from '$lib/molecules/countdown/datepicker-week.svelte';

	import calendarWeek from '$lib/gfx/countdown-types/week.webp?w=200&h=200&img';
	import calendarDate from '$lib/gfx/countdown-types/date.webp?w=200&h=200&img';
	import calendarSeason from '$lib/gfx/countdown-types/season.webp?w=200&h=200&img';

	export let option: typeof countdownOptions[number] = undefined;

	const title = option
		? `Aftellen naar een ${option}`
		: 'Tel af naar datums en weken';

	function visible(o: typeof countdownOptions[number]): boolean {
		return !!(option === o || !option);
	}

	function selected(o: typeof countdownOptions[number]): boolean {
		return !!(option === o);
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

{#if visible('datum') || visible('week')}
	<div class="cols">
		{#if visible('datum')}
			<Widget>
				<a sveltekit:prefetch href="/datum">
					<img src={calendarDate} alt="" />
					<h2>Tel af naar een datum</h2>
				</a>
				{#if selected('datum')}
					<p>Tel af naar je favoriete datum!</p>
					<DatepickerDate />
					<p>Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch gekozen.</p>
					<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
				{/if}
			</Widget>
		{/if}

		{#if visible('week')}
			<Widget>
				<a sveltekit:prefetch href="/week">
					<img src={calendarWeek} alt="" />
					<h2>Tel af naar een week</h2>
				</a>
				{#if selected('week')}
					<p>Tel af naar een bepaald weeknummer van een jaar.</p>
					<DatepickerWeek />
					<p>Stel dat je week 2 in 2022 invult, dan zal er worden afgeteld naar maandag 10 januari 2022.</p>
					<p>We gaan dus uit van het begin van de week.</p>
				{/if}
			</Widget>
		{/if}
	</div>
{/if}

{#if visible('seizoen')}
	<div class="cols">
		<Widget>
			<a sveltekit:prefetch href="/seizoen">
				<img src={calendarSeason} alt="" />
				<h2>Tel af naar een seizoen</h2>
			</a>
			{#if selected('seizoen')}
				<p>Houd je van sneeuw of heb je liever zon?</p>
				<DatepickerSeason />
				<p>
					Er wordt afgeteld naar de eerste dag van een meteorologisch
					seizoen. <a href="/seizoenen">Dit is onze indeling.</a>
				</p>
			{/if}
		</Widget>
	</div>
{/if}

<RelatedLinks>
	<a href="/seizoenen">Seizoenen {new Date().getFullYear()}</a>
</RelatedLinks>


<style lang="scss">
	:global(.widget) img {
		width: 80px;
		height: 80px;
		float: right;
	}
	@media (max-width: 500px) {
		.cols {
			flex-direction: column;
		}
	}
</style>
