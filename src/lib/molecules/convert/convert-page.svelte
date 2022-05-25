<script lang="ts">
	import Convert from "./convert.svelte";
	import ConvertTable from "./convert-table.svelte";
	import Meta from "$lib/layout/meta.svelte";
</script>

<h1>Omrekenen</h1>

<Meta
	title="Eenheden omrekenen op SnelAftellen.nl"
	description="Reken hier alle tijdseenheden naar elkaar om. Van seconden naar jaren, van maanden naar milliseconden en van dagen naar uren."
/>

<Convert />
<ConvertTable />
