<script lang="ts">
	import notFoundImg from '$lib/gfx/404@0.5x.webp';
</script>

<h2>Oeps... daar ging iets mis!</h2>

<div>
	<img src={notFoundImg} alt="" />
</div>

<hr />

<p>We konden die pagina niet vinden. Wilde je aftellen? Dat kan met de datumprikker hiernaast!</p>

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
