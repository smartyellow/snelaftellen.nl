<script lang="ts">
	import Meta from '$lib/layout/meta.svelte';
	import WidgetDate from '$lib/ui/widget-date.svelte';
	import WidgetIcon from '$lib/ui/widget-icon.svelte';

	import iconCalendar from '$lib/gfx/svg/icon-calendar.svg?raw';
	import iconDesign from '$lib/gfx/svg/icon-design.svg?raw';
	import iconList from '$lib/gfx/svg/icon-list.svg?raw';
	import iconMoon from '$lib/gfx/svg/icon-moon.svg?raw';
	import iconSettings from '$lib/gfx/svg/icon-settings.svg?raw';
	import iconShare from '$lib/gfx/svg/icon-share.svg?raw';

	const rawStyles = `
		<style>
			@media (max-width: 1000px) {
				.wrapper aside {
					order: 1 !important;
				}
				.wrapper main {
					order: 2 !important;
				}
			}
		</style>
	`;
</script>

{@html rawStyles}
<Meta />

<h2>Het is bijna...</h2>

<div class="grid-50">
	<WidgetDate
		title="Zomervakantie Noord"
		date={new Date(2022, 6, 16)}
		image="/img/events/zomervakantie-1.webp"
		description="Lekker lang op vakantie!"
		calendarPimpOptions={{ img: 'vacation' }}
	/>
	<WidgetDate
		title="Zomervakantie Midden"
		date={new Date(2022, 6, 9)}
		image="/img/events/zomervakantie-2.webp"
		description="Of gewoon thuisblijven."
		calendarPimpOptions={{ img: 'vacation' }}
	/>
	<WidgetDate
		title="Zomervakantie Zuid"
		date={new Date(2022, 6, 23)}
		image="/img/events/zomervakantie-3.webp"
		description="Geniet van je vakantie"
		calendarPimpOptions={{ img: 'vacation' }}
	/>
</div>

<h2>Probeer ook eens...</h2>

<div class="grid-50">
	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconCalendar}</svelte:fragment>
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch>Tel af</a>
			naar welke datum dan ook
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconDesign}</svelte:fragment>
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch> Pimp je aftelkalender </a>
			met kleuren en plaatjes
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconList}</svelte:fragment>
		<span slot="label">
			<a href="/kalender" sveltekit:prefetch> Bekijk de jaarkalender </a>
			van elk jaar dat je wil
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconMoon}</svelte:fragment>
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch> Bekijk de maanstand </a>
			op welke dag dan ook
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconShare}</svelte:fragment>
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch> Deel je kalenders </a>
			met iedereen
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<svelte:fragment slot="icon">{@html iconSettings}</svelte:fragment>
		<span slot="label">
			Lees hoe het
			<a href="/over" sveltekit:prefetch> aan de binnenkant </a>
			werkt
		</span>
	</WidgetIcon>
</div>

<hr />

<p>
	Heb je vragen, opmerkingen en/of suggesties voor deze website?
	<a sveltekit:prefetch href="/contact">Neem contact op!</a>
</p>
