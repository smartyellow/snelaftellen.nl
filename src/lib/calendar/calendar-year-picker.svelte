<script lang="ts">
	import IconArrowFastLeft from "$lib/svg/icon-arrow-fast-left.svelte";
	import IconArrowFastRight from "$lib/svg/icon-arrow-fast-right.svelte";

	export let year = new Date().getFullYear();

	const yearInt = Number.parseInt(year.toString());
	const nextYear = yearInt + 1;
	const prevYear = yearInt - 1;
	const currentYear = new Date().getFullYear();
</script>

<div class="cal-year-picker">
	<a class="year-prev" href="/kalender-{prevYear}" rel="external">
		<IconArrowFastLeft />
		Kalender {prevYear}
	</a>
	<span class="year-selected">
		Huidig jaar: <span>{year}</span>
	</span>
	{#if currentYear !== year}
		<a class="year-current" href="/kalender">
			Ga naar <span>{currentYear}</span>
		</a>
	{/if}
	<a class="year-next" href="/kalender-{nextYear}" rel="external">
		Kalender {nextYear}
		<IconArrowFastRight />
	</a>
</div>

<style lang="scss">
	@import '../styles/vars';
	.cal-year-picker {
		display: flex;
		padding-bottom: $padding;
		a {
			text-decoration: none;
		}
		:global(svg) {
			vertical-align: middle;
		}
		.year-prev {
			margin-right: auto;
		}
		.year-next {
			margin-left: auto;
		}
		.year-selected {
			span {
				font-weight: 600;
			}
		}
		.year-current {
			margin-left: 5%;
			span {
				font-weight: 600;
			}
		}
	}
</style>
