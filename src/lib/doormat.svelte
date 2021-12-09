<footer>
	<nav>
		<ul>
			<li>&copy; {new Date().getFullYear()}</li>
			<li><a href="/contact">Contact</a></li>
			<li><a href="/doc/privacy.pdf">Privacy</a></li>
			<li><a href="/doc/cookies.pdf">Cookies</a></li>
			<li><a href="/doc/disclaimer.pdf">Disclaimer</a></li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		background-color: var(--accent-dark);
		padding: 1rem;
		text-align: center;
		color: #ffffff;
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
