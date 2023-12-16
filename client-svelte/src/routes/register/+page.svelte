<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/APAssist.png';
	import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase/firebase';
	import Button from '$/lib/components/Button/Button.svelte';
	import { authUser } from '$/lib/authStore';
	import { onMount } from 'svelte';

	let displayName: string;
	let email: string;
	let password: string;
	let errorMessage: string;

	let success: boolean | undefined = undefined;

	let loading = true;

	const emailRegex = /^[a-zA-Z0-9._-]+@(mail\.)?apu\.edu\.my$/;

	onMount(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			if (user) {
				goto('/');
			} else {
				loading = false;
			}
		});
	});

	const register = () => {
		errorMessage = '';
		if (!emailRegex.test(email)) {
			errorMessage = 'Email is invalid. Please register with a APU email!';
			success = false;
			return;
		}

		createUserWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredential) => {
				$authUser = {
					displayName: '',
					uid: userCredential.user.uid,
					email: userCredential.user.email || ''
				};
				updateProfile(userCredential.user, {
					displayName: displayName
				})
					.then(() => {
						$authUser = {
							displayName: displayName,
							uid: userCredential.user.uid,
							email: userCredential.user.email || ''
						};
					})
					.catch((e) => {
						errorMessage = e.message;
						throw new Error(e.message);
					});
				goto('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				errorMessage = error.message;

				console.log({ errorCode, errorMessage });

				success = false;
			});
	};
</script>

<svelte:head>
	<title>APAssist - Register</title>
</svelte:head>

{#if !loading}
	<form
		class="flex flex-col gap-4 p-8 space-y-4 bg-[#303338] w-1/3 text-black rounded-2xl my-auto mx-auto"
		on:submit|preventDefault={register}
	>
		<img src={logo} class="w-48 mx-auto" alt="APAssist logo" />
		<input
			type="text"
			placeholder="Name"
			class="px-4 py-2 border border-gray-300 rounded-md"
			required
			bind:value={displayName}
		/>
		<input
			type="text"
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
			<p class="text-sm text-red-300">{errorMessage}</p>
		{/if}

		<Button class="rounded-md font-semibold" type="submit">Register</Button>
		<a class="text-center text-white" href="/login"
			>Already have an account? <span class="text-[#ffe766] font-semibold">Login</span></a
		>
	</form>
{/if}
