import { libraryOg } from '@/lib/library-og';
export const alt = 'The FrankX Library — books, reading guides, and curated collections';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return libraryOg('Books worth spending time with.', 'Philosophy, spiritual traditions, creative life, and business.', 'Six curated collections');
}
