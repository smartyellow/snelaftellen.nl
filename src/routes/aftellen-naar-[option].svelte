<script context="module" lang="ts">
	import { countdownOptions } from '$lib/constants';
	import type { LoadInput, LoadOutput } from '@sveltejs/kit';

	export function load(req: LoadInput): LoadOutput {
		const { option } = req.params;
		const redirectTo = `/${option}`;

		if (!countdownOptions.includes(option)) return {
			status: 404,
		};

		return {
			status: 301, // Moved Permanently
			redirect: redirectTo
		};
	}
</script>
