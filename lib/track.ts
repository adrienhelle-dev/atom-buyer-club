// Wrappers typés autour des helpers exposés par public/meta-pixel.js.
// No-op tant que le Pixel n'est pas actif ou côté serveur.

type PixelParams = { content_name?: string };

declare global {
  interface Window {
    atomTrackLead?: (params?: PixelParams) => void;
    atomTrackContact?: (params?: PixelParams) => void;
    atomTrackViewContent?: (params?: PixelParams) => void;
  }
}

/** Clic vers le formulaire lead (join.atombuyerclub.fr) */
export function trackLead(source: string) {
  if (typeof window === "undefined") return;
  window.atomTrackLead?.({ content_name: source });
}

/** Clic vers le groupe WhatsApp */
export function trackContact(source: string) {
  if (typeof window === "undefined") return;
  window.atomTrackContact?.({ content_name: source });
}

/** Clic vers le showroom (réalisations) */
export function trackViewContent(source: string) {
  if (typeof window === "undefined") return;
  window.atomTrackViewContent?.({ content_name: source });
}
