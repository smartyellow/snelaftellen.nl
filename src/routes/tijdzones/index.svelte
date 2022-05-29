<script lang="ts">
	import type { TimezoneWithCoords } from "$lib/molecules/timezones/helpers";
	import Meta from "$lib/layout/meta.svelte";
	import TimezonePageIndex from "$lib/molecules/timezones/timezone-page-index.svelte";

	export let timezones: Record<string, TimezoneWithCoords>;

	const timezoneArray = Object.keys(timezones).map(tzId => {
		const tz = timezones[tzId];
		tz.id = tzId;
		return tz;
	});
</script>

<Meta
	title="Tijdzones op SnelAftellen.nl"
/>

<TimezonePageIndex timezones={timezoneArray} />
