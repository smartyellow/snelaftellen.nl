<script lang="ts">
	import { getSeason } from "./helpers";

	export let d: Date;

	const season = getSeason(d);
	const alt = `In de ${season[0]}`;
	const src = season[1];
</script>

<a href="/seizoenen-{d.getFullYear()}">
	<img {src} {alt} title={alt} class="icon" />
</a>
