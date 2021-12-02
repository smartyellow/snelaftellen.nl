<script>
	import { page } from "$app/stores";
	import { dev } from  "$app/env";
	import { onMount } from "svelte";

	let open = false;
	let visible = false;

	export let title = '';
	export let bg = '#ffffff';
	export let fg = '#000000';
	export let yl = '#f8f5c3';
	export let img = 'no';

	const protocol = dev ? 'http://' : 'https://'

	$: url = `${protocol}${$page.host}${$page.path}?bg=${encodeURIComponent(bg)}&fg=${encodeURIComponent(fg)}&yl=${encodeURIComponent(yl)}&title=${encodeURIComponent(title)}&img=${encodeURIComponent(img)}`;

	onMount(() => {
		// Check if JS is enabled, then show pimp button.
		visible = true;
	});
</script>

<button on:click={() => {open = !open}} class:visible>
	<span>TIP!</span>
	<u>Pimp je kalender</u>
</button>

{#if open}
	<fieldset>
		<legend>Pimp je aftelkalender!</legend>
		<div class="group">
			<input type="text" id="title" bind:value={title} placeholder="bv. Sinterklaas">
			<label for="title">Waar tel je naar af?</label>
		</div>
		<div class="group">
			<input type="color" id="bg" bind:value={bg}>
			<label for="bg">Achtergrondkleur</label>
		</div>
		<div class="group">
			<input type="color" id="fg" bind:value={fg}>
			<label for="fg">Tekstkleur</label>
		</div>
		<div class="group">
			<input type="color" id="yl" bind:value={yl}>
			<label for="fg">Gele kaders</label>
		</div>
		<div class="group">
			<select id="img" bind:value={img}>
				<option value="no">Geen plaatje</option>
				<option value="flags">Vlaggenlijn</option>
				<option value="pumpkin">Halloween</option>
				<option value="christmas">Kerstmis</option>
				<option value="vacation">Vakantie / Strand</option>
				<option value="inmemoriam">Bloem (in memoriam)</option>
				<option value="vacation">Ballonnen</option>
				<option value="presents">Cadeaus</option>
			</select>
			<label for="img">Plaatje</label>
		</div>
		<p>
			<a href="{url}" class="btn">Laat maar zien!</a>
		</p>
		<hr />
		<ins class="url">
			<a href="{url}">{url}</a>
		</ins>
		<p>
			Deel of bookmark deze URL om je gepimpte aftelkalender op te slaan.
			Klik erop om het resultaat te bekijken! Let op: we slaan je gepimpte
			kalender niet op; zorg dus dat je de URL goed bewaart als je je
			aftelkalender naar wens hebt gepimpt.
		</p>
	</fieldset>
{/if}

<style>
	ins.url {
		-moz-user-select: all;
		-webkit-user-select: all;
		-ms-user-select: all;
		user-select: all;
		display: block;
		border: 2px solid #808080;
		padding: 5px;
		background-color: #e2e2e2;
		text-align: center;
		overflow-x: auto;
		font-family: Arial, sans-serif;
	}
	button {
		text-decoration: none;
		display: none;
	}
	button.visible {
		display: block;
	}
	button span {
		background-color: #9acd32;
		color: #000000;
		text-decoration: none;
		margin-right: 5px;
		border-radius: 5px;
		padding: 3px;
	}
</style>
