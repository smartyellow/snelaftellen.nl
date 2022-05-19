<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import tooltip from '$lib/ui/tooltip';

	import IconEmail from '$lib/gfx/svg/icon-email.svelte';
	import IconFacebook from '$lib/gfx/svg/icon-facebook.svelte';
	import IconMessage from '$lib/gfx/svg/icon-message.svelte';
	import IconShare from '$lib/gfx/svg/icon-share.svelte';
	import IconTwitter from '$lib/gfx/svg/icon-twitter.svelte';

	let native: ShareData = undefined;
	let mounted = false;
	let url: string = undefined;

	let em: string = undefined;
	let fb: string = undefined;
	let tw: string = undefined;
	let wa: string = undefined;

	onMount(() => {
		refreshButtons();
		mounted = true;
	});

	function refreshButtons() {
		url = window.location.toString();
		const title = document.title;
		const textRaw = `${title} ${url}`;
		const text = encodeURIComponent(textRaw);

		if (typeof navigator.share === 'function') native = { url, text: title };
		em = `mailto:?body=${text}`;
		fb = `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`;
		tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`; // prettier-ignore
		wa = `https://wa.me/?text=${text}`;
	}

	function nativeShare() {
		navigator.share(native);
	}
</script>

{#if mounted}
	<div transition:slide class="share">
		{#if native}
			<button on:click={nativeShare} class="btn native" title="Deel" use:tooltip>
				<IconShare />
			</button>
		{/if}
		<a href={em} class="btn em" title="Verzenden via e-mail" use:tooltip>
			<IconEmail />
		</a>
		<a href={fb} class="btn fb" title="Delen op Facebook" use:tooltip>
			<IconFacebook />
		</a>
		<a href={tw} class="btn tw" title="Delen op Twitter" use:tooltip>
			<IconTwitter />
		</a>
		<a href={wa} class="btn wa" title="Delen via WhatsApp" use:tooltip>
			<IconMessage />
		</a>
	</div>
{/if}

<style lang="scss">
	@import '../styles/vars';

	.share {
		display: flex;
		gap: $padding-sm;
	}

	a,
	button {
		text-decoration: none;
		flex: 1;
		text-align: center;
		height: 100%;
		margin-left: 0;
		margin-right: 0;
		padding: $padding-sm;

		:global(svg) {
			height: 20px;
			width: 20px;
			transform: none !important;
		}

		&:hover {
			:global(svg *) {
				stroke: #fff;
			}
		}
	}

	.em :global(svg *) { stroke: #1e90ff; }
	.fb :global(svg *) { stroke: #4267b2; }
	.tw :global(svg *) { stroke: #1da1f2; }
	.wa :global(svg *) { stroke: #25d366; }
</style>
