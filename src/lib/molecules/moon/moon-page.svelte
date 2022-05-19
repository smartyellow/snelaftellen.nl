<script lang="ts">
	import { getCountdownUrl } from '../pimp/helpers';
	import MoonToday from './moon-today.svelte';
	import MoonWeek from './moon-week.svelte';

	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';
	import IconUmbrella from '$lib/gfx/svg/icon-umbrella.svelte';

	export let d: Date;
</script>

<div class="moon">
	<MoonToday {d} />
	<MoonWeek {d} />
</div>

<div class="grid-50 mt">
	<a href={getCountdownUrl(d)} class="btn">
		<IconCalendar /> Aftellen
	</a>
	<a href="/seizoenen" class="btn">
		<IconUmbrella /> Seizoenen
	</a>
	<a href="/kalender-{d.getFullYear()}" class="btn">
		<IconCalendar /> Jaarkalender
	</a>
</div>

<style lang="scss">
	@import '../../styles/vars';

	.moon {
		:global(div:not(:last-child)) {
			margin-bottom: $padding;
		}
	}
</style>
