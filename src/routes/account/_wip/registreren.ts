import { register } from '$lib/molecules/account/server';
import svgCaptcha from 'svg-captcha';
import { csrf } from '$lib/csrf';
import type { RequestHandler } from './__types/registreren';

export const get: RequestHandler = async ({ request, clientAddress }) => {
	const captcha = svgCaptcha.create();
	const token = await csrf.add({
		captcha: captcha.text,
		userAgent: request.headers.get('user-agent').toString(),
		ipAddress: clientAddress,
	});

	return {
		status: 200,
		body: {
			captcha: captcha.data,
			csrf: token.encrypted,
		},
	};
}

export const post: RequestHandler = async ({ request }) => {
	const data = await request.formData();
	const captcha = data.get('captcha')?.toString();
	const input = {
		name: data.get('name')?.toString(),
		username: data.get('username')?.toString(),
		email: data.get('email')?.toString(),
	}
	const password = data.get('password')?.toString();
	const password2 = data.get('password2')?.toString();

	const token = csrf.toObject(data.get('csrf')?.toString());
	const tokenEntry = await csrf.get(token);

	if (!tokenEntry || tokenEntry.expired) {
		return {
			status: 400,
			body: {
				err: 'CSRF_ATTEMPT',
				input,
			},
		};
	}

	csrf.invalidate(token);

	if (!input.username || !password || !password2 || !input.name || !input.email) {
		return {
			status: 400,
			body: {
				err: 'MISSING_DETAILS',
				input,
			},
		};
	}

	if (password !== password2) {
		return {
			status: 400,
			body: {
				err: 'PASSWORD_MISMATCH',
				input,
			},
		};
	}

	if (captcha !== (await csrf.get(token))?.captcha) {
		return {
			status: 400,
			body: {
				err: 'INVALID_CAPTCHA',
				input,
			},
		};
	}

	const user = await register({
		...input,
		password,
	});

	if (user?.err) {
		return {
			status: 401,
			body: {
				err: user.err,
				input,
			},
		};
	}

	return {
		status: 200,
	};
}
