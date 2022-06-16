<script lang="ts">
	import CountdownIconSeason from '../seasons/countdown-icon-season.svelte';

	export let d: Date;
</script>

<div class="countdown-icons">
	<CountdownIconSeason {d} />
</div>

<style lang="scss">
	.countdown-icons {
		height: 50px;
		flex-grow: 0;
		flex-shrink: 1;

		@media (max-width: 500px) {
			display: none;
		}
	}
</style>
