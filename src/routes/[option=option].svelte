<script context="module">
	/** @type {import('./[option=option]').Load} */
	export function load({ params }) {
		return {
			props: { option: params.option },
		};
	}
</script>

<script lang="ts">
	import type { countdownOptions } from '$lib/constants';
	import Countdown from './aftellen.svelte';

	export let option: typeof countdownOptions[number];
</script>

<Countdown {option} />
