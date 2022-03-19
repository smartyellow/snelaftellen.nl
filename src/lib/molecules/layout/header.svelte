<script lang="ts">
	import logoSrcset from '$lib/gfx/logo-text-white.webp?height=200;500;1000&formats=avif;webp;png&srcset=true&img';
	import logoFallback from '$lib/gfx/logo-text-white.webp?height=500&format=png&img';
</script>

<header>
	<h1>
		<a href="/">
			<img
				srcset={logoSrcset}
				src={logoFallback}
				alt="SnelAftellen.nl"
			/>
			<span class="sr">SnelAftellen.nl</span>
		</a>
	</h1>

	<nav>
		<ul>
			<li><a sveltekit:prefetch href="/aftellen">Aftellen</a></li>
			<li><a sveltekit:prefetch href="/kalender">Jaarkalender</a></li>
			<li><a sveltekit:prefetch href="/over">Over</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@import '../../styles/vars';
	header {
		box-shadow: $shadow-lg;
	}
	h1 {
		padding: $padding;
		margin: 0;
		background-color: $accent-dark;
		color: $light;
		border: none;
		img {
			height: 1.4rem;
		}
	}
	h1 a {
		color: $light;
		text-decoration: none;
	}
	h1 a:hover {
		text-decoration: underline;
	}
	nav {
		background-color: $accent-light;
		color: $light;
		padding-top: $padding;
		padding-bottom: $padding;
	}
	nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	nav ul li {
		display: inline;
	}
	nav ul li a {
		color: $light;
		padding: $padding;
	}
	nav ul li:hover a {
		background-color: $accent-dark;
		text-decoration: none;
	}
</style>
