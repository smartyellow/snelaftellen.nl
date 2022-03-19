<script lang="ts">
	import MoonPageToday from "./moon-page-today.svelte";
	import MoonPageWeek from "./moon-page-week.svelte";

	export let d: Date;
</script>

<div class="moonpage">
	<MoonPageToday {d} />
	<MoonPageWeek {d} />
</div>

<style lang="scss">
	@import '../../styles/vars';
	.moonpage {
		> :global(*) {
			margin-bottom: $padding-lg;
		}
	}
</style>
