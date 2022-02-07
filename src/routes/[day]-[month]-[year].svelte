<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/countdown/helpers';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string,any>>> {
		const pimpOptions = getPimpOptions(url.searchParams);
		const today = new Date();
		let countTo: Date;

		if (params.day) {
			countTo = new Date(
				parseInt(params.year),
				months.indexOf(params.month),
				parseInt(params.day)
			);
		} else if (params.month) {
			countTo = new Date(parseInt(params.year), parseInt(params.month) - 1, 1);
		} else if (params.year) {
			countTo = new Date(
				parseInt(params.year),
				0, // Month is required, so default to January.
				1
			);
		} else {
			return {
				status: 400
			};
		}

		const difference = Math.ceil((countTo.getTime() - today.getTime()) / (1000 * 3600 * 24));

		return {
			props: {
				difference,
				countTo,
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import Countdown from '$lib/countdown/countdown.svelte';
	import { localeOptions, months } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import Pimp from '$lib/countdown/pimp.svelte';
	import { capitalize } from '$lib/helpers';
	import type { PimpOptions } from '$lib/countdown/helpers';

	export let difference = undefined;
	export let countTo = undefined;
	export let pimpOptions: PimpOptions;

	const localeDate = countTo.toLocaleString('nl-NL', localeOptions);
	const displayTitle = pimpOptions.title != '' ? pimpOptions.title : localeDate;
</script>

<Meta
	title="Aftellen tot {localeDate} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten tot {localeDate}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {localeDate}."
/>

<h2>
	{difference > 0 ? 'Aftellen naar' : 'Optellen naar'}
	{displayTitle}
</h2>
<Countdown count={difference} date={countTo} />
<Pimp {...pimpOptions} />

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${displayTitle}.`
		: `${capitalize(displayTitle)} is inmiddels ${difference * -1} dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a href="/contact">Neem contact op!</a>
</p>
