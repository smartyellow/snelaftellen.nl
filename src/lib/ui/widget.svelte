<script lang="ts">
	export let highlighted = false;
	export let padding = true;
</script>

<div class="widget" class:highlighted class:padding>
	<slot />
</div>

<style lang="scss">
	@import '../styles/vars';
	div {
		border: 1px solid #000;
		border-bottom-width: 2px;

		&.highlighted {
			background-color: $yellow;
		}

		&.padding {
			padding: $padding;
		}

		:global {
			h2 {
				font-weight: 400;
				padding-bottom: $padding-sm;
				margin-bottom: $padding;
				border-bottom: $border solid $grey;
			}

			:first-child {
				margin-top: 0;
			}

			:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
