<script lang="ts">
	import IconSaveAction from "$lib/gfx/svg/icon-save-action.svelte";
	import IconSave from "$lib/gfx/svg/icon-save.svelte";
	import { onMount } from "svelte";
	import type { PimpedCalendar } from "./types";

	export let calendar: PimpedCalendar;

	let mounted = false;
	let saved = false;
	let items: Array<PimpedCalendar>;

	onMount(() => {
		checkIfSaved();
		mounted = true;
	});

	function getItems() {
		items = JSON.parse(window.localStorage.getItem('calendars')) || [];
	}

	function saveItems() {
		window.localStorage.setItem('calendars', JSON.stringify(items));
		saved = true;
	}

	function checkIfSaved() {
		getItems();
		if (items.includes(calendar)) saved = true;
		else saved = false;
	}

	function toggleSave() {
		checkIfSaved();
		if (!saved) {
			getItems();
			items.push(calendar);
			saveItems();
		}
		// else ...
	}
</script>

{#if mounted}
	<button class="btn" on:click={toggleSave}>
		{#if !saved}
			<IconSave />
			<span>Sla deze kalender op</span>
		{:else}
			<IconSaveAction />
			<span>Kalender opgeslagen!</span>
		{/if}
	</button>
{/if}
