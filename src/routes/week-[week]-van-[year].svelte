<script context="module">
	import { getPimpOptions } from '$lib/molecules/countdown/helpers';
	import { isInt } from '$lib/helpers';

	/** @type {import('./week-[week]-van-[year]').Load} */
	export async function load({ url, params }) {
		const { week, year } = params;

		if (!(
			isInt(week) ||
			isInt(year)
		)) return {
			status: 404
		};

		// Thanks to https://stackoverflow.com/a/8803300
		const pimpOptions = getPimpOptions(url.searchParams);
		const beginningOfYear = new Date('Jan 01, ' + year + ' 01:00:00');
		const weekStart = beginningOfYear.getTime() + 604800000 * (parseInt(week) - 1) + 172800000;
		const countTo = new Date(weekStart);

		return {
			props: {
				week,
				year,
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
	export let week: number;
	export let year: number;
</script>

<CountdownPage {pimpOptions} {countTo} displayTitle={`het begin van week ${week} in ${year}`} />
