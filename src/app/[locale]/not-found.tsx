import Link from 'next/link';
import { getDictionary } from '@/i18n/dictionary';

/* not-found.tsx receives no params, so this page uses the default language's words
   alongside English to serve visitors from either version. */
export default function NotFound() {
  const ka = getDictionary('ka').notFound;
  const en = getDictionary('en').notFound;
  return (
    <div style={{ padding: 'var(--section) var(--gutter)' }}>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(6rem, 22vw, 20rem)', lineHeight: 0.9, color: 'var(--wine)' }}>404</p>
      <h1 style={{ marginTop: '2rem', fontSize: 'var(--t-2xl)' }}>{ka.title}</h1>
      <p lang="en" style={{ marginTop: '0.5rem', color: 'var(--muted)' }}>
        {en.title}
      </p>
      <p style={{ marginTop: '2rem' }}>
        <Link href="/ka" className="arrow">
          {ka.back}
        </Link>
      </p>
    </div>
  );
}
