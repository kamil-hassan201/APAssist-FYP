export const load = async ({ cookies }) => {
	return {
		dockOpen: cookies.get('showDock') == 'true'
	};
};
