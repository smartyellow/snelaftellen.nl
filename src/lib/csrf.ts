import { db } from "./mongodb";

export interface CsrfToken {
	_id: string;
	encrypted: string;
	date: Date;
	expires: Date;

	captcha?: string;

	userAgent?: string;
	ipAddress?: string;
};

export interface Session {
	_id: string;
	date: Date;
	expires: Date;

	user: string;

	userAgent?: string;
	ipAddress?: string;
};

const csrfTokens = db.collection<CsrfToken>('csrf');

/** Manage CSRF tokens */
export const csrf = {
	/** Get all tokens */
	async list(): Promise<CsrfToken[]> {
		return await csrfTokens.find().toArray();
	},

	/** Get a token */
	async get(token: string | CsrfToken): Promise<
		(CsrfToken & { expired: boolean; }) | null
	> {
		if (!token) return null;
		if (typeof token === 'object') token = token._id;

		const result = await csrfTokens.findOne({
			_id: token,
		});

		if (!result) return null;

		return {
			...result,
			expired: Date.now() > result.expires.getTime(),
		};
	},

	/** Add a token */
	async add(data: Partial<CsrfToken>): Promise<CsrfToken> {
		const token = crypto.randomUUID();
		const encrypted = Buffer.from(
			[ token, data.captcha ].join('|')
		).toString('base64');

		const newEntry: CsrfToken = {
			...data,
			_id: token,
			encrypted,
			date: new Date(),
			expires: new Date(Date.now() + (10 * 60_000)),
		};

		await csrfTokens.insertOne(newEntry);
		csrf.wipe();
		return newEntry;
	},

	/** Delete a token */
	async invalidate(token: string | CsrfToken): Promise<void> {
		if (typeof token === 'object') {
			token = token._id;
		}

		await csrfTokens.deleteOne({
			_id: token,
		});
	},

	/** Transform an encrypted token to a {@link CsrfToken} object. */
	toObject(encrypted: string): CsrfToken | null {
		if (!encrypted) {
			return null;
		}

		const array = Buffer.from(encrypted, 'base64').toString().split('|');

		return {
			_id: array[0],
			encrypted,
			captcha: array[1],
			date: new Date(),
			expires: new Date(Date.now() + (10 * 60_000)),
		};
	},

	/** Wipe token array, i.e. remove old tokens */
	async wipe(): Promise<void> {
		await csrfTokens.deleteMany({
			date: { $gte: new Date() },
		});
	},
};
