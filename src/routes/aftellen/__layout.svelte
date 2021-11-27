<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ page, fetch, session, stuff }) {
		const today = new Date();
		let countTo;

		if (page.params.day) {
			countTo = new Date(
				parseInt(page.params.year),
				parseInt(page.params.month) - 1,
				parseInt(page.params.day)
			);
		} else if (page.params.month) {
			countTo = new Date(
				parseInt(page.params.year),
				parseInt(page.params.month) - 1,
				1
			);
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
				countTo
			}
		};
	}
</script>

<script>
	import Countdown from "$lib/countdown.svelte";
	import { localeOptions } from "$lib/constants";
	import Meta from "$lib/meta.svelte";

	export let difference = undefined;
	export let countTo = undefined;

	const localeDate = countTo.toLocaleString('nl-NL', localeOptions);
</script>

<Meta
	title="Aftellen tot {localeDate} op SnelAftellen.nl"
	description="Hoe lang moet je nog wachten op {localeDate}? Check het op SnelAftellen.nl! Hier vind je hoe lang je nog moet wachten voor {localeDate}."
/>

<Countdown count={difference} date={countTo} />
<slot></slot>

<hr />
<p>
	Je moet nog {difference} dagen wachten voor {countTo.toLocaleString('nl-NL', localeOptions)}.
	Fijn dat we je hebben kunnen helpen!
</p>
