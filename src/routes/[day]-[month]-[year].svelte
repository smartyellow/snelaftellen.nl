<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/countdown/helpers';
	import { months } from '$lib/constants';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string,any>>> {
		const pimpOptions = getPimpOptions(url.searchParams);
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

		return {
			props: {
				countTo,
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import type { PimpOptions } from '$lib/countdown/helpers';
	import CountdownPage from '$lib/countdown/countdown-page.svelte';

	export let countTo: Date;
	export let pimpOptions: PimpOptions;
</script>

<CountdownPage {pimpOptions} {countTo} />
