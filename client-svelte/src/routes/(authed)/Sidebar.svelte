<script lang="ts">
	import RecommendationIcon from '$lib/icons/RecommendationIcon.svelte';
	import Logo from '$lib/assets/APAssist.png';
	import { showDock } from '$/globalStore';
	import { page } from '$app/stores';
	import AssistantIcon from '$/lib/icons/AssistantIcon.svelte';
	import UserDetails from './UserDetails.svelte';
	import { authUser } from '$lib/authStore';

	const links = [
		{
			title: 'Assistant',
			href: '/assistant',
			Icon: AssistantIcon
		},
		{
			title: 'Course Recommendation',
			href: '/course-recommendation',
			Icon: RecommendationIcon
		}
	];

	let tabHighlightPos = '';
	$: {
		const index = links.findIndex((item) => $page.url.pathname.startsWith(item.href));
		tabHighlightPos = index >= 0 ? `top:${index * 3}rem;` : 'display:none;';
	}
</script>

<section class="z-50">
	<div
		class="flex flex-col pt-3 pb-2 h-full bg-[#303338] data-dark:bg-[#303338] border-r border-[#DDD] data-dark:border-[#2A2A2A] overflow-hidden transition-[border-radius] duration-500"
	>
		<div class="block md:hidden px-6 py-4">
			<img width="116" src={Logo} alt="" />
		</div>

		<div class="relative flex flex-col grow pb-2 transition-[padding,margin] duration-300">
			{#each links as { title, href, Icon } (href)}
				<a
					{title}
					{href}
					class={`relative flex items-center h-12 w-full ${
						$showDock ? 'gap-2 px-4 py-3' : 'gap-0 p-3'
					} ${
						$page.url.pathname.startsWith(href) && 'bg-slate-600'
					} hover:bg-slate-500 data-dark:hover:bg-white/[0.04] text-[#666] data-dark:text-white whitespace-nowrap transition-all`}
				>
					<Icon
						class={`absolute ${
							$showDock
								? 'left-4 h-5 min-h-[1.25rem] w-5 min-w-[1.25rem]'
								: 'left-1/2 -translate-x-1/2 h-6 min-h-[1.5rem] w-6 min-w-[1.5rem] delay-150'
						} transition-all duration-150 [&_path]:stroke-[1.5] text-white
						}`}
					/>
					<span
						class={`absolute text-white ${
							$showDock ? 'left-12 opacity-100' : 'left-0 opacity-0 pointer-events-none'
						} text-sm transition-[opacity,left] duration-150`}
					>
						{title}
					</span>
				</a>
			{/each}

			<!-- Highlighter -->
			<div style={tabHighlightPos} class="absolute left-0 h-12 w-1 bg-accent-2 transition-[top]" />
		</div>

		<hr class="border-[#DDD] data-dark:border-[#454545]" />

		<UserDetails username={$authUser?.displayName} />
	</div>
</section>
