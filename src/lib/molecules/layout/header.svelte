<script lang="ts">
	import logoSrcset from '$lib/gfx/logo-text-white.webp?height=50;100&formats=avif;webp;png&srcset=true&img';
	import logoFallback from '$lib/gfx/logo-text-white.webp?height=50&format=png&img';
</script>

<header>
	<div>
		<a href="/">
			<img
				srcset={logoSrcset}
				src={logoFallback}
				alt="SnelAftellen.nl"
			/>
			<span class="sr">SnelAftellen.nl</span>
		</a>
	</div>

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
	div {
		padding: 1.4rem $padding;
		margin: 0;
		background-color: $accent-dark;
		color: $light;
		border: none;
		img {
			height: 1.4rem;
		}
		a {
			color: $light;
			text-decoration: none;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	nav {
		background-color: $accent-light;
		color: $light;
		padding-top: $padding;
		padding-bottom: $padding;
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			li {
				display: inline;
				a {
					color: $light;
					padding: $padding;
				}
				&:hover a {
					background-color: $accent-dark;
					text-decoration: none;
				}
			}
		}
	}
	nav ul
	nav ul li
	nav ul li:hover a {
		background-color: $accent-dark;
		text-decoration: none;
	}
</style>
