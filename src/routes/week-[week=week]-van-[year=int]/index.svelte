<script lang="ts">
	import CountdownPage from "$lib/molecules/countdown/countdown-page.svelte";
	import type { LunarPhase } from "$lib/molecules/moon/helpers";
	import type { PimpOptions } from "$lib/molecules/pimp/helpers";

	export let countTo: Date;
	export let pimpOptions: PimpOptions;
	export let lunarPhase: LunarPhase;
	export let week: number;
	export let year: number;

	$: countTo = new Date(countTo);
</script>

<CountdownPage
	{pimpOptions}
	{countTo}
	{lunarPhase}
	displayTitle={`het begin van week ${week} in ${year}`}
/>
