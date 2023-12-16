<script lang="ts">
	import { authUser } from '$/lib/authStore';
	import { firebaseAuth } from '$/lib/firebase/firebase';
	import { goto } from '$app/navigation';
	import {
		browserLocalPersistence,
		setPersistence,
		signInWithEmailAndPassword
	} from 'firebase/auth';

	let email: string;
	let password: string;
	let success: boolean | undefined;
	let errorMessage: string;

	const login = () => {
		setPersistence(firebaseAuth, browserLocalPersistence)
			.then(() => {
				return signInWithEmailAndPassword(firebaseAuth, email, password);
			})

			.then((userCredential) => {
				$authUser = {
					uid: userCredential.user.uid,
					email: userCredential.user.email || ''
				};

				goto('/');
			})
			.catch((error) => {
				errorMessage = error.message;

				success = false;
			});
	};
</script>

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-white sm:w-10/12 text-black"
	on:submit|preventDefault={login}
>
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
		<div class="p-8 text-red-500 bg-red-100">
			<p>There was an error signing in. Please try again</p>
			<p class="text-sm">{errorMessage}</p>
		</div>
	{/if}

	<button type="submit" class="default-action bg-black py-2 rounded-lg text-white">Login</button>
</form>
