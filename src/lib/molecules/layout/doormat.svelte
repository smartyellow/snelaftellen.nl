<footer>
	<nav>
		<ul>
			<li>&copy; {new Date().getFullYear()} SnelAftellen.nl</li>
			<li><a href="/over">Over deze website</a></li>
			<li><a href="/over">Contact</a></li>
		</ul>
	</nav>

	<a href="https://www.websitecarbon.com/website/snelaftellen-nl/">
		Deze website is groener dan 98% van alle andere.
	</a>
</footer>

<style lang="scss">
	@import '../../styles/vars';
	footer {
		background-color: $accent-dark;
		padding: $padding;
		text-align: center;
		color: #ffffff;
	}
	footer > * {
		margin-bottom: 10px;
	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
	}
	li {
		display: inline;
	}
	li:not(:last-child)::after {
		content: ' | ';
	}
	a {
		color: #ffffff;
	}
	a:hover {
		text-decoration: none;
	}
</style>
