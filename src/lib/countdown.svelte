<script>
	import { localeOptions } from "./constants";
	import Widget from "./widget.svelte";

	export let count;
	export let date;
</script>

<Widget>
	<div>
		<p>nog</p>
		<p class="count">{count}</p>
		<p>dagen tot {date.toLocaleString('nl-NL', localeOptions)}</p>
	</div>
</Widget>

<style>
	div {
		text-align: center;
		font-size: 1.3rem;
	}
	.count {
		font-size: 3rem;
		font-weight: 700;
		margin: 0;
	}
	p {
		margin: 0;
	}
</style>
