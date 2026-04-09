'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { makes, modelsByMake } from '@/utils/mockData';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const router = useRouter();

  const models = selectedMake ? modelsByMake[selectedMake] || [] : [];
  const yearOptions = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedMake && selectedMake !== 'Toutes les Marques') params.append('make', selectedMake);
    if (selectedModel && selectedModel !== 'Tous les Modèles') params.append('model', selectedModel);
    if (selectedYear) params.append('year', selectedYear);
    router.push(`/inventaire?${params.toString()}`);
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
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className={styles.select}
          id="search-year"
        >
          <option value="">Année Min</option>
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year} ou plus récent
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
