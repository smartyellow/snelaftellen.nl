<script lang="ts">
	import { onMount } from "svelte";
	import { translateContinentName, type TimezoneWithCoords } from "./helpers";
	import { utcOffset } from "$lib/helpers";
	import { icon } from "$lib/ui/map";
	import Map from "$lib/ui/map.svelte";
	import Alert from "$lib/ui/alert.svelte";

	export let timezone: TimezoneWithCoords;
	export let sameOffset: TimezoneWithCoords[];

	const coords: [ number, number ] = [
		timezone.lat,
		timezone.lng,
	];
	let map: L.Map;
	let mapAvailable = coords[0] && coords[1];
	let date: string;
	let time: string;
	let nlTime: string;
	let nlOffset: number;
	let offsetNlTime: number;

	function refresh() {
		time = new Date().toLocaleTimeString('nl-NL', {
			timeZone: timezone.id,
			timeStyle: 'short',
		});

		nlTime = new Date().toLocaleTimeString('nl-NL', {
			timeZone: 'Europe/Amsterdam',
			timeStyle: 'short',
		});

		date = new Date().toLocaleDateString('nl-NL', {
			timeZone: timezone.id,
			dateStyle: 'medium',
		});
	}

	refresh();
	nlOffset = utcOffset(nlTime);
	offsetNlTime = timezone.utcOffset + nlOffset;

	onMount(async () => {
		if (mapAvailable) {
			const L = await import('leaflet');

			L.marker(coords, {
				icon: icon(L, 50),
			}).addTo(map);

			map.on('dragend', () => map.setView(
				coords,
				map.getZoom(),
				{ animate: true },
			));
		}

		const timeout = setTimeout(refresh, 1000);
		return () => clearTimeout(timeout);
	});
</script>

<h1>
	Tijdzone
	{timezone.place},
	{translateContinentName(timezone.continent)}
</h1>

<div class="grid-50">
	<div class="card time">
		<h2>Huidige tijd</h2>
		<div>
			<div>
				<div class="date">
					<a href="/vandaag">{date}</a>
				</div>
				<div class="time">{time}</div>
			</div>
		</div>
	</div>

	{#if mapAvailable}
		<div class="card p-0">
			<Map center={coords} height="250px" zoom={6} bind:map />
			<Alert>
				Let op: de kaart is nog in bèta. Sommige locaties kloppen niet.
			</Alert>
		</div>
	{/if}
</div>

<h2>UTC-verschil</h2>
<p>
	UTC
	(<a href="https://nl.wikipedia.org/wiki/UTC" target="_blank">Wikipedia</a>,
	Frans: <em>temps universel coordonné</em>, Engels: <em>coordinated
	universal time</em>) is een standaardtijd die vaak gebruikt wordt. Het
	verschil met UTC is in {timezone.place} <strong>
	{timezone.utcOffset > 0 ? '+' : '–'}{Math.abs(timezone.utcOffset)}
	</strong>.
	Het is hier dus {Math.abs(timezone.utcOffset)}
	{timezone.utcOffset > 0 ? 'later' : 'vroeger'}
	dan de UTC-tijd. In Nederland geldt er momenteel
	UTC{nlOffset > 0 ? '+' : '–'}{Math.abs(nlOffset)},
	dus in {timezone.place} is het {Math.abs(offsetNlTime)} uur
	{offsetNlTime === 0 ? 'net zo laat als' :
	offsetNlTime > 0 ? 'later dan' : 'vroeger dan'} in Nederland.
</p>

{#if sameOffset.length}
	<p>
		Deze
		{sameOffset.length === 1
			? 'locatie hanteert als enige'
			: `${sameOffset.length} locaties hanteren`
		}
		dezelfde tijd:
	</p>

	<div class="overflow mt">
		<table class="table">
			<thead>
				<tr>
					<th>Plaats</th>
					<th>Continent</th>
				</tr>
			</thead>

			<tbody>
				{#each sameOffset as tz}
					<tr>
						<th>
							<a href="/tijdzones/{tz.place.toLowerCase()}">
								{tz.place}
							</a>
						</th>
						<td>{tz.continent}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style lang="scss">
	@import '../../styles/vars';

	.card.time {
		display: flex;
		flex-direction: column;

		> div {
			text-align: center;
			font-family: 'Sora', $font-base;
			flex: 1 0;
			display: flex;
			align-items: center;
			justify-content: center;

			.time {
				font-size: 40px;
				font-weight: 700;
				font-family: Menlo, 'Courier New', Courier, monospace;
				background-image: url('/img/timezones/alarmclock.svg');
				background-size: contain;
				background-repeat: no-repeat;
				color: #fff;
				padding: 30px;
				margin-top: $padding-lg;
				line-height: 0.6;
			}

			.date {
				font-size: 1.5rem;
			}
		}
	}
</style>
