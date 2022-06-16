<script lang="ts">
	export let cls = '';
</script>

<nav class="verticalnav {cls}">
	<slot />
</nav>

<style lang="scss">
	.verticalnav {
		padding: $padding;

		:global {
			a,
			button {
				display: block;
				width: 100%;
				text-align: left;
				padding: $padding-sm $padding-lg;
				margin-top: -2px;
				color: #000;
				text-decoration: none;

				&.active,
				&:hover {
					color: $light;
				}
			}
		}
	}
</style>
