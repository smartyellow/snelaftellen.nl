<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/countdown/helpers';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string,any>>> {
		const pimpOptions = getPimpOptions(url.searchParams);
		const today = new Date();
		let countTo: Date;

		if (params.week && params.year) {
			// https://stackoverflow.com/a/8803300
			const beginningOfYear = new Date("Jan 01, " + params.year + " 01:00:00");
			const week = beginningOfYear.getTime() + 604800000 * (parseInt(params.week) - 1) + 172800000;
			countTo = new Date(week);
		} else {
			return {
				status: 400
			};
		}

		const difference = Math.ceil((countTo.getTime() - today.getTime()) / (1000 * 3600 * 24));

		return {
			props: {
				week: params.week,
				year: params.year,
				difference,
				countTo,
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import Countdown from '$lib/countdown/countdown.svelte';
	import { localeOptions } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import Pimp from '$lib/countdown/pimp.svelte';
	import type { PimpOptions } from '$lib/countdown/helpers';

	export let difference = undefined;
	export let countTo = undefined;
	export let year = 2021;
	export let week = 1;
	export let pimpOptions: PimpOptions;

	const localeDate = countTo.toLocaleString('nl-NL', localeOptions);
	const displayTitle = `week ${week} in ${year}`;

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<Meta
	title="Aftellen tot {displayTitle} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten tot {displayTitle}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {localeDate}."
/>

<h2>
	{difference > 0 ? 'Aftellen naar' : 'Optellen naar'}
	{pimpOptions.title || displayTitle}
</h2>
<Countdown count={difference} date={countTo} />
<Pimp {...pimpOptions} />

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${displayTitle}.`
		: `${pimpOptions.title || capitalize(displayTitle)} is inmiddels ${difference * -1} dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a href="/contact">Neem contact op!</a>
</p>
