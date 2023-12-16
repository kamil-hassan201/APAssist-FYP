<script lang="ts">
	import { showDock } from '$/globalStore';
	import { authUser } from '$/lib/authStore';

	import { Button } from '$/lib/components/Button';
	import { firebaseAuth } from '$/lib/firebase/firebase';
	import LogoutIcon from '$/lib/icons/LogoutIcon.svelte';
	import SettingsIcon from '$/lib/icons/SettingsIcon.svelte';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';

	export let username: string | undefined;

	const handleLogout = () => {
		signOut(firebaseAuth)
			.then(() => {
				$authUser = undefined;

				goto('/login');
			})

			.catch((error: any) => {
				console.log(error);
			});
	};
</script>

<div
	class={`flex flex-col gap-2 ${$showDock ? 'p-4' : 'p-3'} pt-5 transition-[padding] duration-300`}
>
	<div
		class={`relative flex ${
			$showDock ? 'gap-4' : 'gap-0'
		} mb-8 w-full text-left rounded-lg transition-[gap] duration-300`}
	>
		<div class="avatar placeholder pointer-events-none select-none">
			<div class="bg-gray-700 rounded-full h-11 w-11 flex items-center justify-center">
				<span class="text-xl text-white uppercase">{username?.charAt(0) || "S"}</span>
			</div>
		</div>

		<div
			class={`grow flex flex-col pr-8 ${
				$showDock ? 'opacity-100 w-full' : 'opacity-0 w-0 pointer-events-none'
			} transition-[opacity,_width] duration-300`}
		>
			<span class="break-all line-clamp-1">{username || "Student"}</span>
			<span class="text-sm">Student</span>
		</div>

		<a
			href="/settings/account"
			class={`absolute top-1/2 -translate-y-1/2 flex justify-center min-w-[1.75rem] ${
				$showDock ? 'right-0 opacity-100' : 'right-1.5 opacity-0 scale-150'
			} transition-[right,opacity,transform]`}
		>
			<SettingsIcon class={`my-auto [&>*]:fill-white/80 data-dark:[&>*]:fill-[#C9C9C9]`} />
		</a>
	</div>

	<Button
		on:click={handleLogout}
		type="submit"
		class={`relative flex w-full ${
			$showDock ? 'gap-2 h-11' : 'gap-0 p-0 h-11 rounded-full'
		} whitespace-nowrap overflow-hidden transition-[background-color,height,gap] duration-300`}
	>
		<LogoutIcon
			class={`absolute min-h-[1.5rem] h-6 min-w-[1.5rem] w-6 ${
				$showDock ? 'left-12' : 'left-[10px]'
			} transition-[left] duration-300`}
		/>
		<span class={`${$showDock ? 'opacity-100' : 'opacity-0 '} transition-opacity duration-300`}>
			Log Out
		</span>
	</Button>
</div>
