// Functie om een cookie in te stellen
export const setCookie = function (name, value, days) {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; path=/';
};

// Functie om een cookie op te halen
export const getCookie = function (name) {
	const nameEquals = name + '=';
	const arrCookie = document.cookie.split(';');
	for (let i = 0; i < arrCookie.length; i++) {
		let cookie = arrCookie[i];
		while (cookie.charAt(0) === ' ') {
			cookie = cookie.substring(1);
		}
		if (cookie.indexOf(nameEquals) === 0) {
			return cookie.substring(nameEquals.length, cookie.length);
		}
	}
	return null;
};

// Functie om een cookie te verwijderen
export const eraseCookie = function (name) {
	document.cookie = name + '=; Max-Age=-99999999;';
};

const init = () => {};

document.addEventListener('DOMContentLoaded', init);
