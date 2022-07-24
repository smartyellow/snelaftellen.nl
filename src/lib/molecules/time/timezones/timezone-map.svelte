<script lang="ts">
	import Map from '$lib/ui/map.svelte';
	import { icon } from '$lib/ui/map';
	import { onMount } from 'svelte';
	import { dateByOffset, timezoneOffset, translateContinentName, type Timezone } from './helpers';

	export let timezones: Timezone[];
	export let height: string = '300px';
	export let center: [ number, number ] = [ 50, 0 ];
	export let zoom = 1;
	export let map: L.Map = undefined;
	export let dragged = false;

	onMount(async () => {
		const L = await import('leaflet');

		for (const tz of timezones) {
			if (tz.lat && tz.lng) {
				const offset = timezoneOffset(tz);
				const time = dateByOffset(offset).toLocaleString('nl-NL', {
					dateStyle: 'full',
					timeStyle: 'short',
				});
				L.marker([
					tz.lat,
					tz.lng,
				], {
					icon: icon(L),
				}).addTo(map).bindPopup(`
					<a href="/tijdzones/${tz._id.toLowerCase()}"><strong>
						${tz.place}, ${translateContinentName(tz.continent)}
					</strong></a> <br /><br />
					Huidige tijd: ${time} <br />
					UTC-verschil: ${offset < 0 ? '–' : '+'}${Math.abs(offset / 60)}
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
