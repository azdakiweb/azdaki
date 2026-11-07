import { notFound } from 'next/navigation';

/* Sends unknown paths inside a language to the styled 404 page. */
export default function CatchAll() {
  notFound();
}
