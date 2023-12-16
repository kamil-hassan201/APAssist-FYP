export function clickOutside(node: Node, callbackFunction: (e: MouseEvent) => void) {
	const onClick = (event: MouseEvent) => {
		if (!node.contains(event.target as Node)) callbackFunction(event);
	};

	document.body.addEventListener('click', onClick);

	return {
		update(newCallbackFunction: VoidFunction) {
			callbackFunction = newCallbackFunction;
		},
		destroy() {
			document.body.removeEventListener('click', onClick);
		}
	};
}
