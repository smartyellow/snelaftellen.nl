<script lang="ts">
	import Meta from "$lib/layout/meta.svelte";
	import calculationImgSrcset from '$lib/gfx/calculation.webp?width=500;1000;1500&formats=avif;webp;png&srcset=true&img';
	import calculationImgFallback from '$lib/gfx/calculation.webp?width=1000&format=png&img';
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

<p><img
	srcset={calculationImgSrcset}
	src={calculationImgFallback}
	alt="Het verschil tussen 3 januari en 1 januari is 3 min 1 is 2 dagen."
/></p>
