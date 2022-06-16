<script lang="ts">
	import type { Country, Timezone } from '$lib/molecules/time/timezones/helpers';
	import Meta from '$lib/layout/meta.svelte';
	import TimezonePageIndex from '$lib/molecules/time/timezones/timezone-page-index.svelte';

	export let timezones: Timezone[];
	export let countriesObject: Record<string, Country>
</script>

<Meta
	title="Tijdzones op SnelAftellen.nl"
	description="Bekijk alle internationale tijdzones op SnelAftellen.nl. Afspraak in een ander land of vakantie? Bekijk hier alles wat je moet weten over je tijdzone."
/>

<TimezonePageIndex {timezones} {countriesObject} />
