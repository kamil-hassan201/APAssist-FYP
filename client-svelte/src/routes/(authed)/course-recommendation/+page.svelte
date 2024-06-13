<script lang="ts">
	import { isRefresh } from './recommendationStore';
	import type { RecommendationProps } from '$/lib/types';
	import { PUBLIC_BASE_API_URL } from '$env/static/public';
	import RecommendationForm from './RecommendationForm.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import RecommendationChat from './RecommendationChat.svelte';
	import { showLoadingOverlay } from '$/globalStore';
	import { fade } from 'svelte/transition';

	let isFetching: boolean = false;
	let formSubmitted: boolean = false;
	let courseInfo: { rationale: string; top_3_courses: any[] };
	let studentCharacteristics: string;

	const refresh = (e: any) => {
		isFetching = false;
		formSubmitted = false;
		studentCharacteristics = '';
	};

	$: refresh($isRefresh);

	const handleFormSubmit = async (properties: RecommendationProps) => {
		studentCharacteristics = properties?.student_profile;
		console.log('properties', properties);
		try {
			formSubmitted = true;
			isFetching = true;
			const response = await fetch(`${PUBLIC_BASE_API_URL}/recommendation`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(properties)
			});
			if (!response.ok) {
				alert('Response was not ok!');
			}
			if (response.status == 200 && response.body) {
				const result = await response.json();
				courseInfo = result?.data;
			}
		} catch (error: any) {
			alert(`Something went wrong! ${error?.message}`);
		} finally {
			isFetching = false;
		}
	};

	$: $showLoadingOverlay = isFetching;
</script>

<svelte:head>
	<title>APAssist - Recommendation</title>
</svelte:head>

<section
	class="z-[1] flex flex-col gap-2 min-h-0 border-l bg-gray-100 border-[#DDD] overflow-hidden"
>
	<div class="h-full">
		{#if !formSubmitted}
			<RecommendationForm {handleFormSubmit} />
		{:else if isFetching}
			<div class="flex justify-center items-center h-full">
				<Spinner label="Analyzing your data, please wait for a moment!" />
			</div>
		{:else}
			<div in:fade={{ duration: 1000 }}>
				<div class="grid h-[calc(100vh-4.25rem)]">
					<RecommendationChat {studentCharacteristics} {courseInfo} />
				</div>
			</div>
		{/if}
	</div>
</section>
