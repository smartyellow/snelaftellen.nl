<script>
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let show = false;

	onMount(() => {
		if (Cookies.get('ca') != 'true') {
			show = true;
		}
	});

	function accept() {
		Cookies.set('ca', 'true');
		show = false;
	}
</script>

{#if show}
	<div transition:slide>
		Deze website serveert cookies.
		<button on:click={accept}>OK</button>
		<a target="_blank" href="https://www.consumentenbond.nl/internet-privacy/wat-zijn-cookies">
			Wat zijn cookies?
		</a>
		<a target="_blank" href="https://www.consumentenbond.nl/internet-privacy/cookies-verwijderen">
			Cookies uitzetten/verwijderen
		</a>
	</div>
{/if}

<style>
	div {
		padding: 5px;
		text-align: center;
	}
</style>
