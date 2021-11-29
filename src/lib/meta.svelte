<script>
	import { page } from '$app/stores';

	export let title = 'SnelAftellen.nl: tel af tot je favoriete datum!';
	export let description = 'Hoe lang nog wachten tot Sinterklaas? Wanneer is Nieuwjaar? Over hoeveel nachten gaan we op vakantie? SnelAftellen.nl is je digitale aftelkalender.';
	export let image = '/img/social/preview.webp';
	export let path = $page.path;
</script>

<svelte:head>
	<!-- Search engines -->
	<title>{title}</title>
	<meta name="title" content="{title}">
	<meta name="description" content="{description}">

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website">
	<meta property="og:url" content="https://www.snelaftellen.nl{path}">
	<meta property="og:title" content="{title}">
	<meta property="og:description" content="{description}">
	<meta property="og:image" content="{image}">

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image">
	<meta property="twitter:url" content="https://www.snelaftellen.nl{path}">
	<meta property="twitter:title" content="{title}">
	<meta property="twitter:description" content="{description}">
	<meta property="twitter:image" content="{image}">
</svelte:head>
