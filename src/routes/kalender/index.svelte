<script lang="ts">
	import Calendar from '$lib/molecules/calendar/calendar.svelte';
	import Meta from '$lib/layout/meta.svelte';
	import RelatedLinks from '$lib/ui/related-links.svelte';
	import type { YearCalendar } from '$lib/molecules/calendar/helpers';

	export let year = new Date().getFullYear();
	export let calendar: YearCalendar;

	year = Number(year);
</script>

<Meta
	title="Jaarkalender van {year} bekijken op SnelAftellen.nl"
	description="Bekijk hier de jaarkalender van het jaar {year}. Zoek snel dagen en weeknummers op."
/>

<h1>Kies een datum van de kalender</h1>

<Calendar {year} {calendar} />

<RelatedLinks>
	<a href="/seizoenen">Seizoenen {year}</a>
</RelatedLinks>
