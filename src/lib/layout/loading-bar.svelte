<script lang="ts">
	export let loading = true;
</script>

{#if loading}
	<div class="loading"></div>
{/if}

<style lang="scss">
	@keyframes loadingbar {
		0% {
			width: 0;
		}

		50% {
			width: 50%;
			left: 50%;
		}

		100% {
			width: 0;
			left: 100%;
		}
	}

	.loading {
		position: fixed;
		height: 3px;
		width: 0;
		top: 0;
		left: 0;
		background-color: #fff;
		animation-name: loadingbar;
		animation-duration: 1s;
		animation-iteration-count: infinite;
		animation-fill-mode: forwards;
	}
</style>
