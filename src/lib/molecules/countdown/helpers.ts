import type { Visibility } from "$lib/helpers";
import type { PimpOptions } from "./pimp/helpers";

export interface Countdown {
	_id?: string;
	user?: string;
	visibility?: Visibility;

	title?: string;
	countTo: Date;
	pimpOptions: PimpOptions;
}
