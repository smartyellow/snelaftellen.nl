<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/countdown/helpers';

	export function load({ url, params }: LoadInput): LoadOutput {
		const pimpOptions = getPimpOptions(url.searchParams);

		return {
			props: {
				pimpOptions
			}
		};
	}
</script>

<script lang="ts">
	import CookieMessage from '$lib/layout/cookie-message.svelte';
	import CountdownOptions from '$lib/countdown/countdown-button.svelte';
	import Doormat from '$lib/layout/doormat.svelte';
	import Header from '$lib/layout/header.svelte';
	import Share from '$lib/layout/share.svelte';
	import '$lib/styles/app.scss';
	import PimpTopImage from '$lib/countdown/pimp-top-image.svelte';
	import { getContext } from 'svelte';
	import type { PimpOptions } from '$lib/countdown/helpers';

	export let pimpOptions: PimpOptions;

	const topImage: string = getContext('headerImage');
</script>

<div class="page">
	<Header />
	<PimpTopImage img={topImage || pimpOptions.img} />
	<CookieMessage />

	<div class="wrapper">
		<main>
			<slot />
		</main>
		<aside>
			<Share />
			<CountdownOptions />
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
		padding: $padding * 2;
		justify-content: space-between;
		gap: $padding * 2;
	}
	main {
		flex: 3 0;
		:global(:first-child) {
			margin-top: 0;
		}
	}
	aside {
		flex: 1 0;
	}
	aside > :global(* + *) {
		margin-top: $padding-sm;
	}
	@media only screen and (max-width: 800px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
