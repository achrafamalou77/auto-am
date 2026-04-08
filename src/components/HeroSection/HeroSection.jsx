'use client';

import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import CategoryIcons from '../CategoryIcons/CategoryIcons';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <section className={styles.hero} id="hero-section">
      {/* Background — uses poster image; replace with <video> when MP4 is available */}
      <img
        className={styles.video}
        src="/images/hero-poster.jpg"
        alt=""
        aria-hidden="true"
      />
      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.headline}>
          Trouvez Votre Véhicule{' '}
          <span className={styles.accent}>Parfait</span>
        </h1>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tous
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'new' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('new')}
          >
            Neuf
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'used' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('used')}
          >
            Occasion
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar />

        {/* Category Icons */}
        <CategoryIcons />
      </div>
    </section>
  );
}
