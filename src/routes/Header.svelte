<script>
	import { page } from '$app/stores';
	import logo from '$lib/images/logo.png';
	import github from '$lib/images/github.svg';
	import { base } from '$app/paths';
</script>

<header>

	<nav class = "navbar">
		<!-- <div class="corner"> -->
			<a href="https://github.com/sacheinn17/mlModelBuilder" class = "navbar-start">
				<img src={logo} alt="mlModelBuilder" />
			</a>
		<!-- </div> -->
	
	
		<dev class = "tabs-boxed navbar-center">
			<a href="{base}/" class = "tab">Home</a>
			<a href="{base}/about" class = "tab">About</a>
		</dev>

<dev class = "navbar-end">

		<div class="dropdown">
		<div tabindex="0" role="button" class="btn m-1">
			Theme
			<svg
			width="12px"
			height="12px"
			class="inline-block h-2 w-2 fill-current opacity-60"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 2048 2048">
			<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
			</svg>
			</div>
			<ul class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl">
				<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
					aria-label="Default"
					value="default" />
				</li>
				<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
					aria-label="Retro"
					value="retro" />
				</li>
				<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
					aria-label="Cyberpunk"
					value="cyberpunk" />
				</li>
				<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
					aria-label="Valentine"
					value="valentine" />
				</li>
				<li>
				<input
					type="radio"
					name="theme-dropdown"
					class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
					aria-label="Aqua"
					value="aqua" />
				</li>
			</ul>
		</div>
				
		</dev><!-- <div class="corner"> -->




	</nav>


</header>

<style>
	/* header {
		display: flex;
		justify-content: space-between;
	} */

	.corner {
		width: 3em;
		height: 3em;
	}


	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	/* nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	} */

	/* svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	} */

	/* ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	} */

	/* li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	} */

	/* nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	} */

	/* a:hover {
		color: var(--color-theme-1);
	} */
</style>
