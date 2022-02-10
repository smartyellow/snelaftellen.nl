<script context="module" lang="ts">
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';
	import { isInt } from '$lib/helpers';

	export function load({ params }: LoadInput): LoadOutput {
		const { year } = params;

		if(!isInt(year)) return {
			status: 404
		};

		return {
			props: {
				year
			}
		};
	}
</script>

<script lang="ts">
	import Page from './kalender.svelte';

	export let year: number;
</script>

<Page {year} />
