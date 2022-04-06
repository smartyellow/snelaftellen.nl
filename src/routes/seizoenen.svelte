<script>
	import { titleDivider } from '$lib/constants';
	import Meta from '$lib/layout/meta.svelte';
	import SeasonPage from '$lib/molecules/seasons/season-page.svelte';

	const y = new Date().getFullYear();
</script>

<Meta
	title="Meteorologische seizoenen bekijken {titleDivider} SnelAftellen.nl"
	description="Dit is de indeling van meteorologische seizoenen in het jaar {y}. Tel af naar je favoriete seizoen!"
/>

<h1>Seizoenen</h1>

<SeasonPage />
