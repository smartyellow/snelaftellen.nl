<script lang="ts">
	import { onMount } from "svelte";
	import { localeOptions } from "$lib/constants";
	import {
		dateByOffset,
		formatUTCOffset,
		timezoneAbbreviation,
		timezoneOffset,
		translateContinentName,
		type Country,
		type Timezone
	} from "./helpers";
	import { nlTimezone } from "./data";
	import { icon } from "$lib/ui/map";
	import Map from "$lib/ui/map.svelte";
	import Alert from "$lib/ui/alert.svelte";

	export let timezone: Timezone;
	export let countries: Country[];
	export let sameOffset: Timezone[];

	const coords: [ number, number ] = [
		timezone.lat,
		timezone.lng,
	];
	let map: L.Map;
	const mapAvailable = coords[0] && coords[1];
	const offset = timezoneOffset(timezone) / 60;
	const date = dateByOffset(offset * 60);
	const nlOffset = timezoneOffset(nlTimezone) / 60;
	const offsetNlTime = offset + nlOffset;
	const abbreviation = timezoneAbbreviation(timezone);

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
	});
</script>

<h1>Tijdzone {translateContinentName(timezone._id)}</h1>

<div class="grid-50">
	<div class="card time">
		<h2>Huidige tijd</h2>
		<div>
			<div>
				<div class="date">
					<a href="/vandaag">
						{date.toLocaleDateString('nl-NL', localeOptions)}
					</a>
				</div>
				<div class="time">{date.toLocaleTimeString('nl-NL', {
					timeStyle: 'short',
				})}</div>
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

<h2>Over {timezone.place}</h2>
<dl class="cols-2">
	<dt>ID</dt>
	<dd>{timezone._id}</dd>
	<dt>Plaats</dt>
	<dd>{timezone.place}</dd>
	<dt>Landen</dt>
	<dd>{timezone.countries.map(c => countries.filter(d => d._id === c)[0].name).join(', ')}</dd>
	<dt>Continent</dt>
	<dd>{translateContinentName(timezone.continent)}</dd>
	<dt>Huidige tijdzone</dt>
	<dd>{formatUTCOffset(offset)}, {abbreviation}</dd>
</dl>
<!--<table class="table">
	<tbody>
		<tr>
			<th>ID</th>
			<td>{timezone._id}</td>
		</tr>
		<tr>
			<th>Plaats</th>
			<td>{timezone.place}</td>
		</tr>
		<tr>
			<th>Continent</th>
			<td>{translateContinentName(timezone.continent)}</td>
		</tr>
		<tr>
			<th>UTC-verschil</th>
			<td>{offset}</td>
		</tr>
	</tbody>
</table>-->

<h2>UTC-verschil</h2>
<p>
	UTC
	(<a href="https://nl.wikipedia.org/wiki/UTC" target="_blank">Wikipedia</a>,
	Frans: <em>temps universel coordonné</em>, Engels: <em>coordinated
	universal time</em>) is een standaardtijd die vaak gebruikt wordt. Het
	verschil met UTC is in {timezone.place} <strong>
	{formatUTCOffset(offset, false)}</strong>.
	Het is hier dus {offset !== 0 ? Math.abs(offset) + ' uur' : ''}
	{offset === 0 ? 'even laat als' : offset < 0 ? 'vroeger dan' : 'later dan'}
	de UTC-tijd. In Nederland geldt er momenteel
	{formatUTCOffset(nlOffset)},
	dus in {timezone.place} is het
	{offsetNlTime !== 0 ? `${Math.abs(offsetNlTime)} uur` : ''}
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
					<th></th>
					<th>Plaats</th>
					<th>Continent</th>
				</tr>
			</thead>

			<tbody>
				{#each sameOffset as tz}
					<tr>
						<td>
							{#if tz.countries.length}
								<a href="/tijdzones/{tz._id.toLowerCase()}">
									<img
										src="https://flagicons.lipis.dev/flags/1x1/{tz.countries[0].toLowerCase()}.svg"
										alt=""
										class="flag"
									/>
								</a>
							{/if}
						</td>
						<td>
							<strong>
								<a href="/tijdzones/{tz._id.toLowerCase()}">
									{tz.place}
								</a>
							</strong>
						</td>
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
				background-position: center;
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
