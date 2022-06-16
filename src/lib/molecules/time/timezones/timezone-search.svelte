<script lang="ts">
	import { dateByOffset, timezoneOffset, type Country, type Timezone } from "./helpers";
	import iconSearch from '$lib/gfx/svg/icon-search.svg?raw';

	export let timezones: Timezone[];
	export let filteredTimezones = timezones;
	export let countriesObject: Record<string, Country>;
	export let input = '';

	function filter() {
		const i = input.toLowerCase()
		filteredTimezones = timezones.filter(tz => (
			tz.continent.toLowerCase().includes(i)
			|| tz.place.toLowerCase().includes(i)
		));
	}
</script>

<div class="tzsearch">
	<div class="search">
		<div class="icon">{@html iconSearch}</div>
		<!-- svelte-ignore a11y-autofocus -->
		<input
			bind:value={input}
			on:keyup={filter}
			type="text"
			placeholder="Zoek in {timezones.length} locaties..."
			autofocus
		/>
	</div>

	<div class="results">
		{#each filteredTimezones as timezone}
			{@const offset = timezoneOffset(timezone)}
			<div class="result">
				<a href="/tijdzones/{timezone._id.toLowerCase()}">
					<div class="time">
						{dateByOffset(offset).toLocaleTimeString('nl-NL', {
							timeStyle: 'short',
						})}
					</div>

					<div class="name">
						<span class="place">{timezone.place}</span>
						{#if timezone.countries?.length}
							<span class="continent">
								{countriesObject[timezone.countries[0]].name}
							</span>
						{/if}
					</div>
				</a>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.tzsearch {
		border: $border solid $grey-light;

		.search {
			display: flex;
			align-items: center;
			border-bottom: $border solid $grey-light;

			.icon {
				padding: $padding;

				:global(svg) {
					width: 2rem;
					height: 2rem;
				}
			}

			input {
				width: 100%;
				border-radius: 0;
				font-size: 1.8rem;
				padding: $padding;
				border: none;
				box-shadow: none;
			}
		}

		.results {
			max-height: 200px;
			overflow-y: scroll;
			display: grid;
			grid-template-columns: repeat(4, 1fr);

			@media (max-width: 1330px) {
				grid-template-columns: repeat(3, 1fr);
			}

			@media (max-width: 800px) {
				grid-template-columns: repeat(2, 1fr);
			}

			@media (max-width: 500px) {
				grid-template-columns: 1fr;
			}

			.result {
				padding: $padding * 0.5 $padding;

				&:hover {
					background-color: $light;
				}

				&:active {
					background-color: darken($light, 10);
				}

				a, span {
					text-decoration: none;
					display: block;
					color: #000;
				}

				a {
					display: flex;
					align-items: center;
					gap: $padding;
					height: 100%;

					.name {
						.continent {
							color: $grey;
						}
					}

					.time {
						font-size: 1.2rem;
						color: #fff;
						background-image: url('/img/timezones/alarmclock.svg');
						background-size: contain;
						background-repeat: no-repeat;
						padding: 10px;
						line-height: 0.5;
					}
				}
			}
		}
	}
</style>
