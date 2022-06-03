import type { Session } from "$lib/csrf";
import { db } from "$lib/mongodb";
import { compare, hash } from 'bcrypt';
import type { User } from "./helpers";

const users = db.collection<User>('users');
const sessions = db.collection<Session>('sessions');

export async function getUser(id: string): Promise<User> {
	return await users.findOne({ _id: id });
}


export async function login(
	username: string,
	password: string
): Promise<{
	err?: string;
	user?: User,
	session?: Session,
}> {
	const user = await users.findOne({
		_id: username,
	});

	if (!user) {
		return {
			err: 'NOT_FOUND',
		};
	}

	const passwordsMatch = await compare(password, user.hashedPassword);

	if (!passwordsMatch) {
		return {
			err: 'PASSWORD_INCORRECT',
		};
	}

	await users.updateOne(
		{ _id: user._id },
		{ $set: { lastVisit: new Date() } }
	);

	const session: Session = {
		_id: crypto.randomUUID(),
		date: new Date(),
		expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 4)),
		user: user._id,
	};

	await sessions.insertOne(session);
	delete user.hashedPassword;

	return {
		user,
		session,
	};
}

export async function register({ name, username, email, password }): Promise<{ err?: string; }> {
	const hashedPassword = await hash(password, 12);
	const user = await users.insertOne({
		_id: username,
		name,
		email,
		hashedPassword,
	});

	if (!user.acknowledged) {
		return {
			err: 'INTERNAL_ERROR',
		};
	}
}

export async function update({ name, _id, email, password }): Promise<{ err?: string; }> {
	const hashedPassword = await hash(password, 12);
	const existingUser = await users.findOne({ _id });

	const user = await users.updateOne({ _id }, { $set: {
		...existingUser,
		name,
		email,
		hashedPassword,
	}});

	if (!user.acknowledged) {
		return {
			err: 'INTERNAL_ERROR',
		};
	}
}

export async function getSession(id: string): Promise<Session> {
	return await sessions.findOne({ _id: id });
}
