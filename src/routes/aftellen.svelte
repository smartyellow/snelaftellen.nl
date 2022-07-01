<script lang="ts">
	import type { countdownOptions } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import RelatedLinks from '$lib/ui/related-links.svelte';

	import DatepickerSeason from '$lib/molecules/seasons/datepicker-season.svelte';
	import DatepickerDate from '$lib/molecules/countdown/datepicker-date.svelte';
	import DatepickerWeek from '$lib/molecules/countdown/datepicker-week.svelte';

	import iconCalendar from '$lib/gfx/svg/icon-calendar.svg?raw';

	export let option: typeof countdownOptions[number] = undefined;

	const now = new Date();
	const title = option ? `Aftellen naar een ${option}` : 'Tel af naar datums en weken';
	let description: string;
	let optionDesignation: string;

	switch (option) {
		case 'datum':
			description =
				'Tel af naar je favoriete datum! Hoe lang moet je nog wachten tot je verjaardag, vakantie of vrije dag? Tel ernaar af op SnelAftellen.nl!';
			optionDesignation = 'de datumkiezer';
			break;

		case 'week':
			description =
				"Aftellen naar welke week dan ook, het kan op SnelAftellen.nl. Weet je het weeknummer van je vakantie? Voer 'm in en tel ernaar af!";
			optionDesignation = 'de weekkiezer';
			break;

		case 'season':
			description =
				'Naar welk seizoen kijk jij uit? Houd je van de winter, of heb je liever een zonnige zomer? Tel af naar je favoriete seizoen op SnelAftellen.nl!';
			optionDesignation = 'de seizoenskiezer;';
			break;

		default:
			description =
				'Hoe lang nog wachten tot Sinterklaas? Wanneer is Nieuwjaar? Over hoeveel nachten gaan we op vakantie? SnelAftellen.nl is je digitale aftelkalender.';
			optionDesignation = 'een van de opties';
			break;
	}

	function visible(o: typeof countdownOptions[number]): boolean {
		return !!(option === o || !option);
	}

	function selected(o: typeof countdownOptions[number]): boolean {
		return !!(option === o);
	}
</script>

<Meta title="{title} op SnelAftellen.nl" {description} />

<h1>{title}</h1>

<p>
	Gebruik {optionDesignation} hieronder. Ben je benieuwd hoe het werkt? Lees het
	<a href="/over">hier</a>!
</p>

<p>
	<span class="btn-desc">of gebruik de</span>
	<a href="/kalender" class="btn">
		{@html iconCalendar} Jaarkalender
	</a>
</p>

<div class="grid-50">
	{#if visible('datum')}
		<div class="card">
			<a href="/datum">
				<img src="/img/countdown/types/date.webp" alt="" />
				<h2>Tel af naar een datum</h2>
			</a>
			{#if selected('datum')}
				<p>Tel af naar je favoriete datum!</p>
				<DatepickerDate />
				<p>
					Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch
					gekozen.
				</p>
				<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
			{/if}
		</div>
	{/if}

	{#if visible('week')}
		<div class="card">
			<a href="/week">
				<img src="/img/countdown/types/week.webp" alt="" />
				<h2>Tel af naar een week</h2>
			</a>
			{#if selected('week')}
				<p>Tel af naar een bepaald weeknummer van een jaar.</p>
				<DatepickerWeek />
				<p>
					Stel dat je week 2 in 2022 invult, dan zal er worden afgeteld naar maandag 10 januari
					2022.
				</p>
				<p>We gaan dus uit van het begin van de week.</p>
			{/if}
		</div>
	{/if}

	{#if visible('seizoen')}
		<div class="card">
			<a href="/seizoen">
				<img src="/img/countdown/types/season.webp" alt="" />
				<h2>Tel af naar een seizoen</h2>
			</a>
			{#if selected('seizoen')}
				<p>Houd je van sneeuw of heb je liever zon?</p>
				<DatepickerSeason />
				<p>
					Er wordt afgeteld naar de eerste dag van een meteorologisch seizoen. <a href="/seizoenen"
						>Dit is onze indeling.</a
					>
				</p>
			{/if}
		</div>
	{/if}
</div>

<RelatedLinks>
	<a href="/seizoenen">Seizoensindeling {now.getFullYear()}</a>
	<a href="/kalender">Jaarkalender {now.getFullYear()}</a>
</RelatedLinks>

<style lang="scss">
	.grid-50 {
		.card img {
			width: 80px;
			height: 80px;
			float: right;
		}

		h2 {
			border: none;
			padding: 0;
		}
	}
</style>
