<script lang="ts">
	import TodayPage from '$lib/molecules/today/today-page.svelte';
	import type { LunarPhase } from '$lib/molecules/moon/helpers';

	export let lunarPhase: LunarPhase;
</script>

<TodayPage {lunarPhase} />
