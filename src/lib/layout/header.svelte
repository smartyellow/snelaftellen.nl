<header>
	<h1><a href="/">SnelAftellen.nl</a></h1>
	<nav>
		<ul>
			<li><a sveltekit:prefetch href="/aftellen">Aftellen</a></li>
			<li><a sveltekit:prefetch href="/kalender">Jaarkalender</a></li>
			<li><a sveltekit:prefetch href="/contact">Contact</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@import '../styles/vars';
	header {
		box-shadow: $shadow-lg;
	}
	h1 {
		padding: $padding;
		margin: 0;
		background-color: $accent-dark;
		color: $light;
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
