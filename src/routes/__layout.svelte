<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ page, fetch, session, stuff }) {
		const year = parseInt(page.params.year) || new Date().getFullYear();
		const month = parseInt(page.params.month) || 1;
		const day = parseInt(page.params.day) || 1;

		const bg = page.query.get('bg');
		const fg = page.query.get('fg');
		const yl = page.query.get('yl');

		return {
			props: {
				year, month, day,
				bg, fg, yl
			}
		}
	}
</script>

<script>
	import Datepicker from "$lib/datepicker.svelte";
	import Header from "$lib/header.svelte";
	import Widget from "$lib/widget.svelte";
	import "../app.css";

	export let year;
	export let month;
	export let day;

	export let bg;
	export let fg;
	export let yl;

	const style = `
		background-color: ${bg || '#ffffff'};
		color: ${fg || '#000000'};
		--yellow: ${yl || '#f8f5c3'};
	`;
</script>

<div class="page" {style}>
	<Header />

	<div class="wrapper">
		<main>
			<slot></slot>
		</main>
		<aside>
			<Widget>
				<h2>Aftellen!</h2>
				<p>Tel af naar je favoriete datum!</p>
				<Datepicker {year} {month} {day} />
				<p>Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch gekozen.</p>
				<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
			</Widget>
		</aside>
	</div>
</div>

<style>
	.page {
		min-height: 100vh;
	}
	.wrapper {
		display: flex;
		flex-direction: row;
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
	@media only screen and (max-width: 750px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
