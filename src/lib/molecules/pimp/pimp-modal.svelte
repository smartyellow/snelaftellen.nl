<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/env';
	import CopyUrl from '../../ui/copy-url.svelte';
	import { headerImages, pimpStore, themes} from './helpers';
	import Modal from '$lib/ui/modal.svelte';
	import VerticalNav from '$lib/ui/vertical-nav.svelte';
	import SelectImg from '$lib/ui/select-img.svelte';

	import iconSettings from '$lib/gfx/svg/icon-settings.svg?raw';
	import iconColourPicker from '$lib/gfx/svg/icon-colour-picker.svg?raw';
	import iconImage from '$lib/gfx/svg/icon-image.svg?raw';
	import iconDesign from '$lib/gfx/svg/icon-design.svg?raw';

	export let open = false;

	export let title = '';
	export let bg = '#ffffff';
	export let fg = '#000000';
	export let yl = '#f8f5c3';
	export let img = 'no';
	export let theme = 'xp';

	$: pimpObject = { title, bg, fg, yl, img };
	const protocol = dev ? 'http://' : 'https://';
	let shorturl = '';
	let url = buildUrl();
	let pane = 'main';

	function buildUrl(): string {
		const built = `${protocol}${$page.url.host}${$page.url.pathname}?bg=${encodeURIComponent(
			bg
		)}&fg=${encodeURIComponent(fg)}&yl=${encodeURIComponent(yl)}&title=${encodeURIComponent(
			title
		)}&img=${encodeURIComponent(img)}&theme=${encodeURIComponent(theme)}`;
		return built;
	}

	function change() {
		url = buildUrl();
		pimpStore.update(pimpObject);
	}

	async function shorten() {
		const apiUrl = `/api-internal/shorturl/${encodeURIComponent(buildUrl())}`;
		const res = await fetch(apiUrl);
		const url = await res.text();
		shorturl = url;
	}
</script>

<div class="pimp-modal">
	<Modal show={open} title="Pimp je aftelkalender!">
		<form on:change={change} on:submit|preventDefault={change}>
			<div class="panes">
				<VerticalNav>
					<button
						class:active={pane === 'main'}
						on:click={() => pane = 'main'}
					>
						{@html iconSettings} Algemeen
					</button>

					<button
						class:active={pane === 'colours'}
						on:click={() => pane = 'colours'}
					>
						{@html iconColourPicker} Kleuren
					</button>

					<button
						class:active={pane === 'img'}
						on:click={() => pane = 'img'}
					>
						{@html iconImage} Afbeelding
					</button>

					<button
						class:active={pane === 'theme'}
						on:click={() => pane = 'theme'}
					>
						{@html iconDesign} Thema
					</button>
				</VerticalNav>

				{#if pane === 'main'}
					<div>
						<div class="group">
							<input type="text" id="title" bind:value={title} placeholder="bv. Sinterklaas" />
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
							<label for="img">Plaatje</label>
							<SelectImg
								bind:value={img}
								options={headerImages}
								name="img"
								getImage={id => `/img/top/${id}.webp`}
							/>
						</div>
					</div>
				{/if}

				{#if pane === 'theme'}
					<div>
						<div class="group">
							<label for="theme">Thema</label>
							<SelectImg
								bind:value={theme}
								options={themes}
								name="theme"
								getImage={id => `/img/themes/${id}.webp`}
							/>
						</div>
					</div>
				{/if}
			</div>

			<div class="links">
				<div class="grid-25">
					<a href={url} class="btn" on:click={() => open = false}>Laat maar zien!</a>
					<button on:click={shorten} disabled={!!shorturl}>Korte url</button>
				</div>
				<hr />
				<CopyUrl url={shorturl || url} />
				<p>
					Deel of bookmark deze URL om je gepimpte aftelkalender op te slaan. Klik erop om het
					resultaat te bekijken! Let op: we slaan je gepimpte kalender niet op; zorg dus dat je de
					URL goed bewaart als je je aftelkalender naar wens hebt gepimpt.
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
</style>
