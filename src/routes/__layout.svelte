<script context="module">
	import { defaultPimpOptions, pimpOptionsFromSearchParams, pimpStore } from '$lib/molecules/pimp/helpers';

	/** @type {import('./__layout').Load} */
	export function load({ url }) {
		return {
			props: {
				pimpOptions: pimpOptionsFromSearchParams(url.searchParams)
			},
		};
	}
</script>

<script lang="ts">
	import '$lib/styles/app.scss';
	import 'tippy.js/dist/tippy.css';

	import { navigating } from '$app/stores';
	import CountdownButton from '$lib/molecules/countdown/countdown-button.svelte';
	import Doormat from '$lib/layout/doormat.svelte';
	import Header from '$lib/layout/header.svelte';
	import Share from '$lib/layout/share.svelte';
	import PimpTopImage from '$lib/molecules/pimp/pimp-top-image.svelte';
	import SkipLink from '$lib/layout/skip-link.svelte';
	import PimpStyles from '$lib/molecules/pimp/pimp-styles.svelte';
	import LoadingBar from '$lib/layout/loading-bar.svelte';

	export let pimpOptions = defaultPimpOptions;

	$: img = $pimpStore.img || pimpOptions.img;
	$: theme = $pimpStore.theme || pimpOptions.theme;
</script>

<SkipLink />
<LoadingBar loading={!!$navigating} />
<Header />
<PimpStyles options={pimpOptions} />
<PimpTopImage img={img || pimpOptions.img} />

<div class="page {theme ? `theme-${theme}` : ''}">
	<div class="wrapper">
		<main id="content">
			<slot />
		</main>
		<aside>
			<CountdownButton />
			<Share />
		</aside>
	</div>
</div>

<Doormat />

<style lang="scss">
	@import '../lib/styles/vars';

	.page {
		min-height: 100vh;

		.wrapper {
			display: grid;
			grid-template-columns: 3fr 1fr;
			padding: $padding * 2;
			justify-content: space-between;
			gap: $padding * 2;

			@media (max-width: 1000px) {
				grid-template-columns: 1fr;
			}

			main {
				flex: 3 0;

				> :global(:first-child) {
					margin-top: 0;
				}
			}

			aside {
				flex: 1 0;

				> :global(* + *) {
					margin-top: $padding-sm;
				}
			}
		}
	}
</style>
