import tippy from 'tippy.js';

export type TooltipOptions = {
	content?: string;
};

export default function tooltip(node: HTMLElement, params?: TooltipOptions): {
	/** Ran on component update */ update: (newParams: any) => void,
	/** Ran when component is destroyed */destroy: () => void
} {
	// https://dev.to/danawoodman/svelte-quick-tip-using-actions-to-integrate-with-javascript-libraries-tippy-tooltips-2m94

	const label = node.getAttribute("aria-label");
	const content = params?.content || node.title || node.getAttribute("aria-label");
	if (!label) node.setAttribute("aria-label", content);
  	node.title = "";
  	const tip = tippy(node, { content, ...params });

	return {
		update: newParams => tip.setProps({ content, ...newParams }),
		destroy: () => tip.destroy(),
	};
};
