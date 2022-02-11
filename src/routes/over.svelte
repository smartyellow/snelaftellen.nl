<script lang="ts">
	import Meta from "$lib/layout/meta.svelte";

	import s1 from '$lib/gfx/calculation/1.png?img';
	import s2 from '$lib/gfx/calculation/2.png?img';
	import s3 from '$lib/gfx/calculation/3.png?img';
	import s4 from '$lib/gfx/calculation/4.png?img';
</script>

<Meta title="Alles over SnelAftellen.nl" description="Op SnelAftellen.nl tel je snel af naar een bepaalde datum. Maar hoe wordt het verschil dussen twee data berekend? Lees het hier." />

<h1>Over SnelAftellen.nl</h1>

<h2 id="hoe">Hoe werkt het aan de binnenkant?</h2>

<p>
	Op SnelAftellen.nl tel je snel af naar een bepaalde datum, zoals je
	waarschijnlijk wel wist (en de naam doet vermoeden). Maar hoe wordt het
	verschil tussen twee data berekend? Lees het hier.
</p>

<p>
	Als je erg technisch bent, kan je de
	<a href="https://github.com/garraflavatra/snelaftellen.nl" target="_blank">code bekijken op GitHub</a>.
	Je kunt ook hieronder bekijken hoe de berekening gebeurt. In het voorbeeld
	gaan we aftellen naar <a href="/3-januari-2022">3 januari 2022</a> vanaf 1 januari 2022.
</p>

<p><img src={s1} alt="Welke dag is het vandaag? Laten we ervan uitgaan dat het 1 januari 2022 is." /></p>
<p><img src={s2} alt="We gaan aftellen naar 3 januari, dus 3 jan min 1 jan" /></p>
<p><img src={s3} alt="Van 1 naar 2 is eenn dag en van 2 naar 3 is een dag." /></p>
<p><img src={s4} alt="Daarom is het nog twee dagen tot 3 januari." /></p>
