<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string,any>>> {
		const bg = url.searchParams.get('bg');
		const fg = url.searchParams.get('fg');
		const yl = url.searchParams.get('yl');
		const img = url.searchParams.get('img') || 'no';
		const title = url.searchParams.get('title') || '';

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
				bg,
				fg,
				yl,
				img,
				title
			}
		};
	}
</script>

<script lang="ts">
	import Countdown from '$lib/countdown/countdown.svelte';
	import { localeOptions } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import Pimp from '$lib/countdown/pimp.svelte';

	export let difference = undefined;
	export let countTo = undefined;
	export let year = 2021;
	export let week = 1;

	export let bg;
	export let fg;
	export let yl;
	export let img;
	export let title;

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
	{title || displayTitle}
</h2>
<Countdown count={difference} date={countTo} />
<Pimp {bg} {fg} {yl} {title} {img} />

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${displayTitle}.`
		: `${title || capitalize(displayTitle)} is inmiddels ${difference * -1} dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a href="/contact">Neem contact op!</a>
</p>
