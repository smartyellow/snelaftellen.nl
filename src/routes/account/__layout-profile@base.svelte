<script lang="ts">
	import VerticalNav from '$lib/ui/vertical-nav.svelte';
	import { page } from '$app/stores';

	import iconUser from '$lib/gfx/svg/icon-user.svg?raw';
	import iconCalendar from '$lib/gfx/svg/icon-calendar.svg?raw';
	import iconEmail from '$lib/gfx/svg/icon-email.svg?raw';
	import iconList from '$lib/gfx/svg/icon-list.svg?raw';

	const items = [
		{ name: 'Je profiel', href: '/account/profiel', icon: iconUser },
		{ name: 'Je account', href: '/account/details', icon: iconEmail },
		{ name: 'Je kalenders', href: '/account/kalenders', icon: iconCalendar },
		{ name: 'Je verzamelingen', href: '/account/verzamelingen', icon: iconList },
	];
</script>

<main>
	<h2>Je account</h2>

	<div class="account">
		<VerticalNav cls="p-0">
			{#each items as item}
				<a
					href={item.href}
					class="btn"
					class:active={$page.url.pathname.startsWith(item.href)}
				>
					{@html item.icon} {item.name}
				</a>
			{/each}
		</VerticalNav>

		<div class="slot content">
			<slot />
		</div>
	</div>
</main>

<style lang="scss">
	@import '../../lib/styles/vars';

	.account {
		display: grid;
		gap: $padding;
		min-height: 70vh;

		@media (min-width: 700px) {
			grid-template-columns: 1fr 3fr;

			.content {
				border-left: $border solid $grey-light;
				padding-left: $padding;
			}
		}
	}
</style>
