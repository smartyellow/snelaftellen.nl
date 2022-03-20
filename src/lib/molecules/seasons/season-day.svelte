<script lang="ts">
	import { daysOfWeek } from "$lib/constants";
	import IconInfo from "$lib/gfx/svg/icon-info.svelte";
	import { getSeason } from "./helpers";

	export let d: Date;

	const season = getSeason(d);
	const alt = season[0];
	const src = season[1];
	const href = season[2];
</script>

<div class="today">
	<img {src} {alt} title={alt} />
	<div class="info">
		<p class="day">Vandaag ({daysOfWeek[d.getDay() - 1] || 'zondag'})</p>
		<p class="title">
			{alt}
			<a {href} title="Info" target="_blank">
				<IconInfo />
				<span class="sr">Info</span>
			</a>
		</p>
	</div>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.today {
		display: flex;
		align-items: center;
		p {
			margin: 0;
		}
		img {
			margin-right: $padding;
		}
		.info {
			.title {
				font-family: 'Sora', $font-base;
				font-size: 2rem;
			}
			.day {
				text-transform: uppercase;
				color: $grey;
				font-size: 1rem;
			}
		}
	}
</style>
