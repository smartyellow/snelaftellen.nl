<script lang="ts">
	import { defaultPimpOptions, pimpStore, type PimpOptions } from './helpers';

	export let options: PimpOptions = {};

	let rawStyles: string;

	$: {
		Object.keys(defaultPimpOptions).forEach(key => {
			if (!options[key] || (options[key] == 'null')) {
				options[key] = defaultPimpOptions[key];
			}
			if ($pimpStore[key]) options[key] = $pimpStore[key];
		});

		rawStyles =  `
			\u003Cstyle\u003E
				body {
					background-color: ${options.bg};
					color: ${options.fg};
					--yellow: ${options.yl};
				}
			\u003C/style\u003E
		`;
	}
</script>

{@html rawStyles}
