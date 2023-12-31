<script lang="ts">
	import { showLoadingOverlay } from '$/globalStore';
	import { authUser } from '$/lib/authStore';
	import Button from '$/lib/components/Button/Button.svelte';
	import { firebaseAuth } from '$/lib/firebase/firebase';
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/APAssist.png';
	import {
		browserLocalPersistence,
		onAuthStateChanged,
		setPersistence,
		signInWithEmailAndPassword
	} from 'firebase/auth';
	import { onMount } from 'svelte';

	let email: string;
	let password: string;
	let success: boolean | undefined;
	let errorMessage: string;

	let loading = true;

	onMount(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				goto('/');
			} else {
				loading = false;
			}
		});
	});

	const login = () => {
		$showLoadingOverlay = true;
		setPersistence(firebaseAuth, browserLocalPersistence)
			.then(() => {
				return signInWithEmailAndPassword(firebaseAuth, email, password);
			})

			.then((userCredential) => {
				$authUser = {
					displayName: userCredential.user?.displayName || '',
					uid: userCredential.user.uid,
					email: userCredential.user.email || ''
				};
				$showLoadingOverlay = false;
				goto('/');
			})
			.catch((error) => {
				errorMessage = error.message;
				success = false;
			});
	};
</script>

<svelte:head>
	<title>APAssist - Login</title>
</svelte:head>

{#if !loading}
	<form
		class="flex flex-col gap-4 p-8 space-y-4 bg-[#303338] w-1/3 text-black rounded-2xl my-auto mx-auto"
		on:submit|preventDefault={login}
	>
		<img src={logo} class="w-48 mx-auto" alt="APAssist logo" />

		<input
			type="email"
			placeholder="Email"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={email}
		/>
		<input
			type="password"
			placeholder="Password"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={password}
		/>

		{#if !success && success !== undefined}
			<p class="text-sm text-red-300">Wrong email or password. Please check your credentials!</p>
		{/if}

		<Button class="rounded-md  font-semibold" type="submit">Login</Button>
		<a class="text-center text-white" href="/register"
			>Don't have an account? <span class="text-[#ffe766] font-semibold">Register</span></a
		>
	</form>
{/if}
