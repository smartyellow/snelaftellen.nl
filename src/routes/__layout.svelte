<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { getPimpOptions } from '$lib/molecules/countdown/helpers';

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
	import CookieMessage from '$lib/molecules/layout/cookie-message.svelte';
	import CountdownOptions from '$lib/molecules/countdown/countdown-button.svelte';
	import Doormat from '$lib/molecules/layout/doormat.svelte';
	import Header from '$lib/molecules/layout/header.svelte';
	import Share from '$lib/molecules/layout/share.svelte';
	import '$lib/styles/app.scss';
	import PimpTopImage from '$lib/molecules/countdown/pimp-top-image.svelte';
	import { getContext } from 'svelte';
	import type { PimpOptions } from '$lib/molecules/countdown/helpers';
	import SkipLink from '$lib/molecules/layout/skip-link.svelte';

	export let pimpOptions: PimpOptions;

	const topImage: string = getContext('headerImage');
</script>

<SkipLink />
<Header />

<div class="page">
	<PimpTopImage img={topImage || pimpOptions.img} />

	<div class="wrapper">
		<main id="content">
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
	@media (max-width: 800px) {
		.wrapper {
			flex-direction: column;
		}
	}
</style>
