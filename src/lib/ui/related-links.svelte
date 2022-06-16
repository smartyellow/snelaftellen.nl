<p>
	<strong>Wellicht ook interessant:</strong>
	<slot />
</p>

<style lang="scss">
	p {
		:global {
			a {
				text-decoration: none;
			}

			a + a,
			strong + a {
				margin-left: $padding;
			}
		}
	}
</style>
