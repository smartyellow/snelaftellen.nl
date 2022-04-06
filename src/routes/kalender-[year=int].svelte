<script context="module">
	import { isInt } from '$lib/helpers';

	/** @type {import('./kalender-[year]').Load} */
	export function load({ params }) {
		const { year } = params;

		if (!isInt(year))
			return {
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
