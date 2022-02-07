<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/countdown/helpers';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string, any>>> {
		const pimpOptions = getPimpOptions(url.searchParams);
		let countTo: Date;

		if (params.week && params.year) {
			// https://stackoverflow.com/a/8803300
			const beginningOfYear = new Date('Jan 01, ' + params.year + ' 01:00:00');
			const week = beginningOfYear.getTime() + 604800000 * (parseInt(params.week) - 1) + 172800000;
			countTo = new Date(week);
		} else {
			return {
				status: 400
			};
		}

		return {
			props: {
				week: params.week,
				year: params.year,
				countTo,
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import type { PimpOptions } from '$lib/countdown/helpers';
	import CountdownPage from '$lib/countdown/countdown-page.svelte';

	export let countTo = undefined;
	export let pimpOptions: PimpOptions;
	export let week: number;
	export let year: number;
</script>

<CountdownPage {pimpOptions} {countTo} displayTitle={`het begin van week ${week} in ${year}`} />
