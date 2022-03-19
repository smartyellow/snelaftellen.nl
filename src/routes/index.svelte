<script lang="ts">
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';
	import IconDesign from '$lib/gfx/svg/icon-design.svelte';
	import IconList from '$lib/gfx/svg/icon-list.svelte';
	import IconSettings from '$lib/gfx/svg/icon-settings.svelte';
	import Meta from '$lib/molecules/layout/meta.svelte';
	import WidgetDate from '$lib/ui/widget-date.svelte';
	import WidgetIcon from '$lib/ui/widget-icon.svelte';
	import carnavalImg from './_media/carnaval.jpg?w=1000&jpg&img';
	import pasenImg from './_media/pasen.jpg?w=1000&jpg&img';

	const rawStyles = `
		<style>
			@media (max-width: 800px) {
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

<div class="cols">
	<WidgetDate
		title="Pasen"
		date={new Date(2022, 3, 17)}
		image={pasenImg}
		description="Christenen vieren op Pasen dat Jezus uit de dood is opgestaan. Maar, zorg ook dat je eieren in de tuin verstopt!"
		info={`Afbeelding van <a href="https://unsplash.com/@ericheininger?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Eric Heininger</a> op <a href="https://unsplash.com/collections/9872699/easter?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.`}
	/>
</div>

<h2>Probeer ook eens...</h2>

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
