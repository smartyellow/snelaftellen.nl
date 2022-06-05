<script lang="ts">
	import { page } from '$app/stores';
	import { dev } from '$app/env';
	import CopyUrl from '../../../ui/copy-url.svelte';
	import {
		defaultPimpOptions,
		headerImages,
		pimpStore,
		themes,
		type PimpOptions
	} from './helpers';
	import Modal from '$lib/ui/modal.svelte';
	import Alert from '$lib/ui/alert.svelte';
	import VerticalNav from '$lib/ui/vertical-nav.svelte';
	import SelectImg from '$lib/ui/select-img.svelte';
	import type { Countdown } from '../helpers';

	import iconColourPicker from '$lib/gfx/svg/icon-colour-picker.svg?raw';
	import iconImage from '$lib/gfx/svg/icon-image.svg?raw';
	import iconDesign from '$lib/gfx/svg/icon-design.svg?raw';

	export let open = false;
	export let opts: PimpOptions = JSON.parse(JSON.stringify(defaultPimpOptions));
	export let countdown: Countdown;
	export let csrf: string;

	const protocol = dev ? 'http://' : 'https://';
	let shorturl = '';
	let url = countdown._id ? $page.url.toString() : buildUrl();
	let pane = 'colours';
	let msg: string;

	function buildUrl(): string {
		const built = `${protocol}${$page.url.host}${$page.url.pathname}?bg=${encodeURIComponent(
			opts.bg
		)}&fg=${encodeURIComponent(opts.fg)}&yl=${encodeURIComponent(opts.yl)}&img=${encodeURIComponent(
			opts.img
		)}&theme=${encodeURIComponent(opts.theme)}`;
		return built;
	}

	function change() {
		pimpStore.update(opts);
		if (!countdown._id) {
			url = buildUrl();
		}
	}

	async function save() {
		if (countdown._id) {
			const response = await fetch('/api-internal/calendar/save', {
				body: JSON.stringify({
					csrf,
					countdown: {
						...countdown,
						pimpOptions: opts,
						_id: countdown._id,
					},
				}),
				method: 'put',
			});

			if (response.ok) {
				open = false;
			}
			else {
				msg = 'Oeps, er ging iets mis... Probeer het nog een keer alsjeblieft.';
			}
		}
		else {
			open = false;
		}
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

				{#if pane === 'colours'}
					<div>
						<div class="group">
							<input type="color" id="bg" bind:value={opts.bg} />
							<label for="bg">Achtergrondkleur</label>
						</div>
						<div class="group">
							<input type="color" id="fg" bind:value={opts.fg} />
							<label for="fg">Tekstkleur</label>
						</div>
						<div class="group">
							<input type="color" id="yl" bind:value={opts.yl} />
							<label for="fg">Gele kaders</label>
						</div>
					</div>
				{/if}

				{#if pane === 'img'}
					<div>
						<div class="group">
							<label for="img">Plaatje</label>
							<SelectImg
								bind:value={opts.img}
								options={headerImages}
								name="img"
								getImage={id => `/img/countdown/pimp/top/${id}.webp`}
							/>
						</div>
					</div>
				{/if}

				{#if pane === 'theme'}
					<div>
						<div class="group">
							<label for="theme">Thema</label>
							<SelectImg
								bind:value={opts.theme}
								options={themes}
								name="theme"
								getImage={id => `/img/countdown/pimp/themes/${id}.webp`}
							/>
						</div>
					</div>
				{/if}
			</div>

			<div class="links">
				{#if msg}
					<Alert>{msg}</Alert>
				{/if}
				<div class="grid-25">
					<a href={url} class="btn" on:click={save}>Laat maar zien!</a>
					{#if !countdown._id}
						<button on:click={shorten} disabled={!!shorturl}>Korte url</button>
					{/if}
				</div>
				<hr />
				<CopyUrl url={shorturl || url} />
				<p>
					Deel of bookmark deze URL om je gepimpte aftelkalender op te slaan. Klik erop om het
					resultaat te bekijken!

					{#if !countdown._id}
						Let op: we slaan je gepimpte kalender niet op; zorg dus
						dat je de URL goed bewaart als je je aftelkalender naar
						wens hebt gepimpt.
					{/if}
				</p>
			</div>
		</form>
	</Modal>
</div>

<style lang="scss">
	@import '../../../styles/vars';

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

		@media (max-width: 700px) {
			flex-direction: column;

			:global(nav) {
				border-right: none;
				border-bottom: $border solid $grey-light;
			}
		}
	}

	.links {
		padding: $padding;
	}
</style>
