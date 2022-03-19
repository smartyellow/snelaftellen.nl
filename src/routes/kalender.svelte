<script lang="ts">
	import Calendar from "$lib/molecules/calendar/calendar.svelte";
	import Meta from "$lib/molecules/layout/meta.svelte";

	export let year = new Date().getFullYear();
</script>

<Meta
	title="Jaarkalender van {year} bekijken op SnelAftellen.nl"
	description="Bekijk hier de jaarkalender van het jaar {year}. Zoek snel dagen en weeknummers op."
/>

<h1>Kies een datum van de kalender</h1>

<Calendar {year} />
