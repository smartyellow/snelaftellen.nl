export interface User {
	_id: string;
	name: string;
	email: string;
	hashedPassword: string;
	lastLogin?: Date;
}

export type LoginError = 'CSRF_ATTEMPT' | 'MISSING_DETAILS' | 'INVALID_CAPTCHA' | 'NOT_FOUND' | 'PASSWORD_MISMATCH';

export const loginErrorMessages = {
	'CSRF_ATTEMPT': 'Je sessie is verlopen. Probeer het opnieuw alsjeblieft.',
	'MISSING_DETAILS': 'Je hebt geen gebruikersnaam en/of wachtwoord ingevuld!',
	'INVALID_CAPTCHA': 'Dat was niet de juiste oplossing van de captcha.',
	'NOT_FOUND': 'Die inloggegevens kennen we niet.',
	'PASSWORD_MISMATCH': 'De wachtwoorden komen niet overeen.',
};
