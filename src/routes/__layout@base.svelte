<script lang="ts">
	import CountdownButton from '$lib/molecules/countdown/countdown-button.svelte';
	import Share from '$lib/layout/share.svelte';
</script>

<main id="content">
	<slot />
</main>

<aside>
	<CountdownButton />
	<Share />
</aside>
