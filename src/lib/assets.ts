import heroWorkshopImg from '../assets/images/hero_universo_workshop_1794337808698.jpg';
import planterImg from '../assets/images/product_geometric_planter_1794337809850.jpg';
import lampImg from '../assets/images/product_voronoi_lamp_1794337809984.jpg';
import dragonImg from '../assets/images/product_mechanical_dragon_1794337810599.jpg';

export { heroWorkshopImg, planterImg, lampImg, dragonImg };

/**
 * Resolves product image URLs cleanly for both local Vite development and Vercel production builds.
 * Converts any hardcoded /src/assets paths or handles external/public URLs.
 */
export function resolveProductImage(url: string | null | undefined): string {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return planterImg;
  }

  // If it references the local generated images, return the bundled Vite hashed asset
  if (url.includes('hero_universo_workshop') || url.includes('hero_workshop')) {
    return heroWorkshopImg;
  }
  if (url.includes('geometric_planter') || url.includes('planter') || url.includes('maceta')) {
    return planterImg;
  }
  if (url.includes('voronoi_lamp') || url.includes('lamp') || url.includes('lampara')) {
    return lampImg;
  }
  if (url.includes('mechanical_dragon') || url.includes('dragon')) {
    return dragonImg;
  }

  // If it's an external URL (Supabase storage, Cloudinary, Imgur, etc.) or in /images/ public folder
  return url;
}
