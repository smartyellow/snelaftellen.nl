<script context="module">
	import { defaultPimpOptions, getPimpOptions, pimpStore } from '$lib/molecules/pimp/helpers';

	/** @type {import('./__layout').Load} */
	export function load({ url }) {
		return {
			props: { pimpOptions: getPimpOptions(url.searchParams) },
		};
	}
</script>

<script lang="ts">
	import '$lib/styles/app.scss';
	import 'tippy.js/dist/tippy.css';

	import CountdownOptions from '$lib/molecules/countdown/countdown-button.svelte';
	import Doormat from '$lib/layout/doormat.svelte';
	import Header from '$lib/layout/header.svelte';
	import Share from '$lib/layout/share.svelte';
	import PimpTopImage from '$lib/molecules/pimp/pimp-top-image.svelte';
	import SkipLink from '$lib/layout/skip-link.svelte';
	import PimpStyles from '$lib/molecules/pimp/pimp-styles.svelte';

	export let pimpOptions = defaultPimpOptions;

	$: img = $pimpStore.img || pimpOptions.img;
	$: theme = $pimpStore.theme || pimpOptions.theme;
</script>

<SkipLink />
<Header />
<PimpStyles options={pimpOptions} />

<div class="page {theme ? `theme-${theme}` : ''}">
	<PimpTopImage img={img || pimpOptions.img} />

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
