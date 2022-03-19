<script lang="ts">
	import { daysOfWeek, months } from "$lib/constants";
	import { Moon } from "lunarphase-js";
	import { getCountdownUrl } from "../countdown/helpers";
	import { moonPhases } from "./helpers";

	export let d: Date;

	let dates: Array<Date> = [];
	for (let i = 0; i < 7; i++) {
		const date = new Date(d);
		date.setDate(date.getDate() + i + 1);
		dates.push(date);
	}
</script>

<div class="week">
	{#each dates as date}
		{@const phase = Moon.lunarPhase(date)}
		<div class="day">
			<a href={getCountdownUrl(date)} rel="external">
				<img src={moonPhases[phase][1]} class:viceversa={moonPhases[phase][2]} alt="" />
				<p class="day">{daysOfWeek[date.getDay() - 1] || 'zondag'}</p>
				<p class="date" title="{date.getDate()} {months[date.getMonth()]} {date.getFullYear()}">{date.getDate()}-{date.getMonth() + 1}</p>
				<p class="phase">{moonPhases[phase][0]}</p>
			</a>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../../styles/vars';
	.week {
		display: flex;
		justify-content: space-between;
		text-align: center;
		gap: $padding;
		.day {
			flex: 1;
			a {
				color: $dark;
				text-decoration: none;
				&:hover {
					.day {
						text-decoration: underline;
					}
				}
			}
			p, img {
				margin: 0;
				margin-bottom: $padding-sm;
			}
			img {
				max-width: 3rem;
			}
			.day {
				text-transform: uppercase;
				font-weight: 700;
			}
			.date {
				color: $grey;
			}
		}
	}
</style>
