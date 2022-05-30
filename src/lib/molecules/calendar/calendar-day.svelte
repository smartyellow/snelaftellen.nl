<script lang="ts">
	export let label: string | number;
	export let href: string = undefined;
	export let today = false;
</script>

<a class="cal-day" class:today {href}>{label}</a>

<style lang="scss">
	@import '../../styles/vars';

	.cal-day {
		padding: 2px;
		border: 2px solid transparent;
		border-radius: $radius;
		display: block;

		&:hover {
			border: 2px solid $grey;
			margin: 0;
		}

		&.today {
			background-color: $accent-light;
			color: $light;
			text-decoration: none;
			font-weight: 700;
			border-color: $accent-dark;

			&:hover {
				border-color: transparent;
			}
		}
	}
</style>
