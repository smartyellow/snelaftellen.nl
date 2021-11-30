<script context="module">
	import Meta from "$lib/meta.svelte";

	export const prerender = true;
</script>

<Meta />

<h2>Welkom!</h2>
<p>
	Ga je binnenkort op vakantie?<br>
	Ben je bijna jarig?<br>
	Hoeveel dagen nog tot Nieuwjaar?<br>
	...of kijk je uit naar iets anders?
</p>
<p>
	Gebruik SnelAftellen.nl als digitale aftelkalender om af te tellen naar al je
	toekomstige activiteiten!
</p>

<h2>Hoe werkt het?</h2>
<p>
	Vul een datum in in de box hiernaast (of hieronder). Daarna zie je hoeveel dagen je nog moet wachten tot die datum.
</p>

<h3>Pimp je kalender</h3>
<p>
	Wil je je aftelkalender een persoonlijke touch geven? Pimp de kleurtjes en
	geef je afteldatum een naam.
</p>

<h3>Terugtellen</h3>
<p>
	Terugtellen is ook mogelijk! Vul een datum in het verleden in en je ziet
	hoeveel dagen geleden het is.
</p>

<style>
	@media only screen and (max-width: 750px) {
		:global(.wrapper) {
			flex-direction: column-reverse !important;
		}
	}
</style>
