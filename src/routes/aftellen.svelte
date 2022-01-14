<script context="module">
	export const prerender = true;
</script>

<script>
	import DatepickerDate from "$lib/datepicker-date.svelte";
	import DatepickerWeek from "$lib/datepicker-week.svelte";
	import Meta from "$lib/meta.svelte";
	import Widget from "$lib/widget.svelte";
	import calendarDate from "$gfx/calendar-date@0.5x.webp?w=100&h=100";
	import calendarWeek from "$gfx/calendar-week@0.5x.webp?w=100&h=100";

	export let option = undefined;
</script>

<Meta title="Tel af naar datums en weken op SnelAftellen.nl" />

<div class="cols">
	<Widget highlighted={option === "datum"}>
		<img src={calendarDate} alt="" />
		<h2>Tel af naar een datum</h2>
		<p>Tel af naar je favoriete datum!</p>
		<DatepickerDate />
		<p>
			Als je alleen een maand en een jaar invult, wordt dag 1 van de maand automatisch gekozen.
		</p>
		<p>Als je alleen een jaar invult, gaan we uit van 1 januari.</p>
	</Widget>
	<Widget highlighted={option === "week"}>
		<img src={calendarWeek} alt="" />
		<h2>Tel af naar een weeknummer</h2>
		<p>Tel af naar een bepaald weeknummer van een jaar.</p>
		<DatepickerWeek />
	</Widget>
</div>

<style>
	:global(.widget) img {
		width: 80px;
		height: 80px;
		float: right;
	}
</style>
