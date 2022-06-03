<script lang="ts">
	import type { User } from "$lib/molecules/account/helpers";
	import xhrForm, { type XhrFormCallback } from "$lib/ui/xhrform";
	import Alert from "$lib/ui/alert.svelte";

	import iconUser from '$lib/gfx/svg/icon-user.svg?raw';
	import iconEmail from '$lib/gfx/svg/icon-email.svg?raw';
	import iconKey from '$lib/gfx/svg/icon-key.svg?raw';

	export let user: User;
	export let err: string = undefined;
	export let success = false;
	export let csrf: string;

	const onDone: XhrFormCallback = async () => {
		err = undefined;
	};

	const onSuccess: XhrFormCallback = async () => {
		success = true;
	};

	const onError: XhrFormCallback = async ({ text }) =>  {
		const json = JSON.parse(text);
		err = json.err;
	}
</script>

{#if success}
	<Alert cls="mb">
		Je gegevens zijn opgeslagen.
	</Alert>
{/if}

<form method="post" use:xhrForm={{ onDone, onSuccess, onError }}>
	<div class="grid-50">
		<div class="card">
			<label>
				{@html iconUser} Naam
				<input type="text" name="name" value={user.name} />
			</label>
		</div>

		<div class="card">
			<label>
				{@html iconEmail} E-mailadres
				<input type="email" name="email" value={user.email} />
			</label>
		</div>

		<div class="card">
			<label>
				{@html iconKey} Wachtwoord
				<span class="muted">Verandert alleen als je hieronder een nieuwe invult</span>
				<input type="password" name="password" />
			</label>
		</div>
	</div>

	<input type="hidden" name="csrf" value={csrf} />
	<button type="submit" class="mt">Opslaan</button>
</form>
