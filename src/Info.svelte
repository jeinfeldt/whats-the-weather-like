<script>
     import { onMount } from 'svelte';
     import { weatherStore } from './store.js'
     import Link from './Link.svelte';

    let ip = "0.0.0.0";
    let city = "Stockholm";
    let mapsURL = "https://www.google.com/maps/place/";
    let weather = "light rain";
    let maps = "";

    onMount(async () => {
        // fetch ip-address and location
        const locationResponse = await fetch(`https://ipapi.co/json/`);
        if (locationResponse.status != 200) {
            return;
        }
        const locationData = await locationResponse.json();
        ip = locationData.ip;
        city = locationData.city;
        maps = mapsURL + city;
        // fetch weather
        const weatherResponse = await fetch(`/.netlify/functions/fetch-weather?location=${city}`)
        if (weatherResponse.status != 200) {
            return;
        }
        const weatherData = await weatherResponse.json();
        weather = weatherData.description
        // update reactive data
        $weatherStore = weather
    });
</script>

<style>
    span {
        font-style: italic;
    }

    .hidden {
        display: none;
    }
</style>

<p class="hidden">
    The IP-Address I see is: <span>{ip}</span>
</p>
<p>
 I think you are in <Link href="{maps}" text="{city}"/> and your weather looks like <span>{weather}</span>
</p>