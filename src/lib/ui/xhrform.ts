import { loading } from "$lib/helpers";

export type XhrFormCallback = ({
	response: Response,
	text: string,
	form: HTMLFormElement,
}) => void;

export default function xhrForm(form: HTMLFormElement, {
	onDone, onSuccess, onError,
}: {
	onDone: XhrFormCallback,
	onSuccess: XhrFormCallback,
	onError: XhrFormCallback,
}) {
	async function listener(evt: InputEvent) {
		evt.preventDefault();
		loading.set(true);

		const request = new Request(form.action, {
			method: form.method,
			body: new FormData(form),
			headers: {
				accept: 'application/json',
			},
		});

		const response = await fetch(request);
		const param = {
			response,
			text: await response.text(),
			form,
		};

		onDone(param);
		if (response.ok) onSuccess(param);
		else onError(param);

		loading.set(false);
	}

	form.addEventListener('submit', listener);
	return {
		destroy() {
			form.removeEventListener('submit', listener);
		},
	};
}
