'use client';


import SearchBar from '../SearchBar/SearchBar';
import CategoryIcons from '../CategoryIcons/CategoryIcons';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero} id="hero-section">
      <video
        className={styles.video}
        src="/videos/hero-video.mp4"
        poster="/images/hero-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.searchContainer}>
          {/* Search Bar */}
          <SearchBar />

          {/* Category Icons */}
          <CategoryIcons />
        </div>
      </div>
    </section>
  );
}
