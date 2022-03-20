<script lang="ts">
import { localeOptions } from "$lib/constants";

	import RelatedLinks from "$lib/ui/related-links.svelte";
	import { getCountdownUrl } from "../countdown/helpers";
	import MoonPageToday from "./moon-page-today.svelte";
	import MoonPageWeek from "./moon-page-week.svelte";

	export let d: Date;
</script>

<div class="moonpage">
	<MoonPageToday {d} />
	<MoonPageWeek {d} />

	<RelatedLinks>
		<a href={getCountdownUrl(d)}>Aftellen naar {d.toLocaleDateString('nl-NL', localeOptions)}</a>
		<a href="/seizoenen">Seizoenen {d.getFullYear()}</a>
		<a href="/kalender-{d.getFullYear()}">Jaarkalender {d.getFullYear()}</a>
	</RelatedLinks>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.moonpage {
		> :global(*) {
			margin-bottom: $padding-lg;
		}
	}
</style>
