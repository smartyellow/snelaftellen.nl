<script context="module">
	import { countdownOptions } from '$lib/constants';

	/** @type {import('./aftellen-naar-[option=option]').Load} */
	export function load(req) {
		const { option } = req.params;
		const redirectTo = `/${option}`;

		if (!countdownOptions.includes(option))
			return {
				status: 404
			};

		return {
			status: 301, // Moved Permanently
			redirect: redirectTo
		};
	}
</script>
