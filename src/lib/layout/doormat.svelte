<script lang="ts">
	import { version } from '../../../package.json';
</script>

<footer>
	<nav>
		<ul>
			<li>&copy; {new Date().getFullYear()} SnelAftellen.nl</li>
			<li><a href="/over">Over deze website</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</nav>

	<a href="https://www.websitecarbon.com/website/snelaftellen-nl/">
		Deze website is groener dan 98% van alle andere.
	</a>

	<ins>v{version}</ins>
</footer>

<style lang="scss">
	@import '../styles/vars';

	footer {
		background-color: $accent-dark;
		padding: $padding;
		text-align: center;
		color: #ffffff;
		margin-top: $padding;

		> * {
			margin-bottom: 10px;
			display: block;
		}

		> :last-child {
			margin-bottom: 0;
		}

		ul {
			list-style-type: none;
			margin: 0;
			padding: 0;

			li {
				display: inline;

				&:not(:last-child)::after {
					content: ' | ';
				}
			}
		}

		a {
			color: #ffffff;

			&:hover {
				text-decoration: none;
			}
		}

		ins {
			text-decoration: none;
			font-size: 0.8rem;
			opacity: 0.6;
		}
	}
</style>
