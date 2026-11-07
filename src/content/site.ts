import type { SiteSettings } from './types';

/* STAND-INS: phone, email, address, social links and the map pin. */
export const site: SiteSettings = {
  address: { ka: 'თბილისი, საქართველო (ზუსტი მისამართი დაემატება)', en: 'Tbilisi, Georgia (exact address to be added)' },
  phone: '+995 000 00 00 00',
  email: 'info@example.ge',
  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/' },
    { label: 'Instagram', url: 'https://www.instagram.com/' },
    { label: 'TikTok', url: 'https://www.tiktok.com/' },
  ],
  // Replace the coordinates with the theatre's pin. This Google Maps embed needs no API key.
  mapEmbed: 'https://www.google.com/maps?q=41.70,44.80&z=15&hl=ka&output=embed',
  mapLink: 'https://www.google.com/maps?q=41.70,44.80',
};
