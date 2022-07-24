<script lang="ts">
	import { onMount } from 'svelte';
	import type { TimeStore } from './helpers';

	export let offset = 120; // minutes

	let s: TimeStore = {
		epoch: 0,
		hr: 0,
		min: 0,
		sec: 0,
	};
	let deg: Partial<TimeStore> = {
		hr: 0,
		min: 0,
		sec: 0,
	};

	function refresh() {
		s.epoch = new Date().getTime() + offset * 60_000;
		s.hr = s.epoch / 60_000;
		s.min = s.hr / 60;
		s.sec = s.min / 60;
		s = s;

		deg.hr = ((s.hr / 12) * 360) + ((s.min / 60) * 30) + 90;
		deg.min = ((s.min / 60) * 360) + ((s.sec / 60) * 6) + 90;
		deg.sec = ((s.sec / 60) * 360) + 90;
		deg = deg;
	}

	refresh();
	onMount(() => {
		const interval = setInterval(refresh, 1000);
		return () => clearInterval(interval);
	});
</script>

<div class="clock analogue">
	<div class="markers">
		{#each Array(6) as _, i}
			<div
				data-num={i}
				style:transform="rotate({i * 30}deg)"
				class:accent={i === 0 || i === 3}
			/>
		{/each}
	</div>

	<div class="middle"></div>

	<div class="hand-hr" style:transform="rotate({deg.hr}deg)"></div>
	<div class="hand-min" style:transform="rotate({deg.min}deg)"></div>
	<div class="hand-sec" style:transform="rotate({deg.sec}deg)"></div>
</div>

<style lang="scss">
	$_bg: #e1e1e1;

	.clock.analogue {
		background-color: $_bg;
		position: relative;
		height: 8rem;
		width: 8rem;
		border-radius: $round;
		overflow: hidden;

		* { position: absolute; }
		> * { height: 100%; width: 100%; }

		.markers {
			width: 100%;
			height: 100%;

			* {
				width: 100%;
				height: 0.5px;
				top: 50%;
				background-color: black;
			}

			.accent {
				background-color: $accent-dark;
				height: 3px;
				top: calc(50% - 1.5px);
			}
		}

		.middle {
			background-color: $_bg;
			border-radius: $round;
			height: calc(100% - 10px);
			width: calc(100% - 10px);
			top: 5px;
			left: 5px;

			&::after {
				content: '';
				position: absolute;
				background-color: $grey;
				border-radius: $round;
				width: 5px;
				height: 5px;
				top: calc(50% - 2.5px);
				left: calc(50% - 2.5px);
			}
		}

		.hand-hr,
		.hand-min,
		.hand-sec {
			width: 100% !important;
			clip: rect(0rem, var(--width), 3px, 4rem);
			top: calc(50% - var(--height) / 2);
			height: var(--height);
			transform: rotate(-90deg);
		}

		.hand-hr {
			--height: 3px;
			--width: 6.4rem;
			background-color: black;
		}

		.hand-min {
			--height: 1px;
			--width: 7.4rem;
			background-color: black;
		}

		.hand-sec {
			--height: 1px;
			--width: 8rem;
			background-color: red;
			width: 50%;
		}
	}
</style>
