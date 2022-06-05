<script lang="ts">
	import type { Visibility } from '$lib/helpers';

	import iconEye from '$lib/gfx/svg/icon-eye.svg?raw';
	import iconEyeClose from '$lib/gfx/svg/icon-eye-close.svg?raw';
	import iconEyeOff from '$lib/gfx/svg/icon-eye-off.svg?raw';

	export let value: Visibility = 'private';

	const visibilities: {
		id: Visibility,
		icon: string,
		title: string,
		desc: string,
	}[] = [
		{ id: 'public', icon: iconEye, title: 'Publiek', desc: 'Deze aftelkalender is zichtbaar voor iedereen.' },
		{ id: 'invisible', icon: iconEyeClose, title: 'Onzichtbaar', desc: 'Alleen mensen met wie je de link deelt kunnen deze kalender zien.' },
		{ id: 'private', icon: iconEyeOff, title: 'Privé', desc: 'Alleen jij kan deze aftelkalender zien.' },
	];
</script>

<div class="grid-33">
	{#each visibilities as visibility}
		<button
			on:click={() => value = visibility.id}
			class:active={value === visibility.id}
		>
			{@html visibility.icon}
			<div>
				<div>{visibility.title}</div>
				<div class="muted">{visibility.desc}</div>
			</div>
		</button>
	{/each}
</div>
