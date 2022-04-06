<script lang="ts">
	import { localeOptions, months } from '$lib/constants';
	import Modal from '$lib/ui/modal.svelte';
	import { Moon } from 'lunarphase-js';
	import { moonPhases } from './helpers';
	import MoonPage from './moon-page.svelte';
	import tooltip from '$lib/ui/tooltip';

	export let d: Date;

	const phase = Moon.lunarPhase(d);
	const alt = moonPhases[phase][0];
	const src = moonPhases[phase][1];
	const viceversa = moonPhases[phase][2];

	let modalOpen = false;

	function openModal() {
		modalOpen = true;
	}
</script>

<a
	href="/maanstand-{d.getDate()}-{months[d.getMonth()]}-{d.getFullYear()}"
	on:click|preventDefault={openModal}
	title="Maanstand bekijken voor {d.toLocaleString('nl-NL', localeOptions)}"
	use:tooltip
>
	<img {src} {alt} title={alt} class="icon" class:viceversa />
</a>

<Modal bind:show={modalOpen} title="Maanstand">
	<MoonPage {d} />
</Modal>

<style lang="scss">
	@import '../../styles/vars';
	img.icon {
		cursor: pointer;
	}
</style>
