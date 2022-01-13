<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const bg = page.query.get('bg') || '#ffffff';
		const fg = page.query.get('fg') || '#000000';
		const yl = page.query.get('yl') || '#f8f5c3';
		const img = page.query.get('img') || 'no';
		const title = page.query.get('title') || '';

		const today = new Date();
		let countTo;

		if (page.params.week && page.params.year) {
			// https://stackoverflow.com/a/8803300
			const beginningOfYear = new Date("Jan 01, " + page.params.year + " 01:00:00");
			const week = beginningOfYear.getTime() + 604800000 * (page.params.week - 1);
			countTo = new Date(week);
		} else {
			return {
				status: 400
			};
		}

		const difference = Math.ceil((countTo.getTime() - today.getTime()) / (1000 * 3600 * 24));

		return {
			props: {
				week: page.params.week,
				year: page.params.year,
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

<script>
	import Countdown from '$lib/countdown.svelte';
	import { localeOptions } from '$lib/constants';
	import Meta from '$lib/meta.svelte';
	import Pimp from '$lib/pimp.svelte';

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
