import { eraseCookie } from './cookies';

const validateForm = () => {
	const form = document.querySelector('.js-validate');
	const submit = document.querySelector('.js-submit-btn');

	submit.addEventListener('click', (e) => {
		e.preventDefault();
		if (form.checkValidity()) {
			form.classList.add('u-hide');
			document.querySelector('.js-submit-animation').classList.remove('u-hide');
			eraseCookie('contactForm');
		}
		form.classList.add('was-validated');
	});
};

const init = () => {
	validateForm();
};

document.addEventListener('DOMContentLoaded', init);
