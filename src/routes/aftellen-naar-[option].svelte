<script context="module">
	import { countdownOptions } from "$lib/constants";

	/** @type {import('@sveltejs/kit').Load} */
	export function load({ page, fetch, session, stuff }) {
		const { option } = page.params;

		if (countdownOptions.includes(option)) {
			return {
				props: {
					option
				}
			}
		} else {
			return {
				status: 400,
				error: new Error(`No such countdown option (${option})`)
			};
		}
	}
</script>

<script>
	import Countdown from "./aftellen.svelte";

	export let option;
</script>

<Countdown {option} />
