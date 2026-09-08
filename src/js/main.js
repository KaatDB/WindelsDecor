// Import our custom CSS
import '../scss/styles.scss';

// Import own JS
import './gallery.js'
import './formvalidation.js'
import './formsave.js'
import './cookies.js'

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap';

// Dynamically render galleries for folders named `Project-*` inside `src/assets`
// try {
// 	const images = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg}', { eager: true, as: 'url' });

// 	const projects = {};
// 	for (const path in images) {
// 		const url = images[path];
// 		// path looks like '../assets/Project-X/image.jpg'
// 		const rel = path.replace('../assets/', '');
// 		const parts = rel.split('/');
// 		if (parts.length < 2) continue;
// 		const folder = parts[0];
// 		if (!folder.startsWith('Project')) continue;
// 		projects[folder] = projects[folder] || [];
// 		projects[folder].push({ file: parts.slice(1).join('/'), url });
// 	}

// 	const container = document.getElementById('projects');
// 	if (container) {
// 		Object.keys(projects)
// 			.sort()
// 			.forEach((name) => {
// 				const projectEl = document.createElement('section');
// 				projectEl.className = 'project';
// 				const h = document.createElement('h3');
// 				projectEl.appendChild(h);
// 				const gallery = document.createElement('div');
// 				gallery.className = 'row';
// 				projects[name].forEach((img) => {
// 					const itemWrap = document.createElement('div');
// 					itemWrap.className = 'project-item c-realisaties__item col-lg-6';

// 					const imgEl = document.createElement('img');
// 					imgEl.src = img.url;
// 					imgEl.alt = img.file;
// 					imgEl.className = 'project-photo';

// 					const overlay = document.createElement('div');
// 					overlay.className = 'project-overlay';
// 					const overlayTitle = document.createElement('span');
// 					overlayTitle.className = 'project-overlay__title';
// 					overlayTitle.textContent = name;
// 					overlay.appendChild(overlayTitle);

// 					itemWrap.appendChild(imgEl);
// 					itemWrap.appendChild(overlay);
// 					gallery.appendChild(itemWrap);
// 				});
// 				projectEl.appendChild(gallery);
// 				container.appendChild(projectEl);
// 			});
// 	}
// } catch (e) {
// 	// import.meta.glob may not be supported in some contexts; silently fail and log for debugging
// 	console.error('Error loading project images', e);
// }
