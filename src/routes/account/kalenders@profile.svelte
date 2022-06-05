<script lang="ts">
	import WidgetDate from "$lib/ui/widget-date.svelte";
	import type { User } from "$lib/molecules/account/helpers";
	import type { Countdown } from "$lib/molecules/countdown/helpers";

	export let countdowns: Countdown[] = [];

	$: countdowns = countdowns.map(c => {
		c.countTo = new Date(c.countTo);
		return c;
	});
</script>

<h3>Je aftelkalenders</h3>

<div class="grid-50">
	{#each countdowns as countdown}
		<WidgetDate
			title={countdown.title}
			date={countdown.countTo}
			image={countdown.pimpOptions.img ? `/img/countdown/pimp/top/${countdown.pimpOptions.img}` : undefined}
		>
			<div slot="bottom">
				<a href="/aftellen/{countdown._id}" class="btn raised">
					Aftellen
				</a>
			</div>
		</WidgetDate>
	{/each}
</div>

<style lang="scss">
	@import '../../lib/styles/vars';
</style>
