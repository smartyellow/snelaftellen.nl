<script lang="ts">
	import MoonPage from '$lib/molecules/moon/moon-page.svelte';
	import Meta from '$lib/layout/meta.svelte';
	import { localeOptions, titleDivider } from '$lib/constants';
	import { getCountdownUrl } from '$lib/molecules/pimp/helpers';
	import tooltip from '$lib/ui/tooltip';
	import type { LunarPhaseWithDate } from '$lib/molecules/moon/helpers';

	export let date: Date;
	export let phases: LunarPhaseWithDate[];

	date = new Date(date);
	phases = phases.map(p => {
		p.date = new Date(p.date);
		return p;
	});
	const locale = date.toLocaleString('nl-NL', localeOptions);
</script>

<Meta
	title="De maanstand op {locale} {titleDivider} SnelAftellen.nl"
	description="Bekijk hier de maanstand op {locale}, en die van de hele week."
/>

<h1>
	Maanstand op
	<a href={getCountdownUrl(date)} title="Aftellen naar {locale}" use:tooltip>
		{locale}
	</a>
</h1>

<MoonPage {date} {phases} />
