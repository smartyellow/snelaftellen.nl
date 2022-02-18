<script lang="ts">
	import { onMount } from "svelte";
	import type { PimpedCalendar } from "./types";

	export let title = 'Opgeslagen kalenders';

	let mounted = false;
	let items: Array<PimpedCalendar>;

	onMount(() => {
		items = JSON.parse(window.localStorage.getItem('calendars'));
		mounted = true;
	});
</script>

{#if mounted && items}
	{#if title}
		<h2>{title}</h2>
	{/if}

	items
{/if}
