'use client';

import css from './page.module.css';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  router.push('/');
  return <h1 className={css.not_found}>No such page exists - 404</h1>;
}
