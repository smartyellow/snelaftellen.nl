<script lang="ts">
	import notFoundImgSrcset from '$lib/gfx/404.webp?width=300;500&formats=avif;webp;png&srcset=true&img';
	import notFoundImgFallback from '$lib/gfx/404.webp?width=500&format=png&img';
</script>

<h1>Oeps... daar ging iets mis!</h1>

<div>
	<img srcset={notFoundImgSrcset} src={notFoundImgFallback} alt="" />
</div>

<hr />

<p>
	We konden die pagina niet vinden. Wilde je toevallig aftellen? Dat kan met de
	<em>"Aftellen!"</em>-knop hiernaast!
</p>

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
