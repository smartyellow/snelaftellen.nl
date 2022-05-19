<nav>
	<slot />
</nav>

<style lang="scss">
	@import '../styles/vars';
	nav {
		padding: $padding;
		:global {
			a,
			button {
				display: block;
				width: 100%;
				text-align: left;
				padding: $padding-sm $padding-lg;
			}
		}
	}
</style>
