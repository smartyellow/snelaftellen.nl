<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ page, fetch, session, stuff }) {
		const year = parseInt(page.params.year) || new Date().getFullYear();
		const month = parseInt(page.params.month) || 1;
		const day = parseInt(page.params.day) || 1;

		const bg = page.query.get('bg');
		const fg = page.query.get('fg');
		const yl = page.query.get('yl');
		const img = page.query.get('img') || 'no';

		return {
			props: {
				year,
				month,
				day,
				bg,
				fg,
				yl,
				img
			}
		};
	}
</script>

<script>
	import { assets } from '$app/paths';
	import CookieMessage from '$lib/cookiemessage.svelte';
	import CountdownOptions from '$lib/countdown-options.svelte';
	import Doormat from '$lib/doormat.svelte';
	import Header from '$lib/header.svelte';
	import Share from '$lib/share.svelte';
	import Widget from '$lib/widget.svelte';
	import '../app.css';

	export let year;
	export let month;
	export let day;

	export let bg;
	export let fg;
	export let yl;
	export let img;

	$: style = `
		background-color: ${bg || '#ffffff'};
		color: ${fg || '#000000'};
		--yellow: ${yl || '#f8f5c3'};
	`;
</script>

<div class="page" {style}>
	<Header />
	<CookieMessage />

	{#if img != 'no'}
		<img src="{assets}/img/top/{img}.webp" alt="" class="topimg" />
	{/if}

	<div class="wrapper">
		<main>
			<slot />
		</main>
		<aside>
			<Share />
			<CountdownOptions />
			<Widget>
				<h2>Hier adverteren?</h2>
				<p>
					<a href="/contact">Neem contact op!</a>
				</p>
			</Widget>
		</aside>
	</div>
</div>

<Doormat />

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
	.topimg {
		width: 100%;
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
	aside > :global(* + *) {
		margin-top: 10px;
	}
	@media only screen and (max-width: 750px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
