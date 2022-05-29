<script lang="ts">
	import Map from "$lib/ui/map.svelte";
	import { icon } from "$lib/ui/map";
	import { onMount } from "svelte";
	import { translateContinentName, type TimezoneWithCoords } from "./helpers";

	export let timezones: TimezoneWithCoords[];
	export let height: string = '300px';
	export let center: [ number, number ] = [ 50, 0 ];
	export let zoom = 1;
	export let map: L.Map = undefined;
	export let dragged = false;

	onMount(async () => {
		const L = await import('leaflet');

		for (const tz of timezones) {
			if (tz.lat && tz.lng) {
				L.marker([
					tz.lat,
					tz.lng,
				], {
					icon: icon(L),
				}).addTo(map).bindPopup(`
					<a href="/tijdzones/${tz.place.toLowerCase()}">
						${tz.place}, ${translateContinentName(tz.continent)}
					</a>
				`);
			}
		}
	});
</script>

<Map
	{height}
	{center}
	{zoom}
	bind:map
	bind:dragged
/>
