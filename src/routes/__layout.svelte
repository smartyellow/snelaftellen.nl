<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ page, fetch, session, stuff }) {
		const year = parseInt(page.params.year) || new Date().getFullYear();
		const month = parseInt(page.params.month) || 1;
		const day = parseInt(page.params.day) || 1;

		return {
			props: {
				year, month, day
			}
		}
	}
</script>

<script>
	import Datepicker from "$lib/datepicker.svelte";
	import Header from "$lib/header.svelte";
	import Widget from "$lib/widget.svelte";
	import Meta from "$lib/meta.svelte"
	import "../app.css";

	export let year;
	export let month;
	export let day;
</script>

<Meta />
<Header />

<div class="wrapper">
	<main>
		<slot></slot>
	</main>
	<aside>
		<Widget>
			<h2>Aftellen!</h2>
			<p>Tel af naar je speciale datum!</p>
			<Datepicker {year} {month} {day} />
			<p>Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch gekozen.</p>
			<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
		</Widget>
	</aside>
</div>

<style>
	.wrapper {
		display: flex;
		padding: 1rem;
		justify-content: space-between;
	}
	main {
		flex: 3 0;
		padding: 1rem;
	}
	main :global(:first-child) {
		margin-top: 0;
	}
	aside {
		flex: 1 0;
		padding: 1rem;
	}
</style>
