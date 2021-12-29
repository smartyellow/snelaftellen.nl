<footer>
	<nav>
		<ul>
			<li>&copy; {new Date().getFullYear()} SnelAftellen.nl</li>
			<li><a href="/contact">Contact</a></li>
			<li><a href="/doc/privacy.pdf">Privacy</a></li>
			<li><a href="/doc/cookies.pdf">Cookies</a></li>
			<li><a href="/doc/disclaimer.pdf">Disclaimer</a></li>
		</ul>
	</nav>

	<noscript>
		<a href="https://www.websitecarbon.com/website/snelaftellen-nl/">
			Deze website is groener dan 98% van de websites.
		</a>
	</noscript>
	<div id="wcb" class="carbonbadge"></div>
	<script src="https://unpkg.com/website-carbon-badges@1.1.3/b.min.js" defer></script>
</footer>

<style>
	footer {
		background-color: var(--accent-dark);
		padding: 1rem;
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
