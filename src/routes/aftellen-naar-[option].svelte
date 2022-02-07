<script context="module" lang="ts">
	import { countdownOptions } from '$lib/constants';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load({ params }: LoadInput): LoadOutput {
		const { option } = params;

		if (countdownOptions.includes(option)) {
			return {
				props: {
					option
				}
			};
		} else {
			return {
				status: 400,
				error: new Error(`No such countdown option (${option})`)
			};
		}
	}
</script>

<script lang="ts">
	import Countdown from './aftellen.svelte';

	export let option: string;
</script>

<Countdown {option} />
