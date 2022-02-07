<script lang="ts">
	import autumnIcon from "$gfx/season-autumn@0.5x.webp?h=90&w=90&img";
	import springIcon from "$gfx/season-spring@0.5x.webp?h=90&w=90&img";
	import summerIcon from "$gfx/season-summer@0.5x.webp?h=90&w=90&img";
	import winterIcon from "$gfx/season-winter@0.5x.webp?h=90&w=90&img";

	export let d: Date;

	const month = d.getMonth();
	let name: string;
	let src: string;

	// https://gist.github.com/jossef/d904cd0838304b0e6c01
	if (3 <= month && month <= 5) {
		name = 'lente';
		src = springIcon;
	} else if (6 <= month && month <= 8) {
		name = 'zomer';
		src = summerIcon;
	} else if (9 <= month && month <= 11) {
		name = 'herfst';
		src = autumnIcon;
	} else { // Months 12, 01, 02
		name = 'winter';
		src = winterIcon;
	}

	let alt = `In de ${name}`;
</script>

<img {src} {alt} title={alt} class="icon" />
