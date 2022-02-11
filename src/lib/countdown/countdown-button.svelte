<script lang="ts">
	import Modal from "$lib/ui/modal.svelte";
	import CountdownRoute from "../../routes/aftellen.svelte";
	import { beforeNavigate } from '$app/navigation';
import IconCalendar from "$lib/gfx/svg/icon-calendar.svelte";

	let isOpen = false;

	function open() {
		isOpen = true;
		history.pushState(
			null,
			'Tel af naar datums en weken op SnelAftellen.nl',
			'/aftellen'
		);
	}

	function close() {
		isOpen = false;
		history.back();
	}

	beforeNavigate(() => {
		close();
	});
</script>

<a
	sveltekit:prefetch
	href="/aftellen"
	class="btn shadow"
	on:click|preventDefault={open}
>
	<IconCalendar />
	Aftellen!
</a>

<Modal bind:show={isOpen} {close} title="Aftellen!">
	<CountdownRoute />
</Modal>

<style lang="scss">
	@import '../styles/vars';
	$_size: 1.8rem;
	a {
		display: block;
		text-align: center;
		font-size: $_size;
	}
	.btn {
		padding: 10px;
		border-radius: 0;
		&.shadow {
			box-shadow: $shadow-flat $accent-light;
			border-radius: $radius;
			&:active {
				box-shadow: none;
			}
		}
		:global(svg) {
			height: $_size;
			width: $_size;
		}
	}
</style>
