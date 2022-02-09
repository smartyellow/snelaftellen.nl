<script lang="ts">
	import Modal from "$lib/ui/modal.svelte";
	import CountdownRoute from "../../routes/aftellen.svelte";
	import { beforeNavigate } from '$app/navigation';

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
		isOpen = false
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
	Aftellen!
</a>

<Modal bind:show={isOpen} title="Aftellen!">
	<CountdownRoute />
</Modal>

<style lang="scss">
	@import '../styles/vars';
	a {
		display: block;
		text-align: center;
		font-size: 1.8rem;
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
	}
</style>
