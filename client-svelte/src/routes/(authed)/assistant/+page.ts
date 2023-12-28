import AssistantTitleBar from './AssistantTitlebar.svelte';

export const load = async ({ parent }) => {
	await parent();

	return {
		title: AssistantTitleBar
	};
};
