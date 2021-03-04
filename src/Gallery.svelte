<script>
    import { weatherStore } from './store.js'
    import { onMount } from 'svelte';
    import { onDestroy } from 'svelte'
    import Link from './Link.svelte';

    let imgs = [];
    let placeholders = [];
   
    // when the weather is updated, fetch fresh images
    const unsubscribe = weatherStore.subscribe(function(weather) {
        // fetch images
        (async() => {
            // guard, ignore initial call
            if(weather == 0) {
                return;
            } 
            const imageResponse = await fetch(`/.netlify/functions/fetch-images?q=${weather}`)
            if (imageResponse.status != 200) {
                return;
            }
            const imageData = await imageResponse.json();
            imgs = imageData;
        })();
    });

    onMount(async () => {
       const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
       placeholders = await res.json();
    });
    onDestroy(unsubscribe)

    // functions for rendering
    function buildUserLink(name) {
        return "https://unsplash.com/@" + name + "?utm_source=wtwl?&utm_medium=referral"
    };
</script>

<style>
    .gallery {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-gap: 10px;
    }

    figure, img {
        width: 100%;
        margin: 0;
    }
</style>

<p>Outside your window could be something like this</p>
<div class="gallery">
	{#each imgs as current}
		<figure>
			<img src={current.urls.small} alt={current.alt_description}>
			<figcaption>
                Photo by 
                <Link href="{buildUserLink(current.user.username)}" text="{current.user.username}"/>
                on 
                <Link href="https://unsplash.com/?utm_source=wtwl?&utm_medium=referral" text="Unsplash"/>
            </figcaption>
		</figure>
	{:else}
		<!-- this block renders when photos.length === 0 -->
        {#each placeholders as holder}
            <figure>
                <img src={holder.thumbnailUrl} alt={holder.title}>
                <figcaption>{holder.title}</figcaption>
            </figure>
	    {/each}
	{/each}
</div>