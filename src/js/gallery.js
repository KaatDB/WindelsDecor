import '../scss/_components-gallery.scss';

const GALLERY_JSON_PATH = '/gallery.json';

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

  projects.forEach((project) => {
    // Use each project's cover image as the grid tile.
    // (Swap `project.cover` for `project.images[0].url` etc. if you want
    // a different image per tile, or loop project.images to show every
    // image individually instead of one tile per project.)
    const tile = document.createElement('a');
    tile.className = 'gallery-tile';
    tile.href = `#${project.folder}`; // hook up to a lightbox/detail view later if wanted

    tile.innerHTML = `
      <img src="${project.cover}" alt="${project.title}" loading="lazy" />
      <span class="gallery-tile__title">${project.title}</span>
    `;

    container.appendChild(tile);
  });
}

loadGallery();