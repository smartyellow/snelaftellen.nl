<script lang="ts">
	import { page } from '$app/stores';
	import iconUser from '$lib/gfx/svg/icon-user.svg?raw';

	const items = [
		[ 'Aftellen', '/aftellen' ],
		[ 'Kalender', '/kalender' ],
		[ 'Vandaag', '/vandaag' ],
		[ 'Omrekenen', '/omrekenen' ],
		[ 'Tijdzones', '/tijdzones' ],
	]
</script>

<header class="header">
	<div class="brand">
		<a href="/">
			<img src="/img/global/logo-text-white.webp" alt="SnelAftellen.nl" />
			<span class="sr">SnelAftellen.nl</span>
		</a>
	</div>

	<nav class="topnav">
		<ul>
			{#each items as item}
				<li class:active={$page.url.pathname.startsWith(item[1])}>
					<a href={item[1]}>
						{item[0]}
					</a>
				</li>
			{/each}

			<li
				class="account"
				class:active={$page.url.pathname.startsWith('/account')}
			>
				<a href="/account">{@html iconUser}</a>
			</li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@import '../styles/vars';

	.brand {
		padding: 1.4rem $padding;
		margin: 0;
		background-color: $accent-dark;
		color: $light;
		border: none;

		img {
			height: 1.4rem;
		}

		a {
			color: $light;
			text-decoration: none;

			&:hover {
				text-decoration: underline;
			}
		}
	}

	.topnav {
		background-color: $accent-light;
		color: $light;
		line-height: 1;

		ul {
			list-style: none;
			padding: 0;
			margin: 0;
			position: relative;
			display: flex;
			align-items: stretch;

			li {
				display: inline-block;
				color: $light;
				position: relative;

				a {
					padding: $padding;
					color: inherit;
					display: block;
					font-size: 1.2rem;
					height: 100%;
				}

				&:hover,
				&.active {
					a {
						background-color: #fff;
						text-decoration: none;
						color: $accent-light;
					}

					&::before {
						content: '';
						height: 5px;
						width: 100%;
						top: 100%;
						position: absolute;
						background-color: #fff;
					}
				}

				&.active {
					&::before {
						background-color: $accent-light;
					}
				}

				&.account {
					margin-left: auto;

					a {
						padding: 0 $padding;
						display: flex;

						:global(svg) {
							margin: auto;
						}
					}
				}
			}
		}
	}
</style>
