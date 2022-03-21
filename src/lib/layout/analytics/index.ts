import type { AnalyticsObject } from "./types";

/**
 * Class for managing analytics from the frontend.
 *
 * @todo
 * @beta
 */
export class Analytics {
	/** The analytics passed to this class. */
	private analytics: AnalyticsObject;

	/**
	 * Create a new instance.
	 *
	 * @param analytics Object containing analytics data.
	 * @returns This.
	 */
	constructor(analytics: AnalyticsObject) {
		this.analytics = analytics;
		return this;
	}

	/**
	 * Get the currently set analytics.
	 *
	 * @returns Analytics that are currently set.
	 */
	getAnalytics(): AnalyticsObject {
		return this.analytics;
	}

	/**
	 * Overwrites the currently set analytics object.
	 *
	 * @param analytics Analytics to set.
	 * @returns This.
	 */
	setAnalytics(analytics: AnalyticsObject): this {
		this.analytics = analytics;
		return this;
	}

	/**
	 * Send the analytics to the server.
	 *
	 * @todo
	 *
	 * @param analytics Object containing analytics data. The method will use
	 *                  `this.analytics` if this parameter is not passed.
	 * @returns Response.
	 */
	send(analytics?: AnalyticsObject) {
		// TODO: implement
	}
}
