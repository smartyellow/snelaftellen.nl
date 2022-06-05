<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';
	import { loginErrorMessages } from '$lib/molecules/account/helpers';
	import Alert from '$lib/ui/alert.svelte';

	export let captcha: string;
	export let csrf: string;
	export let err: string = undefined;
	export let input: any = {};

	let enabled = !browser;
	let passwordsMatch = true;
	let pw1: string;
	let pw2: string;

	function checkIfPasswordsMatch() {
		passwordsMatch = pw1 === pw2;
	}

	onMount(() => {
		const timeout = setTimeout(() => enabled = true, 3000);
		return () => clearTimeout(timeout);
	});
</script>

<h1>Mijn SnelAftellen.nl</h1>

{#if err}
	<Alert cls="mb">{loginErrorMessages[err]}</Alert>
{/if}

<div class="grid-50">
	<div class="card">
		<h2>Account aanmaken</h2>
		<form method="post">
			<label>
				Je naam
				<input
					type="text"
					name="name"
					required
					value={input.name || ''}
				/>
			</label>

			<label>
				Gebruikersnaam
				<input
					type="text"
					name="username"
					required
					value={input.username || ''}
				/>
			</label>

			<label>
				E-mailadres
				<input
					type="email"
					name="email"
					required
					value={input.email || ''}
				/>
			</label>

			<hr class="my-lg" />

			<label>
				Wachtwoord
				<input
					type="password"
					name="password"
					required
					bind:value={pw1}
				/>
			</label>

			<label>
				Wachtwoord nog een keer
				<input
					type="password"
					name="password2"
					required
					bind:value={pw2}
					on:keyup={checkIfPasswordsMatch}
				/>
			</label>

			{#if !passwordsMatch}
				<Alert cls="mt">
					{loginErrorMessages.PASSWORD_MISMATCH}
				</Alert>
			{/if}

			<hr class="my-lg" />

			<label>
				Captcha
				<p>{@html captcha}</p>
				<input type="text" name="captcha" required />
			</label>

			<input type="hidden" name="csrf" value={csrf} />
			<button type="submit" disabled={!enabled && passwordsMatch}>
				Inloggen
			</button>
		</form>
	</div>

	<div class="card">
		<h2>Ik heb nog geen account</h2>
		<p>Schrijf je in voor allerlei handige functies!</p>
	</div>
</div>
