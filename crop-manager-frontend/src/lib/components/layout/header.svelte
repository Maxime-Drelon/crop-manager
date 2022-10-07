<script lang="ts">
	import { blocSelectionModal, buildMode } from '$lib/modules/building/store';

	// Icons
	import Shovel from '$lib/components/icons/shovel.svelte';
	import Eye from '$lib/components/icons/eye.svelte';

	let build: boolean;

	buildMode.subscribe((value) => {
		build = value;
	});
</script>

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
