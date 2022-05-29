
<script lang="ts">
	import CountdownPage from "$lib/molecules/countdown/countdown-page.svelte";
	import type { LunarPhase } from "$lib/molecules/moon/helpers";
	import type { PimpOptions } from "$lib/molecules/pimp/helpers";
	import type { Season } from "$lib/molecules/seasons/helpers";

	export let countTo: Date;
	export let pimpOptions: PimpOptions;
	export let season: Season;
	export let lunarPhase: LunarPhase;

	$: countTo = new Date(countTo);
</script>

<CountdownPage
	{pimpOptions}
	{countTo}
	{lunarPhase}
	displayTitle="het begin van de {season[0]}"
/>
