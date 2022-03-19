<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { localeOptions, months } from '$lib/constants';
	import { isInt } from '$lib/helpers';

	export async function load({ url, params }: LoadInput): Promise<LoadOutput<Record<string, any>>> {
		let countTo: Date;

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
				countTo
			}
		};
	}
</script>

<script lang="ts">
	import MoonPage from "$lib/molecules/moon/moon-page.svelte";
	import { getCountdownUrl } from '$lib/molecules/countdown/helpers';
	import Meta from "$lib/molecules/layout/meta.svelte";

	export let countTo: Date;

	const locale = countTo.toLocaleString('nl-NL', localeOptions);
</script>

<Meta
	title="De maanstand op {locale}"
	description="Bekijk hier de maanstand op {locale}, en die van de hele week."
/>

<h2>
	Maanstand op
	<a href={getCountdownUrl(countTo)} title="Aftellen naar {locale}">
		{locale}
	</a>
</h2>

<MoonPage d={countTo} />
