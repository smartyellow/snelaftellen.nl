<script context="module" lang="ts">
	import { countdownOptions } from '$lib/constants';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ params }: LoadInput): LoadOutput {
		const { option } = params;

		if (!countdownOptions.includes(option)) return {
				status: 404
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
