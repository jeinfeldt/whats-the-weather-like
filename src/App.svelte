<script>
	import Layout from './Layout.svelte';
	import Header from './Header.svelte';
	import Info from './Info.svelte';
	import Gallery from './Gallery.svelte';
	import Footer from './Footer.svelte';
</script>

<style>
    div {
		margin-bottom: 50px;
	}
</style>

<Layout>
	<div slot="headline">
		<Header/>
	</div>
	<div slot="infobox">
		<Info/>
	</div>	
	<div slot="gallery">
		<Gallery/>
	</div>	
	<div slot="footer">
		<Footer/>
	</div>	
</Layout>
