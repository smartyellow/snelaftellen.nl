<script context="module">
	import { defaultPimpOptions, pimpOptionsFromSearchParams, pimpStore } from '$lib/molecules/countdown/pimp/helpers';

	/** @type {import('./__layout@base').Load} */
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
	import { loading } from '$lib/helpers';
	import Doormat from '$lib/layout/doormat.svelte';
	import Header from '$lib/layout/header.svelte';
	import PimpTopImage from '$lib/molecules/countdown/pimp/pimp-top-image.svelte';
	import SkipLink from '$lib/layout/skip-link.svelte';
	import PimpStyles from '$lib/molecules/countdown/pimp/pimp-styles.svelte';
	import LoadingBar from '$lib/layout/loading-bar.svelte';

	export let pimpOptions = defaultPimpOptions;

	$: img = $pimpStore.img || pimpOptions.img;
	$: theme = $pimpStore.theme || pimpOptions.theme;
</script>

<SkipLink />
<LoadingBar loading={!!$navigating || $loading} />
<Header />
<PimpStyles options={pimpOptions} />
<PimpTopImage img={img || pimpOptions.img} />

<div class="page theme-{theme}">
	<div class="wrapper">
		<slot />
	</div>
</div>

<Doormat />

<style lang="scss">
	.page {
		min-height: 100vh;

		> .wrapper {
			display: flex;
			padding: $padding * 2;
			justify-content: space-between;
			gap: $padding * 2;

			@media (max-width: 1000px) {
				flex-direction: column;
			}

			:global {
				> main {
					width: 100%;
					flex: 3 0;

					> :first-child {
						margin-top: 0;
					}
				}

				> aside {
					flex: 1 0;

					@media (max-width: 1000px) {
						max-width: 100%;
					}

					> * + * {
						margin-top: $padding-sm;
					}
				}
			}
		}
	}
</style>
