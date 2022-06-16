<script lang="ts">
	import { onMount } from 'svelte';
	import 'leaflet/dist/leaflet.css';

	export let element: HTMLDivElement = undefined;
	export let map: L.Map = undefined;

	export let height = '180px';
	export let center: L.LatLngExpression;
	export let zoom = 13;
	export let options: L.MapOptions = {};
	export let dragged = false;

	onMount(async () => {
		const L = await import('leaflet');
		map = L.map(element, options).setView(center, zoom);
		map.on('dragend', () => dragged = true);

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);
	});
</script>

<div
	class="map"
	style:height
	bind:this={element}
></div>

<style lang="scss">
	.map {
		:global {
			.leaflet-popup-content-wrapper,
			.leaflet-popup-tip {
				background-color: $dark;
				color: #fff;

				a {
					color: #fff;

					&:hover {
						opacity: 0.8;
					}

					&:active {
						opacity: 0.5;
					}
				}
			}

			a.leaflet-popup-close-button {
				color: #fff;
				opacity: 0.6;

				&:hover {
					opacity: 0.4;
				}

				&:active {
					opacity: 0.2;
				}
			}

			.leaflet-top
			.leaflet-control {
				margin: $padding-sm;
			}
		}
	}
</style>
