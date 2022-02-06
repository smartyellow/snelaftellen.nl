<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string,any>>> {
		const bg = url.searchParams.get('bg');
		const fg = url.searchParams.get('fg');
		const yl = url.searchParams.get('yl');
		const img = url.searchParams.get('img') || 'no';
		const title = url.searchParams.get('title') || '';

		const today = new Date();
		let countTo;

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
	import { localeOptions, months } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import Pimp from '$lib/countdown/pimp.svelte';

	export let difference = undefined;
	export let countTo = undefined;

	export let bg: string;
	export let fg: string;
	export let yl: string;
	export let img: string;
	export let title: string;

	const localeDate = countTo.toLocaleString('nl-NL', localeOptions);
	const displayTitle = title != '' ? title : localeDate;

	function capitalize(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
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
<Pimp {bg} {fg} {yl} {title} {img} />

<slot />

<hr />
<p>
	{difference > 0
		? `Nog ${difference} dagen wachten tot ${displayTitle}.`
		: `${capitalize(displayTitle)} is inmiddels ${difference * -1} dagen geleden.`}
	Fijn dat we je hebben kunnen helpen! Heb je naar aanleiding van je bezoek vragen, opmerkingen en/of
	suggesties voor deze website? <a href="/contact">Neem contact op!</a>
</p>
