<script lang="ts">
	import { goto } from '$app/navigation';
	import Page from './index.svelte';
	import type { YearCalendar } from '$lib/molecules/calendar/helpers';

	export let year: number;
	export let calendar: YearCalendar;

	if (year === new Date().getFullYear()) goto('/kalender');
</script>

<Page {year} {calendar} />
