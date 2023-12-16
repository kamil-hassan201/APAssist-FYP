<script lang="ts">
	import { authUser } from '$/lib/authStore';
	import logo from '$lib/assets/APAssist.png';
	import Button from '$/lib/components/Button/Button.svelte';
	import { goto } from '$app/navigation';
	import { updateProfile } from 'firebase/auth';
	import { firebaseAuth } from '$/lib/firebase/firebase';
	let name = $authUser?.displayName;
	let uid = $authUser?.uid;
	let email = $authUser?.email;

	let isLoading: boolean = false;

	const handleEdit = () => {
		isLoading = true;
		if (name === $authUser) {
			goto('/settings/account');
			return;
		}
		if (name?.length === 0) {
			alert('Name cannot be empty!');
			isLoading = false;
			return;
		}
		const user = firebaseAuth.currentUser;
		if (user) {
			updateProfile(user, {
				displayName: name
			})
				.then(() => {
					$authUser = {
						uid: $authUser?.uid || '',
						email: $authUser?.email || '',
						displayName: name || ''
					};
					goto('/settings/account');
				})
				.catch((e) => {
					console.log(e.errorMessage);
					alert('Something went wrong, please try again later!');
				})
				.finally(() => {
					isLoading = false;
				});
		} else {
			alert('Something went wrong, please try again later!');
			isLoading = false;
		}
	};
</script>

<svelte:head>
	<title>APAssist - Edit Profile</title>
</svelte:head>

<section
	class="flex flex-col gap-4 p-8 space-y-2 bg-[#303338] w-1/3 text-black rounded-2xl my-auto mx-auto"
>
	<img src={logo} class="w-48 mx-auto" alt="APAssist logo" />
	<!-- <p class="px-4 py-2 border border-gray-300 rounded-md">Name: {user?.displayName}</p> -->
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<div class="space-y-2">
		<label class="text-white text-sm">User ID: </label>
		<input
			readonly
			disabled
			type="text"
			placeholder="UID"
			class="px-4 py-2 border border-gray-300 rounded-md w-full text-white"
			required
			bind:value={uid}
		/>
	</div>
	<div class="space-y-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="text-white text-sm">Name: </label>
		<input
			type="text"
			placeholder="Name"
			class="px-4 py-2 border border-gray-300 rounded-md w-full"
			required
			bind:value={name}
		/>
	</div>
	<div class="space-y-2">
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label class="text-white text-sm">Email: </label>
		<input
			readonly
			disabled
			type="text"
			placeholder="Email"
			class="px-4 py-2 border border-gray-300 rounded-md w-full text-white"
			required
			bind:value={email}
		/>
	</div>

	<Button disabled={isLoading} on:click={handleEdit} class="rounded-md font-semibold" type="submit"
		>Save</Button
	>
</section>
