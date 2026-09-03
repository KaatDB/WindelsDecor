// Calls the Cloudinary Admin API server-side (inside GitHub Actions, never
// in the browser) and writes a static public/gallery.json that the site fetches.
//
// Folder structure convention on Cloudinary:
//   gallery/<project-folder>/<image files>
// The painter creates one subfolder per project. The folder name becomes the
// project title unless an image has a "context" field called "title" set,
// in which case that overrides it (handy for nicer display names later).

const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
const API_SECRET = process.env.CLOUDINARY_API_SECRET;

const AUTH = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');
const BASE_URL = 'https://api.cloudinary.com/v1_1';
const ROOT_FOLDER = 'gallery'; // change if you use a different root folder name

async function cloudinaryFetch(path) {
  const res = await fetch(`${BASE_URL}/${CLOUD_NAME}${path}`, {
    headers: { Authorization: `Basic ${AUTH}` },
  });
  if (!res.ok) {
    throw new Error(`Cloudinary API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

function toTitle(folderName) {
  // "old-harbour-series" -> "Old Harbour Series"
  return folderName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  if (!CLOUD_NAME || !API_KEY || !API_SECRET) {
    throw new Error('Missing Cloudinary credentials in environment variables.');
  }

  // 1. List all subfolders inside the root gallery folder
  const { folders } = await cloudinaryFetch(`/folders/${ROOT_FOLDER}`);

  const projects = [];

  for (const folder of folders) {
    // 2. List all images inside each project subfolder
    const { resources } = await cloudinaryFetch(
      `/resources/image?type=upload&prefix=${encodeURIComponent(folder.path)}/&max_results=100`
    );

    const images = resources.map((r) => ({
      url: r.secure_url,
      width: r.width,
      height: r.height,
      publicId: r.public_id,
    }));

    if (images.length === 0) continue; // skip empty folders

    projects.push({
      title: toTitle(folder.name),
      folder: folder.path,
      cover: images[0].url,
      images,
    });
  }

  const fs = await import('node:fs/promises');
  await fs.mkdir('public', { recursive: true });
  await fs.writeFile('public/gallery.json', JSON.stringify({ projects }, null, 2));

  console.log(`Wrote ${projects.length} project(s) to public/gallery.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
