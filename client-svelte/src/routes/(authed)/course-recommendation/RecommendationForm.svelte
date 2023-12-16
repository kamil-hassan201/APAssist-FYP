<script lang="ts">
	import ChipsContainer from '$/lib/components/Chips/ChipsContainer.svelte';
	import InputWithLabel from '$/lib/components/Input/InputWithLabel.svelte';
	import { chips_data } from '$/lib/statics/chips';
	import type { RecommendationProps } from '$/lib/types';
	import { OverlayScrollbarsComponent } from 'overlayscrollbars-svelte';
	import { isRefresh } from './recommendationStore';

	export let handleFormSubmit: (properties: RecommendationProps) => void;

	let selectedCourse = 'undergraduate';
	let interests = '';
	let careers = '';
	let hobbies = '';
	let others = '';

	const setDefaults = (e: any) => {
		selectedCourse = 'undergraduate';
		interests = '';
		careers = '';
		hobbies = '';
		others = '';
	};

	$: setDefaults($isRefresh);

	const handleInterestChipClick = (chip: string) => {
		interests = interests ? `${interests}, ${chip}` : chip;
	};

	const handleCareerChipClick = (chip: string) => {
		careers = careers ? `${careers}, ${chip}` : chip;
	};

	const handleHobbiesChipClick = (chip: string) => {
		hobbies = hobbies ? `${hobbies}, ${chip}` : chip;
	};

	const handleSubmit = (e: Event) => {
		e.preventDefault();
		const student_profile = `
        Interest/Skills: ${interests}; \n \n
        Career Aspirations: ${careers}; \n \n
        Hobbies/Free time Activities: ${hobbies}; \n
        Important Note: ${others}; \n
      `;
		const properties: RecommendationProps = {
			student_profile,
			student_statement: `Student Said: ${others}`,
			course_type: selectedCourse
		};
		handleFormSubmit(properties);
	};

	const handleCourseChange = (e: Event) => {
		const target = e?.target as HTMLSelectElement;
		selectedCourse = target.value;
	};
</script>

<section
	class="p-6 min-h-0 max-h-screen overflow-hidden text-black flex flex-col h-full min-w-0 rounded-md"
>
	<OverlayScrollbarsComponent
		defer
		options={{
			overflow: {
				x: 'hidden'
			},
			scrollbars: { visibility: 'hidden' }
		}}
		data-pw="chat-window"
		id="chat-window"
		class="grow flex flex-col gap-2 overflow-x-hidden overflow-y-auto [&>[data-overlayscrollbars-contents]]:flex [&>[data-overlayscrollbars-contents]]:flex-col [&>[data-overlayscrollbars-contents]]:gap-6"
	>
		<div class="flex flex-col h-full">
			<form class="flex flex-col h-full justify-between">
				<section class="space-y-4">
					<div>
						<label for="courseType" class="block text-sm font-medium text-gray-700">
							Course Type
						</label>
						<select
							id="courseType"
							name="courseType"
							bind:value={selectedCourse}
							on:change={handleCourseChange}
							class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
						>
							<option value="undergraduate">Bachelor (Undergraduate)</option>
							<option value="masters">Masters</option>
						</select>
					</div>
					<div>
						<InputWithLabel id="interests" label="Interests and Skills" bind:value={interests} />
						<ChipsContainer chips={chips_data.interests} onChipClick={handleInterestChipClick} />
					</div>
					<div>
						<InputWithLabel id="career" label="Career Aspirations" bind:value={careers} />
						<ChipsContainer
							chips={chips_data.career_aspirations}
							onChipClick={handleCareerChipClick}
						/>
					</div>
					<div>
						<InputWithLabel
							id="hobbies"
							label="Hobbies and Freetime Activites"
							bind:value={hobbies}
						/>
						<ChipsContainer chips={chips_data.hobbies} onChipClick={handleHobbiesChipClick} />
					</div>
					<div>
						<InputWithLabel
							id="others"
							label="Important Note (This has a very high weight in your recommendation, If you don't have any, keep it blank)"
							bind:value={others}
						/>
					</div>
				</section>

				<div class="mt-10 pb-6">
					<button
						on:click={handleSubmit}
						disabled={!interests && !hobbies && !careers}
						class={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white   focus:outline-none focus:ring-2 focus:ring-offset-2  ${
							!interests && !hobbies && !careers
								? 'bg-gray-400 hover:bg-gray-400 focus:ring-gray-400 '
								: 'bg-gray-700 hover:bg-gray-900 focus:ring-gray-900'
						}`}
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	</OverlayScrollbarsComponent>
</section>
