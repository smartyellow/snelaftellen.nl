<script context="module">
	import { getPimpOptions } from '$lib/molecules/countdown/helpers';
	import { seasons } from '$lib/molecules/seasons/helpers';

	/** @type {import('./[season]').Load} */
	export async function load({ url, params }) {
		const option = params.season;

		/** @type {import('$lib/molecules/seasons/helpers').Season} */
		let season;
		Object.entries(seasons).forEach(s => {
			if (s[1][0] === option) season = s[1];
		});

		if (!season) return {
			// This is very unlikely, because of the above validator.
			status: 404
		};

		const countTo = season[3];
		const pimpOptions = getPimpOptions(url.searchParams);

		return {
			props: {
				countTo,
				pimpOptions,
				season
			}
		};
	}
</script>

<script lang="ts">
	import type { PimpOptions } from '$lib/molecules/countdown/helpers';
	import CountdownPage from '$lib/molecules/countdown/countdown-page.svelte';
	import type { Season } from '$lib/molecules/seasons/helpers';

	export let countTo: Date;
	export let pimpOptions: PimpOptions;
	export let season: Season;
</script>

<CountdownPage
	{pimpOptions}
	{countTo}
	displayTitle="het begin van de {season[0]}"
/>
