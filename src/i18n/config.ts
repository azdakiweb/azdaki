export const locales = ['ka', 'en'] as const;
export type Locale = (typeof locales)[number];

export const isLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value);

/** A value translated into every site language. */
export type L = Record<Locale, string>;

export const formatDate = (iso: string, locale: Locale) => {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  const month = MONTHS[locale][d.getUTCMonth()];
  return locale === 'ka' ? `${day} ${month}, ${year}` : `${day} ${month} ${year}`;
};

export const formatTime = (iso: string) => iso.slice(11, 16);

const MONTHS: Record<Locale, string[]> = {
  ka: ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
