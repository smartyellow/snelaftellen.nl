<script lang="ts">
	import { daysOfWeek, months } from '$lib/constants';
	import Modal from './modal.svelte';
	import tooltip from '$lib/ui/tooltip';
	import { getCountdownUrl, type PimpOptions } from '$lib/molecules/countdown/pimp/helpers';
	import WidgetImage from './widget-image.svelte';
	import { convertDayNumberFromSundayToMonday, hasDatePassed } from '$lib/dates';

	import iconInfo from '$lib/gfx/svg/icon-info.svg?raw';

	export let title: string;
	export let date: Date;
	export let description: string = undefined;
	export let info: string = undefined;
	export let image: string = undefined;
	export let calendarPimpOptions: PimpOptions = undefined;
	export let showAfterDate = true;

	let infoOpened = false;
</script>

{#if !hasDatePassed(date) || showAfterDate}
	<WidgetImage overlay {image}>
		<div class="top" slot="top">
			{#if info}
				<span
					class="info"
					role="button"
					on:click={() => infoOpened = true}
					title="Info"
					use:tooltip
				>
					{@html iconInfo}
				</span>
			{/if}

			<p class="event-title">{title}</p>

			<p class="event-date">
				<span class="day">{daysOfWeek[convertDayNumberFromSundayToMonday(date.getDay())]}</span>
				<span class="date count">
					{date.getDate()}
				</span>
				<span class="month">{months[date.getMonth()]}</span>
				<span class="year">{date.getFullYear()}</span>
			</p>

			{#if description}
				<p class="event-description">
					{description}
				</p>
			{/if}
		</div>

		<div class="bottom" slot="bottom">
			{#if $$slots.bottom}
				<slot name="bottom" />
			{:else}
				<a href={getCountdownUrl(date, calendarPimpOptions)} class="btn raised">
					Nu aftellen
				</a>
			{/if}
		</div>
	</WidgetImage>

	{#if info}
		<Modal bind:show={infoOpened} title="Over {title}">
			{@html info}
		</Modal>
	{/if}
{/if}

<style lang="scss">
	@import '../styles/vars';

	.top {
		.info {
			float: right;
			cursor: pointer;
		}

		.event-title {
			font-size: 1.5rem;
			font-weight: 700;
			margin: 0;
		}

		.event-date {
			.date {
				font-weight: 700;
				width: 50px;
				height: 50px;
				padding-top: 15px;
				vertical-align: middle;
				text-align: center;
				background-image: url('/img/countdown/calendar.svg');
				background-repeat: no-repeat;
				background-size: contain;
				background-position: center center;
				display: inline-block;
				color: #000;
			}
		}
	}
</style>
