import { csrf } from '$lib/csrf';
import type { User } from '$lib/molecules/account/helpers';
import { getSession, getUser, update } from '$lib/molecules/account/server';
import { db } from '$lib/mongodb';
import { parseCookieString } from '$lib/server';
import type { RequestHandler } from './__types/details@profile';

const users = db.collection<User>('users');

export const get: RequestHandler = async ({ clientAddress, request }) => {
	const err = {
		status: 308,
		headers: {
			location: '/account/inloggen',
		},
	};

	const sessionId = parseCookieString(request.headers.get('cookie')).session;
	if (sessionId == '0' || !sessionId) return err;

	const session = await getSession(sessionId);
	if (!session) return err;

	const user = await users.findOne({
		_id: session.user,
	});
	if (!user) return err;
	delete user.hashedPassword;

	const newToken = await csrf.add({
		userAgent: request.headers.get('user-agent').toString(),
		ipAddress: clientAddress,
	});

	return {
		status: 200,
		body: {
			user,
			csrf: newToken.encrypted,
		},
	};
}

export const post: RequestHandler = async ({ clientAddress, request }) => {
	const sessionId = parseCookieString(request.headers.get('cookie')).session;
	if (sessionId == '0' || !sessionId) {
		return { status: 401 };
	}

	const session = await getSession(sessionId);
	const user = await getUser(session.user);
	if (!session) {
		return { status: 401 };
	}

	const data = await request.formData();
	const name = data.get('name')?.toString();
	const password = data.get('password')?.toString();
	const email = data.get('email')?.toString();

	const token = csrf.toObject(data.get('csrf')?.toString());
	const tokenEntry = await csrf.get(token);

	if (!tokenEntry) {
		return { status: 400 };
	}

	const newToken = await csrf.add({
		userAgent: request.headers.get('user-agent').toString(),
		ipAddress: clientAddress,
	});

	const newUser = { name, _id: user._id, email, password };
	console.log(newUser);

	await update(newUser);
	delete newUser.password;

	return {
		status: 200,
		body: {
			csrf: newToken.encrypted,
			user: newUser,
		},
	};
};
