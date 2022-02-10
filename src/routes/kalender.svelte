<script lang="ts">
	import Calendar from "$lib/calendar/calendar.svelte";
	import Meta from "$lib/layout/meta.svelte";

	export let year = new Date().getFullYear();
</script>

<Meta title="Jaarkalender {year} van SnelAftellen.nl" />

<h1>Kies een datum van de kalender</h1>

<Calendar {year} />
