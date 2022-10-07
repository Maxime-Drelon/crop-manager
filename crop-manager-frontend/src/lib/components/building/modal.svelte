<script lang="ts">
	import { blocSelectionModal } from '$lib/modules/building/store';

	let modal: any;

	blocSelectionModal.subscribe((value) => {
		modal = value;
	});
</script>

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
