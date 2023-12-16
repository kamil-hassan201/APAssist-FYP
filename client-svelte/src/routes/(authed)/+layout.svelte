<script lang="ts">
	import '$/app.css';
	import 'overlayscrollbars/overlayscrollbars.css';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { showDock, showLoadingOverlay } from '$/globalStore';

	import Logo from '$lib/assets/APAssist.png';
	import HamburgerIcon from '$lib/icons/HamburgerIcon.svelte';
	import Sidebar from './Sidebar.svelte';
	import Button from '$/lib/components/Button/Button.svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { firebaseAuth } from '$/lib/firebase/firebase';
	import { authUser } from '$/lib/authStore';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;
	$: ({ dockOpen } = data);

	$: if (browser) {
		document.cookie = `showDock=${$showDock}; path=/; max-age=3153600000; samesite=strict`;
	}

	//* Initialize showDock using cookie store
	$: $showDock = dockOpen;

	onMount(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				$authUser = {
					uid: user.uid,
					email: user.email || ''
				};
				// ...
			} else {
				$authUser = undefined;
				goto('/login');
			}
		});
	});
</script>

<main class="flex flex-col h-screen bg-gray-200 text-white">
	<nav
		class="grid grid-cols-[5rem_minmax(0,_auto)_minmax(0,_20rem)] md:grid-cols-[15.5rem_minmax(0,_auto)_minmax(0,_20rem)] min-h-[4.25rem] w-full bg-[#303338] border-b border-gray-500 data-dark:border-[#2A2A2A]"
	>
		<div class={`flex items-center gap-6 px-4 h-full  border-black `}>
			<Button
				variant="ghost"
				on:click={() => ($showDock = !$showDock)}
				class={`p-0 h-12 w-12 rounded-full transition-[background-color,top,right]`}
			>
				<HamburgerIcon class="h-7 w-7" />
			</Button>

			<img width="95" src={Logo} alt="" class="hidden md:block" />
		</div>

		<div class="flex items-center">
			<svelte:component this={$page.data.title} />
		</div>

		<!-- ? For right side action buttons later -->
		<div class="flex items-center gap-6 px-4 h-full" />
	</nav>

	<div
		class={`grid ${
			$showDock
				? 'grid-cols-[15.5rem,_minmax(0,_auto)]'
				: 'grid-cols-[0rem,_minmax(0,_auto)] md:grid-cols-[4.2rem,_minmax(0,_auto)]'
		} h-[calc(100vh-4.25rem)] box-border transition-[grid-template-columns] duration-300 `}
	>
		<Sidebar />

		<slot />
	</div>

	{#if $showLoadingOverlay}
		<div
			class="absolute top-0 bottom-0 left-0 right-0 z-[9999] flex items-center justify-center bg-black/60"
		>
			<span class="loading loading-spinner loading-lg text-accent-2" />
		</div>
	{/if}
</main>
