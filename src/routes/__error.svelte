<script lang="ts">
	import LayoutBase from './__layout-base.svelte';
</script>

<LayoutBase>
	<main>
		<h1>Oeps... daar ging iets mis!</h1>

		<div>
			<img src="/img/global/404.webp" alt="" />
		</div>

		<hr />

		<p>
			We konden die pagina niet vinden. Wilde je toevallig aftellen? Dat kan met de
			<em>"Aftellen!"</em>-knop hiernaast!
		</p>
	</main>
</LayoutBase>

<style lang="scss">
	@import '../lib/styles/vars';

	div {
		text-align: center;
		background-color: $yellow;
		padding: $padding;
		border: 2px dashed $accent-light;
	}

	div img {
		width: 300px;
	}
</style>
