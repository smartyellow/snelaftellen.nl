<script context="module">
	import { localeOptions, months } from '$lib/constants';
	import { isInt } from '$lib/helpers';
	import tooltip from '$lib/ui/tooltip';

	/** @type {import('./maanstand-[day]-[month]-[year]').Load} */
	export async function load({ params }) {
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
				countTo
			}
		};
	}
</script>

<script lang="ts">
	import MoonPage from "$lib/molecules/moon/moon-page.svelte";
	import { getCountdownUrl } from '$lib/molecules/countdown/helpers';
	import Meta from "$lib/layout/meta.svelte";
	import { titleDivider } from '$lib/constants';

	export let countTo: Date;

	const locale = countTo.toLocaleString('nl-NL', localeOptions);
</script>

<Meta
	title="De maanstand op {locale} {titleDivider} SnelAftellen.nl"
	description="Bekijk hier de maanstand op {locale}, en die van de hele week."
/>

<h1>
	Maanstand op
	<a href={getCountdownUrl(countTo)} title="Aftellen naar {locale}" use:tooltip>
		{locale}
	</a>
</h1>

<MoonPage d={countTo} />
