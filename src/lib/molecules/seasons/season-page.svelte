<script lang="ts">
	import { localeOptions } from '$lib/constants';
	import { capitalize } from '$lib/helpers';
	import { getCountdownUrl } from '../countdown/helpers';
	import { seasons } from './helpers';
	import tooltip from '$lib/ui/tooltip';
	import IconInfo from '$lib/gfx/svg/icon-info.svelte';

	function date(d: Date) {
		return d
			.toLocaleDateString('nl-NL', localeOptions) // make it readable
			.slice(0, -5); // strip year number
	}
</script>

<div class="seasonpage">
	{#each Object.keys(seasons) as season}
		{@const s = seasons[season]}
		<div class="season">
			<a href="/{s[0]}" target="_blank">
				<img src={s[1]} alt="" />
			</a>
			<p class="name">
				{capitalize(s[0])}
				<a href={s[2]} target="_blank" title="Info" use:tooltip>
					<IconInfo />
				</a>
			</p>
			<div class="dates">
				<p class="begin">
					Begint op
					<a href="/{s[0]}">{date(s[3])}</a>.
				</p>
				<p class="end">
					Eindigt na
					<a href={getCountdownUrl(s[4])}>{date(s[4])}</a>.
				</p>
			</div>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../../styles/vars';
	.seasonpage {
		.season {
			display: flex;
			gap: $padding * 2;
			align-items: center;
			margin-bottom: $padding;
			p {
				margin: 0;
			}
			img {
				max-width: 5rem;
				height: auto;
			}
			.name {
				font-family: 'Sora', $font-base;
				font-weight: 700;
				width: 6rem;
				:global(svg) {
					vertical-align: middle;
				}
			}
		}
	}
</style>
