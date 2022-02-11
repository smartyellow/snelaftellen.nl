<script lang="ts">
	export let label: string | number;
	export let href: string = undefined;
</script>

<a class="cal-day" {href}>{label}</a>

<style lang="scss">
	@import '../styles/vars';
	.cal-day {
		margin: 2px;
		padding: 2px;
		border-radius: $radius;
		&:hover {
			border: 2px solid $grey;
			margin: 0;
		}
	}
</style>
