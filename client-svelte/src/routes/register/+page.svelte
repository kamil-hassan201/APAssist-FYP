<script lang="ts">
	import { goto } from '$app/navigation';

	import { createUserWithEmailAndPassword } from 'firebase/auth';
	import { firebaseAuth } from '$lib/firebase/firebase';

	let email: string;
	let password: string;
	let errorMessage: string;

	let success: boolean | undefined = undefined;

	const register = () => {
		createUserWithEmailAndPassword(firebaseAuth, email, password)
			.then((userCredentials) => {
				goto('/login');
			})
			.catch((error) => {
				const errorCode = error.code;
				errorMessage = error.message;

				console.log({ errorCode, errorMessage });

				alert('Something went wrong while registering!');
				success = false;
			});
	};
</script>

<form
	class="flex flex-col gap-4 p-8 space-y-4 bg-gray-600 text-black sm:w-10/12"
	on:submit|preventDefault={register}
>
	{#if !success && success !== undefined}
		<div class="p-8 text-red-500 bg-red-100">
			<p>There was an error registering. Please try again</p>
			<p class="text-sm">{errorMessage}</p>
		</div>
	{/if}

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

	<button type="submit" class="default-action bg-black py-2 rounded-lg text-white">Register</button>
</form>
