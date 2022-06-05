<script lang="ts">
	type ImageGetter = (id?: string, title?: string) => string;

	export let name: string;
	export let value: string;
	export let getImage: ImageGetter = () => undefined;
	export let imagePosition = 'center center';
	export let options: {
		id: string;
		title: string;
		img?: string;
	}[];
</script>

<div class="imgselect">
	{#each options as opt}
		{@const img = opt.img || getImage(opt.id, opt.title) || undefined}

		<div class="opt" on:click={() => value = opt.id}>
			<div class="label">
				<input
					type="radio"
					{name}
					id={opt.id}
					value={opt.id}
					group={name}
					on:change
				/>
				<label for={opt.id}>{opt.title}</label>
			</div>
			<div
				class="img"
				class:noimg={!img}
				style:background-image="url('{img}')"
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
			border: 1px solid #000;
			border-bottom-width: 2px;
			padding: 0;

			.label {
				padding: $padding-sm;
				background-color: $light;

				label {
					display: inline;
				}
			}

			.img {
				width: 100%;
				height: 4rem;
				background-position: center center;
				background-repeat: no-repeat;
				background-size: cover;

				&.noimg {
					height: 0;
				}
			}
		}
	}
</style>
