<style>
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

<main>
	<slot name="headline"/>
	<hr>
    <slot name="infobox"/>
	<slot name="gallery"/>
	<hr>
	<slot name="footer"/>
</main>