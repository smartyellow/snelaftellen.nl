<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import CopyUrl from './copyurl.svelte';

	let open = false;
	let visible = false;

	export let title = '';
	export let bg = '#ffffff';
	export let fg = '#000000';
	export let yl = '#f8f5c3';
	export let img = 'no';

	const protocol = dev ? 'http://' : 'https://';

	function buildUrl() {
		const built = `${protocol}${$page.url.host}${$page.url.pathname}?bg=${encodeURIComponent(
			bg
		)}&fg=${encodeURIComponent(fg)}&yl=${encodeURIComponent(yl)}&title=${encodeURIComponent(
			title
		)}&img=${encodeURIComponent(img)}`;
		return built;
	}

	let shorturl = '';
	let url = buildUrl();

	async function shorten() {
		const apiUrl = `/api/shorturl/${encodeURIComponent(buildUrl())}`;
		const res = await fetch(apiUrl);
		const url = await res.text();
		shorturl = url;
	}

	onMount(() => {
		// Check if JS is enabled, then show pimp button.
		visible = true;
	});
</script>

<button
	on:click={() => {
		open = !open;
	}}
	class="toggle"
	class:visible
>
	<span>TIP!</span>
	<u>Pimp je kalender</u>
</button>

{#if open}
	<fieldset>
		<legend>Pimp je aftelkalender!</legend>
		<div class="group">
			<input type="text" id="title" bind:value={title} on:change={() => url = buildUrl()} placeholder="bv. Sinterklaas" />
			<label for="title">Waar tel je naar af?</label>
		</div>
		<div class="group">
			<input type="color" id="bg" bind:value={bg} on:change={() => url = buildUrl()} />
			<label for="bg">Achtergrondkleur</label>
		</div>
		<div class="group">
			<input type="color" id="fg" bind:value={fg} on:change={() => url = buildUrl()} />
			<label for="fg">Tekstkleur</label>
		</div>
		<div class="group">
			<input type="color" id="yl" bind:value={yl} on:change={() => url = buildUrl()} />
			<label for="fg">Gele kaders</label>
		</div>
		<div class="group">
			<select id="img" bind:value={img} on:change={() => url = buildUrl()}>
				<option value="no">Geen plaatje</option>
				<option value="flags">Vlaggenlijn</option>
				<option value="pumpkin">Halloween</option>
				<option value="christmas">Kerstmis</option>
				<option value="vacation">Vakantie / Strand</option>
				<option value="inmemoriam">Bloem (in memoriam)</option>
				<option value="balloons">Ballonnen</option>
				<option value="presents">Cadeaus</option>
			</select>
			<label for="img">Plaatje</label>
		</div>
		<p>
			<a href={url} class="btn">Laat maar zien!</a>
			<button on:click={shorten}>
				Ik wil een korte url
				{#if shorturl}
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon" viewBox="0 0 16 16">
						<path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
						<path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
					</svg>
				{/if}
			</button>
		</p>
		<hr />
		<CopyUrl url={shorturl || url} />
		<p>
			Deel of bookmark deze URL om je gepimpte aftelkalender op te slaan. Klik erop om het resultaat
			te bekijken! Let op: we slaan je gepimpte kalender niet op; zorg dus dat je de URL goed
			bewaart als je je aftelkalender naar wens hebt gepimpt.
		</p>
	</fieldset>
{/if}

<style>
	button.toggle {
		text-decoration: none;
		display: none;
	}
	button.toggle.visible {
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
