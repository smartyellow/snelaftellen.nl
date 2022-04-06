<nav>
	<slot />
</nav>

<style lang="scss">
	@import '../styles/vars';
	nav {
		padding: $padding-sm;
		:global {
			a,
			button {
				display: block;
				width: 100%;
				text-align: left;
				padding: $padding-sm;
				color: $accent-light;
				text-decoration: none;
				background: none;
				box-shadow: none;
				&.active {
					background-color: $accent-light;
					color: $light;
				}
				svg {
					margin-right: $padding;
				}
			}
		}
	}
</style>
