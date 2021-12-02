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

		if (page.params.day) {
			countTo = new Date(
				parseInt(page.params.year),
				parseInt(page.params.month) - 1,
				parseInt(page.params.day)
			);
		} else if (page.params.month) {
			countTo = new Date(parseInt(page.params.year), parseInt(page.params.month) - 1, 1);
		} else if (page.params.year) {
			countTo = new Date(
				parseInt(page.params.year),
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

<script>
	import Countdown from '$lib/countdown.svelte';
	import { localeOptions } from '$lib/constants';
	import Meta from '$lib/meta.svelte';
	import Pimp from '$lib/pimp.svelte';

	export let difference = undefined;
	export let countTo = undefined;

	export let bg;
	export let fg;
	export let yl;
	export let img;
	export let title;

	const localeDate = countTo.toLocaleString('nl-NL', localeOptions);
	const displayTitle = title != '' ? title : localeDate;

	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<Meta
	title="Aftellen tot {localeDate} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten op {localeDate}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {localeDate}."
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
	Fijn dat we je hebben kunnen helpen!
</p>
