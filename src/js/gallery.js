import '../scss/_components-gallery.scss';

// import.meta.env.BASE_URL automatically resolves to Vite's configured `base`
// (e.g. '/WindelsDecor/'), so this works correctly both in dev and once
// deployed to GitHub Pages under a repo subpath.
const GALLERY_JSON_PATH = `${import.meta.env.BASE_URL}gallery.json`;

async function loadGallery() {
	const container = document.querySelector('#gallery');
	if (!container) return;

	try {
		const res = await fetch(GALLERY_JSON_PATH, { cache: 'no-store' });
		const { projects } = await res.json();
		renderGallery(container, projects);
	} catch (err) {
		console.error('Failed to load gallery:', err);
		container.innerHTML = '<p class="gallery-error">Gallery is temporarily unavailable.</p>';
	}
}

function renderGallery(container, projects) {
	container.innerHTML = '';

	const allImages = [];
	projects.forEach((project) => {
		project.images.forEach((image) => {
			allImages.push({ url: image.url, title: project.title });
		});
	});

	allImages.forEach((image, index) => {
		const tile = document.createElement('button');
		tile.type = 'button';
		tile.className = 'gallery-tile';

		tile.innerHTML = `
      <img src="${image.url}" alt="${image.title}" loading="lazy" />
      <span class="gallery-tile__title">${image.title}</span>
    `;

		tile.addEventListener('click', () => openLightbox(allImages, index));
		container.appendChild(tile);
	});
}

function openLightbox(images, startIndex) {
	let currentIndex = startIndex;

	const overlay = document.createElement('div');
	overlay.className = 'lightbox-overlay';
	overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close">&times;</button>
    <button class="lightbox-prev" aria-label="Previous image">&#10094;</button>
    <img class="lightbox-image" src="" alt="" />
    <span class="lightbox-title"></span>
    <button class="lightbox-next" aria-label="Next image">&#10095;</button>
  `;
	document.body.appendChild(overlay);
	document.body.style.overflow = 'hidden'; // prevent background scroll while open

	const imgEl = overlay.querySelector('.lightbox-image');
	const titleEl = overlay.querySelector('.lightbox-title');

	function show(index) {
		currentIndex = (index + images.length) % images.length; // wrap around
		const image = images[currentIndex];
		imgEl.src = image.url;
		imgEl.alt = image.title;
		titleEl.textContent = image.title;
	}

	function close() {
		document.body.style.overflow = '';
		document.removeEventListener('keydown', onKeydown);
		overlay.remove();
	}

	function onKeydown(e) {
		if (e.key === 'Escape') close();
		if (e.key === 'ArrowRight') show(currentIndex + 1);
		if (e.key === 'ArrowLeft') show(currentIndex - 1);
	}

	overlay.querySelector('.lightbox-close').addEventListener('click', close);
	overlay.querySelector('.lightbox-prev').addEventListener('click', () => show(currentIndex - 1));
	overlay.querySelector('.lightbox-next').addEventListener('click', () => show(currentIndex + 1));

	// Click on the dark backdrop (but not the image itself) also closes it
	overlay.addEventListener('click', (e) => {
		if (e.target === overlay) close();
	});

	document.addEventListener('keydown', onKeydown);

	show(startIndex);
}

loadGallery();
