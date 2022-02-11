<script lang="ts">
	export let year = new Date().getFullYear();
</script>

<div class="cal-year-picker">
	<a class="year-prev" href="/kalender-{year - 1}">Kalender {year - 1}</a>
	<a class="year-next" href="/kalender-{year + 1}">Kalender {year + 1}</a>
</div>

<style lang="scss">
	@import '../styles/vars';
	.cal-year-picker {
		display: flex;
		padding-bottom: $padding;
		.year-prev {
			margin-right: auto;
		}
		.year-next {
			margin-left: auto;
		}
	}
</style>
