import { setCookie, getCookie } from './cookies.js';

const listenToForm = () => {
	const form = document.querySelector('.js-validate');

	form.addEventListener('input', (e) => {
		const mijnFormData = new FormData(e.target.form);
		const data = Object.fromEntries(mijnFormData.entries());
		console.log(data);
		setCookie('contactForm', JSON.stringify(data), 1);
		return data;
	});
};

const init = () => {
	listenToForm();

	const savedData = getCookie('contactForm');
	console.log(savedData);

	if (savedData) {
		const data = JSON.parse(savedData);

		for (let key in data) {
			const input = document.querySelector(`[name=${key}]`);
			// Alleen als invoerveld bestaat, gaan we verder
			if (input) {
				// data[key] --> data zoeken met die key, zoals bij index (data[0])
				input.value = data[key];
			}
		}
	}
};

document.addEventListener('DOMContentLoaded', init);
