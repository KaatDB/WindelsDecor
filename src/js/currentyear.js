const getCurrentYear = () => {
	const currentYear = new Date().getFullYear();

	document.querySelector('.js-current-year').textContent = currentYear;
};

const init = () => {
	getCurrentYear();
};

document.addEventListener('DOMContentLoaded', init);