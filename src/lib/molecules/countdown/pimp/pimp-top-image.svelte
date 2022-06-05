<script lang="ts">
	import type { HeaderImageId } from './helpers';

	export let img: HeaderImageId = 'no';
</script>

{#if img && img !== 'no' && img != 'null'}
	<div
		class="topimage"
		style:background-image="url('/img/countdown/pimp/top/{img}.webp')"
	/>
{/if}

<style lang="scss">
	.topimage {
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 10rem;
	}
</style>
