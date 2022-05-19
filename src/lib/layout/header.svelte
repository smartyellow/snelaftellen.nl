<script lang="ts">
	import logoSrcset from '$lib/gfx/logo-text-white.webp?height=50;100&formats=avif;webp;png&srcset=true&img';
	import logoFallback from '$lib/gfx/logo-text-white.webp?height=50&format=png&img';
</script>

<header class="header">
	<div class="brand">
		<a href="/">
			<img srcset={logoSrcset} src={logoFallback} alt="SnelAftellen.nl" />
			<span class="sr">SnelAftellen.nl</span>
		</a>
	</div>

	<nav class="topnav">
		<ul>
			<li><a sveltekit:prefetch href="/aftellen">Aftellen</a></li>
			<li><a sveltekit:prefetch href="/kalender">Jaarkalender</a></li>
			<li><a sveltekit:prefetch href="/vandaag">Vandaag</a></li>
			<li><a sveltekit:prefetch href="/over">Over</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@import '../styles/vars';

	.brand {
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

	.topnav {
		background-color: $accent-light;
		color: $light;
		line-height: 1;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;

			li {
				display: inline-block;
				color: $light;

				a {
					padding: $padding;
					color: inherit;
					display: block;
					font-size: 1.2rem;
				}

				&:hover {
					a {
						background-color: #fff;
						text-decoration: none;
						color: $accent-light;
					}
				}
			}
		}
	}
</style>
