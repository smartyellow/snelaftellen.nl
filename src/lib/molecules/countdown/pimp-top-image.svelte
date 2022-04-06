<script lang="ts">
	import { assets } from '$app/paths';
	import type { HeaderImageId } from './helpers';

	export let img: HeaderImageId = 'no';
</script>

{#if img && img != 'no'}
	<div style:background-image="url('{assets}/img/top/{img}.webp')" />
{/if}

<style>
	div {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 10rem;
	}
</style>
