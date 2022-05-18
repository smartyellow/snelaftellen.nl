<script lang="ts">
	type GetImageFunction = (id?: string, title?: string) => string;

	export let name: string;
	export let value: string;
	export let getImage: GetImageFunction = () => undefined;
	export let imagePosition = 'center center';
	export let options: {
		id: string;
		title: string;
		img?: string;
		_img?: string;
	}[];

	options = options.map(opt => {
		opt._img = opt.img || getImage(opt.id, opt.title) || undefined;
		return opt;
	});
</script>

<div class="imgselect">
	{#each options as opt}
		<div class="opt">
			<div class="label">
				<input
					type="radio"
					{name}
					id={opt.id}
					value={opt.id}
					bind:group={value}
					on:change
				/>
				<label for={opt.id}>{opt.title}</label>
			</div>
			<div
				class="img"
				class:noimg={!opt._img}
				style:background-image="url('{opt._img}')"
				style:background-position={imagePosition}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	@import '../styles/vars';

	.imgselect {
		display: grid;
		gap: $padding-sm;
		grid-template-columns: 1fr 1fr 1fr;
		width: 100%;

		@media (max-width: 800px) {
			grid-template-columns: 1fr;
		}

		.opt {
			border: 1px solid $accent-light;
			padding: 0;
			border-radius: $radius;

			.label {
				padding: $padding-sm;
				background-color: lighten($grey, 15);
				border-radius: $radius $radius 0 0;
			}

			.img {
				width: 100%;
				height: 4rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;
				border-radius: 0 0 $radius $radius;

				&.noimg {
					height: 0;
				}
			}
		}
	}
</style>
