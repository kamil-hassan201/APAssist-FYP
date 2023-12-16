<script lang="ts">
	import { authUser } from '$/lib/authStore';
	import logo from '$lib/assets/APAssist.png';
	import Button from '$/lib/components/Button/Button.svelte';
	import { goto } from '$app/navigation';
	let name = $authUser?.displayName;
	let uid = $authUser?.uid;
	let email = $authUser?.email;
</script>

<svelte:head>
	<title>APAssist - Account</title>
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
			readonly
			disabled
			type="text"
			placeholder="Name"
			class="px-4 py-2 border border-gray-300 rounded-md w-full text-white"
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

	<Button
		on:click={() => {
			goto('/settings/account/edit');
		}}
		class="rounded-md font-semibold"
		type="submit">Edit</Button
	>
</section>
