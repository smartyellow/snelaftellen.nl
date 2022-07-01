<script lang="ts">
	import { titleDivider } from '$lib/constants';
	import type { Country, Timezone } from '$lib/molecules/time/timezones/helpers';
	import Meta from '$lib/layout/meta.svelte';
	import TimezonePage from '$lib/molecules/time/timezones/timezone-page.svelte';

	export let timezone: Timezone;
	export let countries: Country[];
	export let sameOffset: Timezone[];
</script>

<Meta
	title="Tijdzone {timezone._id} {titleDivider} SnelAftellen.nl"
	description="Ga je op vakantie naar {timezone.place}, of heb je een afspraak? Houd hier de huidige tijd op deze plek in de gaten."
/>

<TimezonePage {timezone} {sameOffset} {countries} />
