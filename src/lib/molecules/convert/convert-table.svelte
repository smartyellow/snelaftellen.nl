<script>
	import { units } from './helpers';

	const unitList = Object.keys(units);
</script>

<div class="overflow mt">
	<table>
		<thead>
			<tr>
				<th></th>
				{#each unitList as unit}
					<th>{units[unit].name}</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each unitList as unit1}
				<tr>
					<th>{units[unit1].name}</th>
					{#each unitList as unit2}
						<td>
							{#if unit1 === unit2}
								-
							{:else}
								{units[unit2].toMins(
									units[unit1].fromMins(1)
								).toLocaleString('nl-NL')}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style lang="scss">
	table {
		width: 100%;

		th, td {
			padding: 5px;
		}

		th {
			background-color: $light;
			text-align: center;
		}

		tbody {
			tr {
				&:hover {
					background-color: $light;
				}

				th {
					text-align: right;
				}

				td {
					text-align: center;

					&:hover {
						background-color: darken($light, 10);
					}
				}
			}
		}
	}
</style>
