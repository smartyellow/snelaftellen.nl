<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/env';
	import { onMount } from 'svelte';
	import CopyUrl from './copy-url.svelte';
	import { getPimpBodyStyle, getPimpImagePath, headerImages } from './helpers';
	import { setContext } from 'svelte';
	import Modal from '$lib/ui/modal.svelte';
	import VerticalNav from '$lib/ui/vertical-nav.svelte';

	import IconSettings from '$lib/gfx/svg/icon-settings.svelte';
	import IconColourPicker from '$lib/gfx/svg/icon-colour-picker.svelte';
	import IconImage from '$lib/gfx/svg/icon-image.svelte';

	export let title = '';
	export let bg = '#ffffff';
	export let fg = '#000000';
	export let yl = '#f8f5c3';
	export let img = 'no';

	const protocol = dev ? 'http://' : 'https://';
	let open = false;
	let hasJs = false;
	let rawStyles = buildRawStyles();
	let shorturl = '';
	let url = buildUrl();
	let pane = 'main';

	function buildRawStyles() {
		return getPimpBodyStyle({ title, bg, fg, yl, img });
	}

	function buildUrl(): string {
		const built = `${protocol}${$page.url.host}${$page.url.pathname}?bg=${encodeURIComponent(
			bg
		)}&fg=${encodeURIComponent(fg)}&yl=${encodeURIComponent(yl)}&title=${encodeURIComponent(
			title
		)}&img=${encodeURIComponent(img)}`;
		return built;
	}

	function toggleOpen() {
		open = !open;
	}

	function close() {
		open = false;
	}

	function change() {
		url = buildUrl();
		rawStyles = buildRawStyles();
		setContext('headerImage', getPimpImagePath(img));
	}

	async function shorten() {
		const apiUrl = `/api/shorturl/${encodeURIComponent(buildUrl())}`;
		const res = await fetch(apiUrl);
		const url = await res.text();
		shorturl = url;
	}

	onMount(() => {
		// Check if JS is enabled, then show pimp button.
		hasJs = true;
	});
</script>

{@html rawStyles}

{#if hasJs}
	<button on:click={toggleOpen} class="has-badge">
		<span>TIP!</span>
		<u>Pimp je kalender</u>
	</button>
{/if}

<div class="pimp-modal">
	<Modal show={open} title="Pimp je aftelkalender!">
		<form on:change={change} on:submit|preventDefault={change}>
			<div class="panes">
				<VerticalNav>
					<button class:active={pane === 'main'} on:click={() => { pane = 'main'; }}>
						<IconSettings /> Algemeen
					</button>
					<button class:active={pane === 'colours'} on:click={() => { pane = 'colours'; }}>
						<IconColourPicker /> Kleuren
					</button>
					<button class:active={pane === 'img'} on:click={() => { pane = 'img'; }}>
						<IconImage /> Afbeelding
					</button>
				</VerticalNav>

				{#if pane === 'main'}
					<div>
						<div class="group">
							<input
								type="text"
								id="title"
								bind:value={title}
								placeholder="bv. Sinterklaas"
							/>
							<label for="title">Waar tel je naar af?</label>
						</div>
					</div>
				{/if}

				{#if pane === 'colours'}
					<div>
						<div class="group">
							<input type="color" id="bg" bind:value={bg} />
							<label for="bg">Achtergrondkleur</label>
						</div>
						<div class="group">
							<input type="color" id="fg" bind:value={fg} />
							<label for="fg">Tekstkleur</label>
						</div>
						<div class="group">
							<input type="color" id="yl" bind:value={yl} />
							<label for="fg">Gele kaders</label>
						</div>
					</div>
				{/if}

				{#if pane === 'img'}
					<div>
						<div class="group">
							<div class="imgselect">
								{#each headerImages as image}
									<div class="opt">
										<div class="label">
											<input type="radio" id={image.id} value={image.id} bind:group={img} />
											<label for={image.id}>{image.title}</label>
										</div>
										<div class="img" style="background-image: url('{getPimpImagePath(image.id)}');"></div>
									</div>
								{/each}
							</div>
							<label for="img">Plaatje</label>
						</div>
					</div>
				{/if}
			</div>

			<div class="links">
				<p>
					<a href={url} class="btn" on:click={close}>Laat maar zien!</a>
					<button on:click={shorten} disabled={!!shorturl}>Ik wil een korte url</button>
				</p>
				<hr />
				<CopyUrl url={shorturl || url} />
				<p>
					Deel of bookmark deze URL om je gepimpte aftelkalender op te slaan. Klik erop om het resultaat
					te bekijken! Let op: we slaan je gepimpte kalender niet op; zorg dus dat je de URL goed
					bewaart als je je aftelkalender naar wens hebt gepimpt.
				</p>
			</div>
		</form>
	</Modal>
</div>

<style lang="scss">
	@import '../../styles/vars';
	.pimp-modal {
		:global(.modal .slot) {
			padding: 0 !important;
			height: 100vh;
		}
	}
	.panes {
		display: flex;
		border-bottom: $border solid $grey-light;
		:global(nav) {
			border-right: $border solid $grey-light;
			min-width: 25%;
		}
		> div {
			padding: $padding;
			flex-grow: 1;
		}
	}
	.links {
		padding: $padding;
	}
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
		@media (max-width: 600px) {
			flex-direction: column;
		}
		.opt {
			border: 1px solid $accent-light;
			padding: 0;
			flex: 1 0 calc(50% - $padding-sm * 0.5);
			max-width: calc(50% - $padding-sm * 0.5);
			border-radius: $radius;
			@media (max-width: 600px) {
				max-width: 100%;
				width: 100%;
			}
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
