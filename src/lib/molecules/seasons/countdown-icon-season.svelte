<script lang="ts">
	import { getSeason } from './helpers';
	import tooltip from '$lib/ui/tooltip';

	export let d: Date;

	const season = getSeason(d);
	const alt = `In de ${season[0]}`;
	const src = season[1];
</script>

<a href="/seizoenen">
	<img {src} {alt} title={alt} class="icon" use:tooltip />
</a>
