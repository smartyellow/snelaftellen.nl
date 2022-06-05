<script lang="ts">
	import { goto } from '$app/navigation';
	import Modal from '$lib/ui/modal.svelte';
	import iconFloppy from '$lib/gfx/svg/icon-floppy.svg?raw';
	import Alert from '$lib/ui/alert.svelte';
	import VisibilityToggle from './visibility-toggle.svelte';

	import type { User } from '$lib/molecules/account/helpers';
	import type { Countdown } from '$lib/molecules/countdown/helpers';

	export let user: User;
	export let open = false;
	export let countdown: Partial<Countdown>;
	export let csrf: string;

	let msg: string;

	async function save(exists = false) {
		msg = null;
		const response = await fetch('/api-internal/calendar/save', {
			body: JSON.stringify({
				csrf,
				countdown,
			}),
			method: exists ? 'put' : 'post',
		});
		const data = await response.json();

		if (!response.ok) {
			msg = 'Oeps, er ging iets mis... Probeer het nog een keer alsjeblieft.';
		}
		else {
			goto(`/aftellen/${data.countdown._id}`);
			open = false;
		}
	}
</script>

<Modal
	title={countdown._id ? 'Kalender wijzigen' : 'Kalender opslaan'}
	bind:show={open}
>
	{#if user}
		{#if msg}
			<Alert cls="mb">{msg}</Alert>
		{/if}

		<label>
			Geef je kalender een naam:
			<input
				type="text"
				bind:value={countdown.title}
				placeholder="Mijn geweldige kalender..."
			/>
		</label>

		<div class="mb">
			Zichtbaarheid
			<VisibilityToggle bind:value={countdown.visibility} />
		</div>

		<button
			disabled={countdown.title.length < 3}
			on:click={() => save(!!countdown._id)}
		>
			{@html iconFloppy} Opslaan
		</button>
	{:else}
		<p>
			Om je kalender op te slaan, moet je eerst een gratis accout
			aanmaken.
		</p>
		<p>
			<a href="/account/registreren" class="btn raised">Account maken</a>
			<a href="/account/inloggen" class="btn">Inloggen</a>
		</p>
	{/if}
</Modal>
