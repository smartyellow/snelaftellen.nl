import type { PimpOptions } from '$lib/molecules/countdown/helpers';
import type { MoonPhase } from '$lib/molecules/moon/helpers';

/**
 * JSON object that will be sent to the analytics server on a page view.
 *
 * @beta
 *
 * @example Analytics object of a visit to a countdown page compiled to JSON.
 * ```json
 * {
 *   "visitor": {
 *     "ipAddress": "2001:1c03:421d:ea00:f0a6:fb48:4242:ao79"
 *   },
 *   "request": {
 *     "pathName": "/3-januari-2023",
 *     "visitDate": "2022-03-21T14:58:34Z",
 *     "molecule": "countdown"
 *   },
 *   "data": {
 *     "pimpOptions": {
 *       "title": "Verjaardag",
 *       "img": "balloons",
 *       "bg": "#e63b7a"
 *     },
 *     "date": "2023-01-02T23:00:00.000Z"
 *   }
 * }
 * ```
 */
export interface AnalyticsObject {
	/** Visitor information. */
	visitor: {
		/**
		 * IP address of the visitor.
		 *
		 * Can be either in IPv4 or IPv6 format, depending on the visitor's network.
		 */
		ipAddress: string;
	};

	/** Information about the request. */
	request: {
		/**
		 * Page path name.
		 *
		 * This is the value of [`URL.pathname`](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname).
		 */
		pathName: string;

		/**
		 * Timestamp of the visit.
		 *
		 * Will be in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format
		 * when compiled to JSON.
		 */
		visitDate: Date;

		/**
		 * Site molecule (i.e. sort of feature).
		 *
		 * Set to `false` if the page does not belong to a molecule (e.g. the about
		 * page), specify the molecule otherwise.
		 */
		molecule: 'countdown' | 'calendar' | 'moon' | 'seasons' | false;
	};

	/**
	 * Additional data.
	 *
	 * This object can contain whatever data type you like, as long as it is an
	 * object that has nil or more properties or undefined.
	 */
	data?: {
		/** Date (applicable if molecule is `countdown`, `moon` or `calendar`). */
		date?: Date;

		/** Pimp options (applicable if molecule is `calendar`). */
		pimpOptions?: PimpOptions;

		/** Phase of the moon (applicable if molecule is `moon`). */
		moonPhase?: MoonPhase;
	} & Record<string, unknown>;
}
