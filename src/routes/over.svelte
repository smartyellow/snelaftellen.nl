<script lang="ts">
	import Meta from '$lib/layout/meta.svelte';
	import Accordion from '$lib/ui/accordion.svelte';
	import { titleDivider } from '$lib/constants';

	//import calculationImgSrcset from '$lib/gfx/about/calculation.webp?width=500;1000;1500&formats=avif;webp;png&srcset=true&img';
	//import calculationImgFallback from '$lib/gfx/about/calculation.webp?width=1000&format=png&img';

	//import lurkingImgSrcset from '$lib/gfx/about/lurking.png?width=500;1000;1500&formats=avif;webp;png&srcset=true&img';
	//import lurkingImgFallback from '$lib/gfx/about/lurking.png?width=1000&format=png&img';

	//import greenImgSrcset from '$lib/gfx/about/green.png?width=500;1000;1500&formats=avif;webp;png&srcset=true&img';
	//import greenImgFallback from '$lib/gfx/about/green.png?width=1000&format=png&img';

	//import calendarImgSrcset from '$lib/gfx/about/calendar.png?width=500;1000;1500&formats=avif;webp;png&srcset=true&img';
	//import calendarImgFallback from '$lib/gfx/about/calendar.png?width=1000&format=png&img';

	import iconCalendar from '$lib/gfx/svg/icon-calendar.svg?raw';
	import iconSettings from '$lib/gfx/svg/icon-settings.svg?raw';
	import iconMessage from '$lib/gfx/svg/icon-message.svg?raw';
	import iconUserScan from '$lib/gfx/svg/icon-user-scan.svg?raw';
	import iconIndustry from '$lib/gfx/svg/icon-industry.svg?raw';
</script>

<Meta
	title="Veel gestelde vragen {titleDivider} SnelAftellen.nl"
	description="Op SnelAftellen.nl tel je snel af naar een bepaalde datum. Maar hoe wordt het verschil dussen twee data berekend? Lees het hier."
/>

<h1>Veel gestelde vragen over SnelAftellen.nl</h1>

<h2>Help!</h2>

<Accordion title="Is er een jaarkalender?" icon={iconCalendar}>
	<p>Jazeker, <a href="/kalender">hier</a>.</p>

	<p>
		<a href="/kalender"
			><img
				src="/img/about/calendar.png"
				alt="Handige jaarkalender voor elk jaar."
				title="Handige jaarkalender voor elk jaar."
			/></a
		>
	</p>
</Accordion>

<Accordion title="Hoe werkt het aan de binnenkant?" icon={iconSettings}>
	<p>
		Op SnelAftellen.nl tel je snel af naar een bepaalde datum, zoals je waarschijnlijk wel wist (en
		de naam doet vermoeden). Maar hoe wordt het verschil tussen twee data berekend? Lees het hier.
	</p>

	<p>
		Als je erg technisch bent, kan je de
		<a href="https://github.com/garraflavatra/snelaftellen.nl" target="_blank"
			>code bekijken op GitHub</a
		>. Je kunt ook hieronder bekijken hoe de berekening gebeurt. In het voorbeeld gaan we aftellen
		naar <a href="/3-januari-2022">3 januari 2022</a> vanaf 1 januari 2022.
	</p>

	<p>
		<img
			src="/img/about/calculation.webp"
			alt="Het verschil tussen 3 januari en 1 januari is 3 min 1 is 2 dagen."
			title="Het verschil tussen 3 januari en 1 januari is 3 min 1 is 2 dagen."
		/>
	</p>
</Accordion>

<h2>Over ons</h2>

<Accordion title="Ik heb een vraag of opmerking. Waar kan ik die kwijt?" icon={iconMessage}>
	<p>
		Vragen en opmerkingen kun je sturen naar
		<a href="mailto:mail@snelaftellen.nl">mail@snelaftellen.nl</a>. Dankjewel!
	</p>
</Accordion>

<Accordion title="Wat is jullie privacybeleid?" icon={iconUserScan}>
	<p>
		Heel simpel: we achtervolgen je niet met cookies,
		<a href="https://donttrack.us/" target="_blank">zoals 75% van de websites wel doet</a>. Dat is
		helemaal nergens voor nodig. Dus ook niet
		<a
			href="https://www.consumentenbond.nl/internet-privacy/meerderheid-websites-overtreedt-privacywet"
			target="_blank">illegaal</a
		>.
	</p>

	<p>
		<a href="https://donttrack.us/" target="_blank"
			><img
				src="/img/about/lurking.png"
				alt="Google kijkt met je mee op 75% van de websites."
				title="Google kijkt met je mee op 75% van de websites."
			/></a
		>
	</p>
</Accordion>

<Accordion title="Vinden jullie het klimaat belangrijk?" icon={iconIndustry}>
	<p>
		Op die vraag is maar één goed antwoord. Natuurlijk! Wij zijn
		<a href="https://www.websitecarbon.com/website/snelaftellen-nl/" target="_blank"
			>schoner dan 98% van alle websites</a
		>
		volgens de Website Carbon Calculator. Deze website stoot dus vele malen minder CO<sub>2</sub>
		uit dan een normale website. Sterker nog, onze hosting provider Cloudflare is
		<a
			href="https://blog.cloudflare.com/cloudflare-committed-to-building-a-greener-internet/"
			target="_blank">100% klimaatneutraal</a
		>!
	</p>

	<p>
		<a href="https://www.websitecarbon.com/website/snelaftellen-nl/" target="_blank"
			><img
				src="/img/about/green.png"
				alt="Wij zijn 100% klimaatneutraal."
				title="Wij zijn 100% klimaatneutraal."
			/></a
		>
	</p>
</Accordion>

<style lang="scss">
	img {
		max-width: 100%;
		width: 700px;
	}
</style>
