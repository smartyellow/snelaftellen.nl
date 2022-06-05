import { getSession, login } from '$lib/molecules/account/server';
import svgCaptcha from 'svg-captcha';
import { csrf } from '$lib/csrf';
import type { RequestHandler } from './__types/inloggen';
import { parseCookieString } from '$lib/server';

export const get: RequestHandler = async ({ clientAddress, request }) => {
	const cookies = parseCookieString(request.headers.get('cookie'));

	if (cookies.session != '0' && await getSession(cookies.session)) {
		return {
			status: 308,
			headers: {
				location: '/account/profiel',
			},
		}
	}

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

export const post: RequestHandler = async ({ clientAddress, request }) => {
	const data = await request.formData();
	const username = data.get('username')?.toString();
	const password = data.get('password')?.toString();
	const captcha = data.get('captcha')?.toString();

	const token = csrf.toObject(data.get('csrf')?.toString());
	const tokenEntry = await csrf.get(token);

	const newCaptcha = svgCaptcha.create();
	const newToken = await csrf.add({
		captcha: newCaptcha.text,
		userAgent: request.headers.get('user-agent').toString(),
		ipAddress: clientAddress,
	});
	const body = {
		captcha: newCaptcha.data,
		csrf: newToken.encrypted,
	};

	if (!tokenEntry || tokenEntry.expired) {
		return {
			status: 400,
			body: {
				...body,
				err: 'CSRF_ATTEMPT',
			},
		};
	}

	csrf.invalidate(token);

	if (!username || !password) {
		return {
			status: 400,
			body: {
				...body,
				err: 'MISSING_DETAILS',
			},
		};
	}

	if (captcha !== token.captcha) {
		return {
			status: 400,
			body: {
				...body,
				err: 'INVALID_CAPTCHA',
			},
		};
	}

	const result = await login(username, password);

	if (result.err) {
		return {
			status: 401,
			body: JSON.parse(JSON.stringify({
				...body,
				...result,
			})),
		};
	}

	const acceptsJSON = request.headers.get('accept') === 'application/json';
	const expires = new Date(Date.now() + (1000 * 60 * 60 * 24 * 4)).toUTCString();

	return {
		status: acceptsJSON ? 200 : 308,
		body: JSON.parse(JSON.stringify({
			...body,
			...result,
		})),
		headers: {
			'set-cookie': `session=${result.session._id}; Path=/; Expires=${expires}`,
			location: acceptsJSON ? '/account/profiel' : null,
		},
	};
}
