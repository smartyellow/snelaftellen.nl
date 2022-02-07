<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/env';
	import { assets } from '$app/paths';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import CopyUrl from './copy-url.svelte';
	import { headerImages } from './helpers';

	export let title = '';
	export let bg = '#ffffff';
	export let fg = '#000000';
	export let yl = '#f8f5c3';
	export let img = 'no';

	let open = false;
	let visible = false;

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

	function toggleOpen() {
		open = !open;
	}
</script>

{#if visible}
	<button on:click={toggleOpen} class="has-badge">
		<span>TIP!</span>
		<u>Pimp je kalender</u>
	</button>
{/if}

{#if open}
	<fieldset transition:slide>
		<legend>Pimp je aftelkalender!</legend>
		<div class="group">
			<input
				type="text"
				id="title"
				bind:value={title}
				on:change={() => (url = buildUrl())}
				placeholder="bv. Sinterklaas"
			/>
			<label for="title">Waar tel je naar af?</label>
		</div>
		<div class="group">
			<input type="color" id="bg" bind:value={bg} on:change={() => (url = buildUrl())} />
			<label for="bg">Achtergrondkleur</label>
		</div>
		<div class="group">
			<input type="color" id="fg" bind:value={fg} on:change={() => (url = buildUrl())} />
			<label for="fg">Tekstkleur</label>
		</div>
		<div class="group">
			<input type="color" id="yl" bind:value={yl} on:change={() => (url = buildUrl())} />
			<label for="fg">Gele kaders</label>
		</div>
		<div class="group">
			<!--<select id="img" bind:value={img} on:change={() => (url = buildUrl())}>
				<option value="no">Geen plaatje</option>
				<option value="flags">Vlaggenlijn</option>
				<option value="pumpkin">Halloween</option>
				<option value="christmas">Kerstmis</option>
				<option value="vacation">Vakantie / Strand</option>
				<option value="inmemoriam">Bloem (in memoriam)</option>
				<option value="balloons">Ballonnen</option>
				<option value="presents">Cadeaus</option>
			</select>-->

			<div class="imgselect">
				{#each headerImages as image}
					<div class="opt">
						<div class="label">
							<input type="radio" id={image.id} value={image.id} bind:group={img} on:change={() => (url = buildUrl())} />
							<label for={image.id}>{image.title}</label>
						</div>
						<div class="img" style="background-image: url('{assets}/img/top/{image.id}.webp');"></div>
					</div>
				{/each}
			</div>

			<label for="img">Plaatje</label>
		</div>
		<p>
			<a href={url} class="btn">Laat maar zien!</a>
			<button on:click={shorten} disabled={!!shorturl}> Ik wil een korte url </button>
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

<style lang="scss">
	@import '../styles/vars';
	button.has-badge {
		text-decoration: none;
		span {
			background-color: #9acd32;
			color: #000000;
			text-decoration: none;
			margin-right: 5px;
			border-radius: 5px;
			padding: 3px;
		}
	}
	.imgselect {
		display: flex;
		gap: $padding-sm;
		flex-wrap: wrap;
		.opt {
			border: 1px solid $accent-light;
			padding: 0;
			flex: 1 0 calc(50% - $padding-sm * 0.5);
			max-width: calc(50% - $padding-sm * 0.5);
			border-radius: $radius;
			.label {
				padding: $padding-sm;
				background-color: lighten($grey, 15);
				border-radius: $radius $radius 0 0;
			}
			.img {
				width: 100%;
				height: 4rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 0 0 $radius $radius;
			}
		}
	}
</style>
