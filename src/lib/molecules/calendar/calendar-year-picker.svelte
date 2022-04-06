<script lang="ts">
	import IconArrowFastLeft from '$lib/gfx/svg/icon-arrow-fast-left.svelte';
	import IconArrowFastRight from '$lib/gfx/svg/icon-arrow-fast-right.svelte';

	export let year = new Date().getFullYear();

	const yearInt = Number.parseInt(year.toString());
	const nextYear = yearInt + 1;
	const prevYear = yearInt - 1;
	const currentYear = new Date().getFullYear();
</script>

<div class="cal-year-picker">
	<a class="year-prev" href="/kalender-{prevYear}" rel="external">
		<IconArrowFastLeft />
		Kalender <span>{prevYear}</span>
	</a>
	<span class="year-selected">
		Huidig jaar: <span>{year}</span>
	</span>
	{#if currentYear != year}
		<a class="year-current" href="/kalender">
			Ga naar <span>{currentYear}</span>
		</a>
	{/if}
	<a class="year-next" href="/kalender-{nextYear}" rel="external">
		Kalender <span>{nextYear}</span>
		<IconArrowFastRight />
	</a>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.cal-year-picker {
		display: flex;
		padding-bottom: $padding;
		gap: $padding-sm;
		justify-content: space-between;
		a {
			text-decoration: none;
		}
		:global(svg) {
			vertical-align: middle;
		}
		.year-prev {
			order: 1;
		}
		.year-next {
			order: 4;
		}
		.year-selected {
			order: 2;
		}
		.year-current {
			order: 3;
		}
		> * > span {
			font-weight: 600;
		}
		@media (max-width: 600px) {
			flex-wrap: wrap;
			> * {
				flex: 1 0 40%;
			}
			.year-prev {
				order: 1;
			}
			.year-next {
				order: 2;
			}
			.year-selected {
				order: 3;
			}
			.year-current {
				order: 4;
			}
		}
	}
</style>
