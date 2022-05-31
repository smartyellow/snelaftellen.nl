<script lang="ts">
	import type { TimezoneWithCoords } from "$lib/molecules/timezones/helpers";
	import TimezonePage from "$lib/molecules/timezones/timezone-page.svelte";

	export let timezone: TimezoneWithCoords;
	export let sameOffset: TimezoneWithCoords[];
</script>

<TimezonePage {timezone} {sameOffset} />
