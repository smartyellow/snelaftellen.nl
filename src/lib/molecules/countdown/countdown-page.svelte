<script lang="ts">
	import Meta from '../../layout/meta.svelte';
	import Countdown from './countdown.svelte';
	import type { PimpOptions } from './helpers';
	import Pimp from './pimp.svelte';
	import { capitalize } from '$lib/helpers';
	import { localeOptions, months } from '$lib/constants';
	import RelatedLinks from '$lib/ui/related-links.svelte';

	export let pimpOptions: PimpOptions;
	export let countTo: Date;
	export let displayTitle =
		pimpOptions.title != '' ? pimpOptions.title : countTo.toLocaleString('nl-NL', localeOptions);

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
<Pimp {...pimpOptions} />

<RelatedLinks>
	<a href="/maanstand-{countTo.getDate()}-{months[countTo.getMonth()]}-{countTo.getFullYear()}">
		Maanstand {countTo.toLocaleDateString('nl-NL', localeOptions)}
	</a>
	<a href="/seizoenen">Seizoenen {countTo.getFullYear()}</a>
	<a href="/kalender-{countTo.getFullYear()}">Jaarkalender {countTo.getFullYear()}</a>
</RelatedLinks>

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
