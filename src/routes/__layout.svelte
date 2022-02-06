<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ url, params }: LoadInput): LoadOutput {
		const year = parseInt(params.year) || new Date().getFullYear();
		const month = parseInt(params.month) || 1;
		const day = parseInt(params.day) || 1;

		const bg = url.searchParams.get('bg');
		const fg = url.searchParams.get('fg');
		const yl = url.searchParams.get('yl');
		const img = url.searchParams.get('img') || 'no';

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

<script lang="ts">
	import { assets } from '$app/paths';
	import CookieMessage from '$lib/layout/cookiemessage.svelte';
	import CountdownOptions from '$lib/countdown/countdown-options.svelte';
	import Doormat from '$lib/layout/doormat.svelte';
	import Header from '$lib/layout/header.svelte';
	import Share from '$lib/layout/share.svelte';
	import Widget from '$lib/layout/widget.svelte';
	import '$lib/styles/app.scss';

	export let bg: string;
	export let fg: string;
	export let yl: string;
	export let img: string;

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

<style lang="scss">
	@import '../lib/styles/vars';
	.page {
		min-height: 100vh;
	}
	.wrapper {
		display: flex;
		flex-direction: row;
		padding: $padding;
		justify-content: space-between;
	}
	.topimg {
		width: 100%;
	}
	main {
		flex: 3 0;
		padding: $padding;
	}
	main :global(:first-child) {
		margin-top: 0;
	}
	aside {
		flex: 1 0;
		padding: $padding;
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
