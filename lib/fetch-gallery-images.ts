import fs from "fs"
import path from "path"

const GALLERY_FOLDERS = ["desktop-background", "mobile-background"] as const
const IMAGE_FILE = /\.(webp|jpe?g|png|gif|avif)$/i

function sortByNumericSuffix(paths: string[]): string[] {
  return [...paths].sort((a, b) => {
    const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || "0", 10)
    const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || "0", 10)
    return numA - numB
  })
}

function readGalleryImagesFromPublic(): string[] {
  const images: string[] = []

  for (const folder of GALLERY_FOLDERS) {
    const dir = path.join(process.cwd(), "public", folder)
    if (!fs.existsSync(dir)) continue

    try {
      const files = fs
        .readdirSync(dir)
        .filter((file) => IMAGE_FILE.test(file))
        .map((file) => `/${folder}/${file}`)

      images.push(...sortByNumericSuffix(files))
    } catch {
      // Missing permissions or unreadable folder — treat as empty.
    }
  }

  return images
}

/** Loads gallery images from public/desktop-background and public/mobile-background only. */
export async function fetchGalleryImages(): Promise<string[]> {
  try {
    return readGalleryImagesFromPublic()
  } catch {
    return []
  }
}
