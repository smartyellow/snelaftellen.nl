<script lang="ts">
	import CountdownPage from '$lib/molecules/countdown/countdown-page.svelte';
	import type { Countdown } from '$lib/molecules/countdown/helpers';
	import type { LunarPhase } from '$lib/molecules/moon/helpers';
	import type { YearCalendar } from '$lib/molecules/calendar/helpers';
	import type { User } from '$lib/molecules/account/helpers';
	import { pimpStore } from '$lib/molecules/countdown/pimp/helpers';
	import { onMount } from 'svelte';

	export let countdown: Countdown;
	export let lunarPhase: LunarPhase;
	export let calendar: YearCalendar;
	export let user: User;
	export let csrf: string;

	const noindex =
		countdown.visibility === 'invisible'
		|| countdown.visibility === 'private';
	$: countdown.countTo = new Date(countdown.countTo);
	onMount(() => pimpStore.set(countdown.pimpOptions));
</script>

<svelte:head>
	{#if noindex}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<CountdownPage {countdown} {lunarPhase} {calendar} {user} {csrf} />
