<script lang="ts">
	import { months } from "$lib/constants";
	import CalendarMonth from "./calendar-month.svelte";

	export let year = new Date().getFullYear();
</script>

<div class="cal">
	{#each months as _, i}
		<CalendarMonth {year} month={i} />
	{/each}
</div>

<style lang="scss">
	@import '../styles/vars';
	.cal {
		display: flex;
		flex-wrap: wrap;
		gap: $padding;
	}
</style>
