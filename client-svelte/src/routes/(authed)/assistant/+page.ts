import AssistantTitleBar from './AssistantTitlebar.svelte';

export const load = async ({ parent }) => {
	const queryTypes = [
		{ name: 'Chat', value: 'chat' },
		{ name: 'Simple', value: 'simple' },
		{ name: 'Structured', value: 'structured' }
	];
	await parent();

	return {
		queryTypes: queryTypes,
		title: AssistantTitleBar
	};
};
