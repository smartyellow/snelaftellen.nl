<script lang="ts">
	import WidgetDate from '$lib/ui/widget-date.svelte';
	import type { Countdown } from '$lib/molecules/countdown/helpers';

	export let countdowns: Countdown[] = [];

	$: countdowns = countdowns.map(c => {
		c.countTo = new Date(c.countTo);
		return c;
	});
</script>

<h3>Je aftelkalenders</h3>

<div class="grid-50">
	{#each countdowns as countdown}
		{@const hasImage = countdown.pimpOptions.img && countdown.pimpOptions.img != 'no'}
		<WidgetDate
			title={countdown.title}
			date={countdown.countTo}
			image={hasImage ? `/img/countdown/pimp/top/${countdown.pimpOptions.img}.webp` : undefined}
		>
			<div slot="bottom">
				<a href="/aftellen/{countdown._id}" class="btn raised">
					Aftellen
				</a>
			</div>
		</WidgetDate>
	{/each}
</div>
