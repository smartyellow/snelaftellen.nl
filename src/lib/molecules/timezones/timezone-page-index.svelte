<script lang="ts">
	import Alert from "$lib/ui/alert.svelte";
	import type { TimezoneWithCoords } from "./helpers";
	import TimezoneMap from "./timezone-map.svelte";
	import TimezoneSearch from "./timezone-search.svelte";

	export let timezones: TimezoneWithCoords[];

	let mapDragged = false;
</script>

<h1>Tijdzones</h1>

<TimezoneSearch {timezones} />

<div class="mt">
	<TimezoneMap {timezones} bind:dragged={mapDragged} />

	<Alert>
		Let op: de kaart is nog in bèta. Sommige locaties zijn niet juist of
		ontbreken.
	</Alert>
</div>
