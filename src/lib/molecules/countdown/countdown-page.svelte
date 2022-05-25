<script lang="ts">
	import { browser } from '$app/env';
	import type { PimpOptions } from '../pimp/helpers';
	import { capitalize } from '$lib/helpers';
	import { localeOptions, months } from '$lib/constants';

	import PimpModal from '../pimp/pimp-modal.svelte';
	import Meta from '../../layout/meta.svelte';
	import Countdown from './countdown.svelte';
	import MoonToday from '../moon/moon-today.svelte';
	import ConvertFixed from '../convert/convert-fixed.svelte';
	import CalendarMonth from '../calendar/calendar-month.svelte';

	import IconMoon from '$lib/gfx/svg/icon-moon.svelte';
	import IconDesign from '$lib/gfx/svg/icon-design.svelte';
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';
	import IconUmbrella from '$lib/gfx/svg/icon-umbrella.svelte';

	export let pimpOptions: PimpOptions;
	export let countTo: Date;
	export let displayTitle = pimpOptions.title || countTo.toLocaleString('nl-NL', localeOptions);
	export let pimpModalOpen = false;

	const today = new Date();
	const difference = Math.ceil((countTo.getTime() - today.getTime()) / (1000 * 3600 * 24));
</script>

<Meta
	title="Aftellen tot {displayTitle} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten tot {displayTitle}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {countTo.toLocaleString(
		'nl-NL',
		localeOptions
	)}."
/>

<h1>
	{difference > 0 ? 'Aftellen naar' : 'Optellen naar'}
	{pimpOptions.title || displayTitle}
</h1>

<Countdown count={difference} date={countTo} />
<PimpModal {...pimpOptions} bind:open={pimpModalOpen} />

<div class="grid-50 mt">
	<div class="card">
		<h2>Maanstand</h2>
		<MoonToday d={countTo} />
		<p>
			<a
				href="/maanstand-{countTo.getDate()}-{months[countTo.getMonth()]}-{countTo.getFullYear()}"
			>Bekijk de maanstand voor de komende 7 dagen.</a>
		</p>
	</div>

	<div class="stretch-v buttons">
		{#if browser}
			<button on:click={() => pimpModalOpen = !pimpModalOpen}>
				<IconDesign />
				Pimp je kalender
			</button>
		{/if}

		<a href="/kalender-{countTo.getFullYear()}" class="btn">
			<IconCalendar />
			Jaarkalender {countTo.getFullYear()}
		</a>
	</div>

	<div class="card">
		<h2>{Math.abs(difference)} dagen omrekenen</h2>
		<ConvertFixed
			from="days"
			input={Math.abs(difference)}
			to="minutes"
			output={Math.abs(difference) * 24 * 60}
		/>
		<p>
			<a href="/omrekenen">Reken meer om.</a>
		</p>
	</div>

	<div class="card">
		<h2>Kalender {months[countTo.getMonth()]} {countTo.getFullYear()}</h2>
		<CalendarMonth month={countTo.getMonth()} year={countTo.getFullYear()} />
		<p>
			<a href="/kalender-{countTo.getFullYear()}">
				Bekijk de hele kalender voor {countTo.getFullYear()}.
			</a>
		</p>
	</div>
</div>

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${displayTitle}.`
		: difference === 0
		? `${pimpOptions.title || capitalize(displayTitle)} is vandaag!`
		: `${pimpOptions.title || capitalize(displayTitle)} is inmiddels ${
				difference * -1
		  } dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a sveltekit:prefetch href="/contact">Neem contact op!</a>
</p>

<style lang="scss">
	.buttons {
		@media (max-width: 1200px) {
			order: -1;
		}
	}
</style>
