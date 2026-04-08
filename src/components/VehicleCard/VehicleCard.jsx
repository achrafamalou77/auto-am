'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/utils/formatPrice';
import styles from './VehicleCard.module.css';

export default function VehicleCard({ vehicle, featured = false }) {
  return (
    <Link
      href={`/inventory/${vehicle.id}`}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      id={`vehicle-card-${vehicle.id}`}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        <Image
          src={vehicle.images?.[0] || '/images/cars/placeholder.jpg'}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          style={{ objectFit: 'cover' }}
          className={styles.image}
        />

        {/* Favorite */}
        <button className={styles.favorite} aria-label="Ajouter aux favoris" onClick={(e) => e.preventDefault()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        {/* Image Count */}
        <div className={styles.imgCount}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
          </svg>
          {vehicle.images?.length || 0}
        </div>

        {/* Featured ribbon */}
        {vehicle.featured && (
          <div className={styles.ribbon}>
            <span>En vedette</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={styles.info}>
        <h3 className={styles.title}>
          {vehicle.make} {vehicle.model} {vehicle.doors > 0 ? `${vehicle.doors}-portes` : ''} {vehicle.bodyType.toLowerCase()} {vehicle.color.toLowerCase()}
        </h3>
        <p className={styles.price}>{formatPrice(vehicle.price)}</p>
        <div className={styles.meta}>
          <span className={styles.yearBadge}>{vehicle.year}</span>
          <span className={styles.metaItem}>{vehicle.transmission}</span>
          <span className={styles.metaItem}>{vehicle.fuel}</span>
        </div>
      </div>
    </Link>
  );
}
