<script lang="ts">
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';
	import IconDesign from '$lib/gfx/svg/icon-design.svelte';
	import IconList from '$lib/gfx/svg/icon-list.svelte';
	import IconSettings from '$lib/gfx/svg/icon-settings.svelte';
	import Meta from '$lib/layout/meta.svelte';
	import WidgetIcon from '$lib/ui/widget-icon.svelte';

	const rawStyles = `
		<style>
			@media only screen and (max-width: 800px) {
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

<h1>Welkom op SnelAftellen.nl!</h1>

<div class="cols">
	<WidgetIcon>
		<IconCalendar slot="icon" />
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch>Tel af</a>
			naar welke datum dan ook
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<IconDesign slot="icon" />
		<span slot="label">
			<a href="/aftellen" sveltekit:prefetch>
				Pimp je aftelkalender
			</a>
			met kleuren en plaatjes
		</span>
	</WidgetIcon>
</div>

<div class="cols">
	<WidgetIcon>
		<IconList slot="icon" />
		<span slot="label">
			<a href="/kalender" sveltekit:prefetch>
				Bekijk de jaarkalender
			</a>
			van elk jaar dat je wil
		</span>
	</WidgetIcon>

	<WidgetIcon>
		<IconSettings slot="icon" />
		<span slot="label">
			Lees hoe het
			<a href="/over" sveltekit:prefetch>
				aan de binnenkant
			</a>
			werkt
		</span>
	</WidgetIcon>
</div>

<hr />

Heb je vragen, opmerkingen en/of suggesties voor deze website?
<a sveltekit:prefetch href="/contact">Neem contact op!</a>
