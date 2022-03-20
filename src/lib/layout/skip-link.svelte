<a href="#content" class="skip-link">
	Overslaan naar de inhoud
</a>

<a href="/aftellen" class="skip-link" sveltekit:prefetch>
	Aftellen
</a>

<style lang="scss">
	@import '../styles/vars';
	.skip-link {
		background: $accent-light;
		color: $light;
		font-weight: 700;
		left: $padding * 3;
		padding: $padding;
		position: absolute;
		transform: translateY(-100%);
		font-size: 1.5rem;
		transition: transform .3s ease-in-out;
		&:focus {
			transform: translateY(0%);
		}
	}
</style>
