'use client';

import Link from 'next/link';
import styles from './CategoryIcons.module.css';

const categories = [
  {
    name: 'Berline',
    href: '/inventaire?type=Berline',
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 40h48M12 40l4-12h32l4 12M16 28l2-8h28l2 8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="44" r="4"/>
        <circle cx="46" cy="44" r="4"/>
        <path d="M22 44h20" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'SUV',
    href: '/inventaire?type=SUV',
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 42h52M10 42l2-10h40l2 10M14 32V22h36v10" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="46" r="4"/>
        <circle cx="46" cy="46" r="4"/>
        <path d="M22 46h20" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Coupé',
    href: '/inventaire?type=Coupé',
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 40h48M12 40l6-14h20l10 14M18 26l4-6h14l6 6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="44" r="4"/>
        <circle cx="46" cy="44" r="4"/>
        <path d="M22 44h20" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Citadine',
    href: '/inventaire?type=Citadine',
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 40h44M14 40l4-10h28l4 10M18 30l2-6h24l2 6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="44" r="4"/>
        <circle cx="44" cy="44" r="4"/>
        <path d="M24 44h16" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Cabriolet',
    href: '/inventaire?type=Cabriolet',
    icon: (
      <svg width="40" height="40" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 40h48M12 40l6-12h28l6 12M18 28c4-4 24-4 28 0" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="44" r="4"/>
        <circle cx="46" cy="44" r="4"/>
        <path d="M22 44h20" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function CategoryIcons() {
  return (
    <div className={styles.wrapper} id="category-icons">
      {categories.map((cat) => (
        <Link key={cat.name} href={cat.href} className={styles.item} aria-label={cat.name}>
          <div className={styles.iconCircle}>{cat.icon}</div>
          <span className={styles.label}>{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
