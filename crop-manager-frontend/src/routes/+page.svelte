<script lang="ts">
	import { onMount } from 'svelte';

	// Components
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
	import BuildingModal from '$lib/components/building/modal.svelte';

	let el: any;

	onMount(async () => {
		const { init } = await import('$lib/modules/scene/scene');

		init(el);
	});
</script>

<canvas bind:this={el} class="fixed top-0 left-0" />
<Header />
<Footer />
<BuildingModal />
