<script lang="ts">
	import Modal from '$lib/ui/modal.svelte';
	import CountdownRoute from '../../../routes/aftellen.svelte';
	import { beforeNavigate } from '$app/navigation';
	import IconCalendar from '$lib/gfx/svg/icon-calendar.svelte';

	let isOpen = false;
	const open = () => isOpen = true;
	const close = () => isOpen = false;

	beforeNavigate(close);
</script>

<a sveltekit:prefetch href="/aftellen" class="btn raised" on:click|preventDefault={open}>
	<IconCalendar />
	Aftellen!
</a>

<Modal bind:show={isOpen} {close} title="Aftellen!">
	<CountdownRoute />
</Modal>

<style lang="scss">
	@import '../../styles/vars';

	$_size: 1.8rem;

	a {
		display: block;
		text-align: center;
		font-size: $_size;
	}

	.btn {
		padding: 10px;
		border-radius: 0;

		:global(svg) {
			height: $_size;
			width: $_size;
			vertical-align: -0.25rem;
			transform: none !important;
		}
	}
</style>
