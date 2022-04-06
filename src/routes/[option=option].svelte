<script context="module">
	import { countdownOptions } from '$lib/constants';

	/** @type {import('./[option]').Load} */
	export function load({ params }) {
		const { option } = params;

		if (!countdownOptions.includes(option))
			return {
				fallthrough: true
			};

		return {
			props: {
				option
			}
		};
	}
</script>

<script lang="ts">
	import Countdown from './aftellen.svelte';

	export let option: typeof countdownOptions[number];
</script>

<Countdown {option} />
