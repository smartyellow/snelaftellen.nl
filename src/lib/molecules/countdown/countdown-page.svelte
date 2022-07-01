<script lang="ts">
	import { browser } from '$app/env';
	import { capitalize } from '$lib/helpers';
	import { localeOptions, months } from '$lib/constants';
	import { navigating } from '$app/stores';
	import { pimpStore } from './pimp/helpers';

	import Meta from '../../layout/meta.svelte';
	import Countdown from './countdown.svelte';
	import MoonToday from '../moon/moon-today.svelte';
	import ConvertFixed from '../convert/convert-fixed.svelte';
	import CalendarMonth from '../calendar/calendar-month.svelte';
	import PimpModal from './pimp/pimp-modal.svelte';
	import SaveModal from './save/save-modal.svelte';

	import type { Countdown as CountdownInterface } from './helpers';
	import type { LunarPhase } from '../moon/helpers';
	import type { YearCalendar } from '../calendar/helpers';
	import type { User } from '../account/helpers';

	import iconDesign from '$lib/gfx/svg/icon-design.svg?raw';
	import iconInfo from '$lib/gfx/svg/icon-info.svg?raw';
	import iconFloppy from '$lib/gfx/svg/icon-floppy.svg?raw';
	import iconPencil from '$lib/gfx/svg/icon-pencil.svg?raw';

	export let countdown: CountdownInterface;
	export let calendar: YearCalendar;
	export let lunarPhase: LunarPhase;
	export let user: User;
	export let csrf: string;

	export let pimpModalOpen = false;
	export let saveModalOpen = false;

	const today = new Date();
	const difference = Math.ceil((countdown.countTo.getTime() - today.getTime()) / (1000 * 3600 * 24));
	$: countdown.title = countdown.title || countdown.title || countdown.countTo.toLocaleString('nl-NL', localeOptions);
	$: if ($navigating) pimpStore.set({});
</script>

<Meta
	title="Aftellen tot {countdown.title} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten tot {countdown.title}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {countdown.countTo.toLocaleString(
		'nl-NL',
		localeOptions
	)}."
/>

<h1>
	{difference > 0 ? 'Aftellen naar' : 'Optellen naar'}
	{countdown.title || countdown.title}
</h1>

<Countdown count={difference} date={countdown.countTo} />
<PimpModal
	{countdown}
	{csrf}
	bind:opts={countdown.pimpOptions}
	bind:open={pimpModalOpen}
/>
<SaveModal {user} bind:open={saveModalOpen} {countdown} {csrf} />

<div class="grid-33 mt">
	{#if browser && (!countdown?._id || (countdown.user === user?._id))}
		<button on:click={() => pimpModalOpen = true}>
			{@html iconDesign} Pimp je kalender
		</button>

		<button on:click={() => saveModalOpen = true}>
			{#if countdown?._id}
				{@html iconPencil} Kalender wijzigen
			{:else}
				{@html iconFloppy} NIEUW! Kalender opslaan
			{/if}
		</button>
	{/if}

	<a href="/vandaag" class="btn">
		{@html iconInfo}
		Vandaag de dag
	</a>
</div>

<div class="grid-50 mt">
	<div class="card">
		<h2>Maanstand</h2>
		<MoonToday date={countdown.countTo} phase={lunarPhase} />
		<p>
			<a
				href="/maanstand-{countdown.countTo.getDate()}-{months[countdown.countTo.getMonth()]}-{countdown.countTo.getFullYear()}"
			>Bekijk de maanstand voor de komende 7 dagen.</a>
		</p>
	</div>

	<div class="card">
		<h2>{Math.abs(difference)} dagen omrekenen</h2>
		<ConvertFixed
			from="milliseconds"
			input={Math.abs(today.getTime() - countdown.countTo.getTime())}
			to="minutes"
			output={Math.abs(today.getTime() - countdown.countTo.getTime()) / 60_000}
		/>
		<p>
			<a href="/omrekenen">Reken meer om.</a>
		</p>
	</div>

	<div class="card">
		<h2>Kalender {months[countdown.countTo.getMonth()]} {countdown.countTo.getFullYear()}</h2>
		<CalendarMonth
			month={countdown.countTo.getMonth()}
			year={countdown.countTo.getFullYear()}
			{calendar}
		/>
		<p>
			<a href="/kalender/{countdown.countTo.getFullYear()}">
				Bekijk de hele kalender voor {countdown.countTo.getFullYear()}.
			</a>
		</p>
	</div>
</div>

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${countdown.title}.`
		: difference === 0
		? `${countdown.title || capitalize(countdown.title)} is vandaag!`
		: `${countdown.title || capitalize(countdown.title)} is inmiddels ${
				difference * -1
		  } dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a href="/contact">Neem contact op!</a>
</p>
