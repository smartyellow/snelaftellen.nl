<script context="module">
	import { getPimpOptions } from '$lib/molecules/countdown/helpers';
	import { months } from '$lib/constants';
	import { isInt } from '$lib/helpers';

	/** @type {import('./[day]-[month]-[year]').Load} */
	export async function load({ url, params }) {
		const pimpOptions = getPimpOptions(url.searchParams);
		/** @type {Date} */ let countTo;

		if (!(
			isInt(params.year) ||
			isInt(params.month) ||
			isInt(params.day)
		)) return {
			status: 404
		};

		if (params.day) {
			countTo = new Date(parseInt(params.year), months.indexOf(params.month), parseInt(params.day));
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
				status: 400,
				error: 'Given date is not valid.'
			};
		}

		return {
			props: {
				countTo,
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import type { PimpOptions } from '$lib/molecules/countdown/helpers';
	import CountdownPage from '$lib/molecules/countdown/countdown-page.svelte';

	export let countTo: Date;
	export let pimpOptions: PimpOptions;
</script>

<CountdownPage {pimpOptions} {countTo} />
