'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabaseClient';
import VehicleCard from '@/components/VehicleCard/VehicleCard';
import styles from './inventaire.module.css';

const bodyTypes = ['Tous', 'Berline', 'SUV', 'Coupé', 'Citadine', 'Cabriolet'];
const fuelTypes = ['Tous', 'Essence', 'Diesel', 'Hybride', 'Électrique'];
const driveTypes = ['Tous', 'FWD', 'RWD', 'AWD', '4WD'];
const sortOptions = [
  { value: 'newest', label: 'Plus récent' },
  { value: 'price-asc', label: 'Prix croissant' },
  { value: 'price-desc', label: 'Prix décroissant' },
  { value: 'year-desc', label: 'Année récente' },
  { value: 'mileage-asc', label: 'Kilométrage bas' },
];

export default function InventairePage() {
  const searchParams = useSearchParams();
  const typeFromUrl = searchParams.get('type');

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [make, setMake] = useState('');
  const [activeType, setActiveType] = useState(typeFromUrl || 'Tous');
  const [fuel, setFuel] = useState('Tous');
  const [drive, setDrive] = useState('Tous');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [conditionTab, setConditionTab] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [keyword, setKeyword] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      setLoading(true);
      const { data } = await supabase.from('vehicles').select('*');
      if (data) setVehicles(data);
      setLoading(false);
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    if (typeFromUrl) setActiveType(typeFromUrl);
  }, [typeFromUrl]);

  // Derived unique makes
  const uniqueMakes = useMemo(() => [...new Set(vehicles.map(v => v.make))].sort(), [vehicles]);

  // Filtered & sorted
  const results = useMemo(() => {
    let filtered = [...vehicles];

    if (activeType !== 'Tous') filtered = filtered.filter(v => v.bodyType === activeType);
    if (fuel !== 'Tous') filtered = filtered.filter(v => v.fuel === fuel);
    if (drive !== 'Tous') filtered = filtered.filter(v => v.driveType === drive);
    if (make) filtered = filtered.filter(v => v.make === make);
    if (minPrice) filtered = filtered.filter(v => v.price >= Number(minPrice));
    if (maxPrice) filtered = filtered.filter(v => v.price <= Number(maxPrice));
    if (conditionTab === 'new') filtered = filtered.filter(v => v.condition === 'Neuf');
    if (conditionTab === 'used') filtered = filtered.filter(v => v.condition === 'Occasion');
    if (keyword) {
      const kw = keyword.toLowerCase();
      filtered = filtered.filter(v =>
        `${v.make} ${v.model} ${v.trim || ''}`.toLowerCase().includes(kw)
      );
    }

    switch (sortBy) {
      case 'price-asc': filtered.sort((a, b) => a.price - b.price); break;
      case 'price-desc': filtered.sort((a, b) => b.price - a.price); break;
      case 'year-desc': filtered.sort((a, b) => b.year - a.year); break;
      case 'mileage-asc': filtered.sort((a, b) => a.mileage - b.mileage); break;
      default: filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    return filtered;
  }, [vehicles, activeType, fuel, drive, make, minPrice, maxPrice, conditionTab, sortBy, keyword]);

  const countAll = vehicles.length;
  const countNew = vehicles.filter(v => v.condition === 'Neuf').length;
  const countUsed = vehicles.filter(v => v.condition === 'Occasion').length;

  const clearFilters = () => {
    setMake(''); setActiveType('Tous'); setFuel('Tous'); setDrive('Tous');
    setMinPrice(''); setMaxPrice(''); setKeyword('');
  };

  return (
    <main className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1>Notre Inventaire</h1>
        <p>Trouvez le véhicule parfait parmi notre collection exclusive.</p>
      </section>

      <div className={`container ${styles.body}`}>
        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterRow}>
            <select value={make} onChange={e => setMake(e.target.value)} className={styles.filterSelect}>
              <option value="">Toutes les Marques</option>
              {uniqueMakes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={activeType} onChange={e => setActiveType(e.target.value)} className={styles.filterSelect}>
              {bodyTypes.map(t => <option key={t} value={t}>{t === 'Tous' ? 'Type de carrosserie' : t}</option>)}
            </select>
            <select value={fuel} onChange={e => setFuel(e.target.value)} className={styles.filterSelect}>
              {fuelTypes.map(f => <option key={f} value={f}>{f === 'Tous' ? 'Carburant' : f}</option>)}
            </select>
            <button className={styles.moreFiltersBtn} onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? '✕ Masquer' : '▼ Plus de filtres'}
            </button>
          </div>

          {showFilters && (
            <div className={styles.filterRow}>
              <select value={drive} onChange={e => setDrive(e.target.value)} className={styles.filterSelect}>
                {driveTypes.map(d => <option key={d} value={d}>{d === 'Tous' ? 'Transmission' : d}</option>)}
              </select>
              <input type="number" placeholder="Prix min (DA)" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={styles.filterInput} />
              <input type="number" placeholder="Prix max (DA)" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={styles.filterInput} />
              <button className={styles.clearBtn} onClick={clearFilters}>Effacer tout</button>
            </div>
          )}
        </div>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.conditionTabs}>
            <button className={`${styles.condTab} ${conditionTab === 'all' ? styles.condTabActive : ''}`} onClick={() => setConditionTab('all')}>
              Tous ({countAll})
            </button>
            <button className={`${styles.condTab} ${conditionTab === 'new' ? styles.condTabActive : ''}`} onClick={() => setConditionTab('new')}>
              Neuf ({countNew})
            </button>
            <button className={`${styles.condTab} ${conditionTab === 'used' ? styles.condTabActive : ''}`} onClick={() => setConditionTab('used')}>
              Occasion ({countUsed})
            </button>
          </div>
          <div className={styles.toolbarRight}>
            <div className={styles.searchBox}>
              <input type="text" placeholder="Rechercher..." value={keyword} onChange={e => setKeyword(e.target.value)} className={styles.keywordInput} />
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.searchIcon}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <div className={styles.sortWrap}>
              <span>Trier:</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={styles.sortSelect}>
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <p className={styles.resultCount}><strong>{results.length}</strong> résultat{results.length !== 1 ? 's' : ''}</p>

        {/* Grid */}
        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => <div key={i} className={styles.skeleton} />)}
          </div>
        ) : results.length === 0 ? (
          <div className={styles.empty}>
            <h3>Aucun véhicule trouvé</h3>
            <p>Essayez de modifier vos filtres.</p>
            <button onClick={clearFilters} className="btn-primary" style={{ marginTop: '16px' }}>Effacer les filtres</button>
          </div>
        ) : (
          <div className={styles.grid}>
            {results.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
