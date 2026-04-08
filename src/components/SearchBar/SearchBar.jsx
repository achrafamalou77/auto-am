'use client';

import { useState } from 'react';
import { makes, modelsByMake, priceRanges } from '@/utils/mockData';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  const models = selectedMake ? modelsByMake[selectedMake] || [] : [];

  const handleSearch = () => {
    console.log('Search:', { make: selectedMake, model: selectedModel, maxPrice: selectedPrice });
  };

  return (
    <div className={styles.bar} id="search-bar">
      <div className={styles.field}>
        <select
          value={selectedMake}
          onChange={(e) => {
            setSelectedMake(e.target.value);
            setSelectedModel('');
          }}
          className={styles.select}
          id="search-make"
        >
          <option value="">Toutes les Marques</option>
          {makes.map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          className={styles.select}
          disabled={!selectedMake}
          id="search-model"
        >
          <option value="">Tous les Modèles</option>
          {models.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.divider} />

      <div className={styles.field}>
        <select
          value={selectedPrice}
          onChange={(e) => setSelectedPrice(e.target.value)}
          className={styles.select}
          id="search-price"
        >
          <option value="">Prix Max</option>
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      <button
        className={styles.searchBtn}
        onClick={handleSearch}
        aria-label="Rechercher"
        id="search-btn"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </div>
  );
}
