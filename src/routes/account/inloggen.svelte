<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { loginErrorMessages } from '$lib/molecules/account/helpers';
	import Alert from '$lib/ui/alert.svelte';
	import xhrForm, { type XhrFormCallback } from '$lib/ui/xhrform';

	export let captcha: string;
	export let csrf: string;
	export let err: string = undefined;

	let enabled = false;
	let timeout: NodeJS.Timer;

	const onDone: XhrFormCallback = async ({ form, text }) => {
		const json = JSON.parse(text);
		csrf = json.csrf || csrf;
		captcha = json.captcha || captcha;
		err = undefined;

		enabled = false;
		timeout = setTimeout(() => enabled = true, 3000);
		form.reset();
	};

	const onSuccess: XhrFormCallback = async () => {
		goto('/account/profiel');
	};

	const onError: XhrFormCallback = async ({ text }) =>  {
		const json = JSON.parse(text);
		err = json.err;
	}

	onMount(() => {
		timeout = setTimeout(() => enabled = true, 3000);
		return () => clearTimeout(timeout);
	});
</script>

<h1>Mijn SnelAftellen.nl</h1>

{#if err}
	<Alert cls="mb">{loginErrorMessages[err]}</Alert>
{/if}

<div class="grid-50">
	<div class="card">
		<h2>Ik heb al een account</h2>
		<form method="post" use:xhrForm={{ onDone, onSuccess, onError }}>
			<label>
				Gebruikersnaam
				<input type="text" name="username" required />
			</label>

			<label>
				Wachtwoord
				<input type="password" name="password" required />
			</label>

			<hr />
			<label>
				Vul alle letters in: (hooflettergevoelig)
				{@html captcha}
				<input type="text" name="captcha" required />
			</label>

			<input type="hidden" name="csrf" value={csrf} />
			<button type="submit" disabled={!enabled}>Inloggen</button>
		</form>
	</div>

	<div class="card">
		<h2>Ik heb nog geen account</h2>
		<p>Schrijf je in voor allerlei handige functies!</p>
		<ul>
			<li>Sla je gepimpte kalenders op in je account;</li>
			<li>Maak lijstjes;</li>
			<li>Bekijk je aftelkalenders op één plek;</li>
			<li>...en meer!</li>
		</ul>
		<p>Binnenkort kan je je inschrijven. Bedankt voor je interesse!</p>
	</div>
</div>

<style lang="scss">
	@import '../../lib/styles/vars';

	label {
		:global(svg) {
			display: block;
			margin: $padding;
		}
	}

	input[name="captcha"] {
		width: 100px;
		font-family: monospace;
		font-size: 1.2rem;
		text-align: center;
	}
</style>
