<script lang="ts">
	import { onMount } from 'svelte';
	import { blocSelectionModal, buildMode } from '../store';

	// Icons
	import Shovel from '$lib/components/icons/shovel.svelte';
	import Eye from '$lib/components/icons/eye.svelte';

	let el: any;
	let modal: any;
	let build: boolean;

	blocSelectionModal.subscribe((value) => {
		modal = value;
	});

	buildMode.subscribe((value) => {
		build = value;
	});

	onMount(async () => {
		const { init } = await import('$lib/scene');

		init(el);
	});
</script>

<canvas bind:this={el} class="fixed top-0 left-0" />
<div class="absolute top-0 left-0 p-6 w-full ">
	<div class="flex flex-row justify-between">
		<div class="font-roboto text-2xl font-semibold text-black dark:text-white">
			MDDB's Garden Manager
		</div>
		<div class="flex justify-center align-middle">
			{#if build === true}
				<button
					on:click={() => {
						buildMode.set(false);
						blocSelectionModal.set({ isOpen: false, x: 0, y: 0 });
					}}
				>
					<Shovel class="text-black dark:text-white h-8 w-8 cursor-pointer" />
				</button>
			{/if}
			{#if build === false}
				<button on:click={() => buildMode.set(true)}>
					<Eye class="text-black dark:text-white h-8 w-8 cursor-pointer" />
				</button>
			{/if}
		</div>
	</div>
</div>
<div class="font-roboto text-lg font-semibold text-black dark:text-white absolute bottom-6 right-6">
	v0.0
</div>
{#if modal.isOpen}
	<div
		class="bg-white rounded-lg p-4 w-1/4 absolute bg-opacity-60 drop-shadow-2xl backdrop-blur-sm"
		style="top: {modal.y}px; left: {modal.x}px"
	>
		<div class="font-roboto text-xl font-semibold text-black dark:text-white">
			The modal opens at x:{modal.x}, y:{modal.y}
		</div>
		<button
			on:click={() => blocSelectionModal.set({ isOpen: false, x: 0, y: 0 })}
			class="bg-black text-white p-2 text-center rounded-md mt-4 font-semibold capitalize ml-auto"
		>
			Cancel
		</button>
	</div>
{/if}
