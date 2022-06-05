<script lang="ts">
	import type { User } from "$lib/molecules/account/helpers";
	import iconUser from '$lib/gfx/svg/icon-user.svg?raw';

	import iconCalendar from '$lib/gfx/svg/icon-calendar.svg?raw';

	export let user: User;
	export let countdownCount: number;
</script>

<div class="user-welcome">
	<div class="icon">{@html iconUser}</div>
	<div>
		<p class="btn-desc">Welkom</p>
		<p class="name">{user.name}</p>
	</div>
</div>

<div class="grid-50 mobile">
	<div class="card">
		<p class="desc">
			{@html iconCalendar}
			<a href="/account/kalenders">Aftelkalenders</a>
		</p>
		<p class="statistic">{countdownCount}</p>
	</div>
</div>

<style lang="scss">
	@import '../../lib/styles/vars';

	.user-welcome {
		display: flex;
		gap: $padding;
		align-items: center;
		border-bottom: $border solid $grey-light;
		padding-bottom: $padding;
		margin-bottom: $padding;

		p {
			margin: 0;
		}

		.name {
			font-size: 1.5rem;
		}

		.icon {
			:global(svg) {
				width: 3rem;
				height: 3rem;
			}
		}
	}
</style>
