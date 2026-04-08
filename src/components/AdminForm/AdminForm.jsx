'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addVehicle, updateVehicle, uploadVehicleImage } from '@/utils/supabaseClient';
import { revalidateVehicles } from '@/app/actions';
import MediaDropzone from '../MediaDropzone/MediaDropzone';
import styles from './AdminForm.module.css';

export default function AdminForm({ initialData = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    make: initialData?.make || '',
    model: initialData?.model || '',
    trim: initialData?.trim || '',
    year: initialData?.year || '',
    price: initialData?.price || '',
    bodyType: initialData?.bodyType || 'SUV',
    engineSize: initialData?.engineSize || '',
    fuel: initialData?.fuel || 'Essence',
    transmission: initialData?.transmission || 'Automatique',
    mileage: initialData?.mileage || '',
    color: initialData?.color || '',
    condition: initialData?.condition || 'Neuf',
    driveType: initialData?.driveType || 'FWD',
    doors: initialData?.doors || '4',
    cylinders: initialData?.cylinders || '',
    vin: initialData?.vin || '',
    description: initialData?.description || '',
    features: initialData?.features?.join(', ') || '',
  });
  const [imagesToUpload, setImagesToUpload] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", formData);

    setLoading(true);
    setSuccess(false);

    try {
      const imageUrls = [];
      for (const file of imagesToUpload) {
        const url = await uploadVehicleImage(file);
        imageUrls.push(url);
      }

      const featuresArray = formData.features
        ? formData.features.split(',').map(f => f.trim()).filter(Boolean)
        : (initialData?.features || []);

      const vehiclePayload = {
        make: formData.make.trim(),
        model: formData.model.trim(),
        trim: formData.trim.trim(),
        year: Number(formData.year) || 2024,
        price: Number(formData.price) || 0,
        bodyType: formData.bodyType,
        engineSize: formData.engineSize,
        fuel: formData.fuel,
        transmission: formData.transmission,
        mileage: Number(formData.mileage) || 0,
        color: formData.color,
        condition: formData.condition,
        driveType: formData.driveType,
        doors: Number(formData.doors) || 4,
        cylinders: Number(formData.cylinders) || 0,
        vin: formData.vin,
        description: formData.description,
        features: featuresArray,
        images: imageUrls.length > 0 ? imageUrls : (initialData?.images?.length ? initialData.images : ['/images/cars/placeholder.jpg']),
        featured: initialData?.featured || false,
      };

      if (initialData) {
        await updateVehicle(initialData.id, vehiclePayload);
        await revalidateVehicles();
        setSuccess(true);
        router.refresh();
        router.push('/admin/inventory');
      } else {
        await addVehicle(vehiclePayload);
        await revalidateVehicles();
        setSuccess(true);
        setFormData(prev => ({...prev, make: '', model: '', trim: '', year: '', price: '', description: '', features: '', vin: '', engineSize: '', cylinders: ''}));
        setImagesToUpload([]);
        router.refresh();
      }
    } catch (error) {
      console.log("Supabase Response:", error);
      alert("Erreur: " + (error.message || JSON.stringify(error)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>

      {success && (
        <div style={{ padding: '16px 32px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', fontWeight: '600', borderBottom: '1px solid #16a34a' }}>
          🚀 Véhicule {initialData ? "modifié" : "ajouté"} avec succès !
        </div>
      )}

      <MediaDropzone files={imagesToUpload} setFiles={setImagesToUpload} />

      {/* SECTION: Informations Principales */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Informations Principales</h3>
        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>Marque *</label>
            <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="Ex: MG" required />
          </div>
          <div className={styles.field}>
            <label>Modèle *</label>
            <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="Ex: ZS" required />
          </div>
          <div className={styles.field}>
            <label>Finition / Trim</label>
            <input type="text" name="trim" value={formData.trim} onChange={handleChange} placeholder="Ex: Luxury, R-Line, GR Sport" />
          </div>
          <div className={styles.field}>
            <label>Année *</label>
            <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="2024" required />
          </div>
          <div className={styles.field}>
            <label>Prix (DA) *</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="4500000" required />
          </div>
          <div className={styles.field}>
            <label>Condition</label>
            <select name="condition" value={formData.condition} onChange={handleChange}>
              <option value="Neuf">Neuf</option>
              <option value="Occasion">Occasion</option>
            </select>
          </div>
        </div>
      </div>

      {/* SECTION: Spécifications Techniques */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Spécifications Techniques</h3>
        <div className={styles.grid3}>
          <div className={styles.field}>
            <label>Carrosserie</label>
            <select name="bodyType" value={formData.bodyType} onChange={handleChange}>
              <option value="SUV">SUV</option>
              <option value="Berline">Berline</option>
              <option value="Coupé">Coupé</option>
              <option value="Cabriolet">Cabriolet</option>
              <option value="Citadine">Citadine</option>
              <option value="Pick-up">Pick-up</option>
              <option value="Monospace">Monospace</option>
              <option value="Break">Break</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Carburant</label>
            <select name="fuel" value={formData.fuel} onChange={handleChange}>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybride">Hybride</option>
              <option value="Électrique">Électrique</option>
              <option value="GPL">GPL</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Boîte de vitesse</label>
            <select name="transmission" value={formData.transmission} onChange={handleChange}>
              <option value="Automatique">Automatique</option>
              <option value="Manuelle">Manuelle</option>
              <option value="CVT">CVT</option>
              <option value="DCT">Double embrayage (DCT)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Transmission</label>
            <select name="driveType" value={formData.driveType} onChange={handleChange}>
              <option value="FWD">Traction avant (FWD)</option>
              <option value="RWD">Propulsion (RWD)</option>
              <option value="AWD">Intégrale (AWD)</option>
              <option value="4WD">4x4 (4WD)</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Moteur</label>
            <input type="text" name="engineSize" value={formData.engineSize} onChange={handleChange} placeholder="Ex: 1.5L Turbo" />
          </div>
          <div className={styles.field}>
            <label>Cylindres</label>
            <input type="number" name="cylinders" value={formData.cylinders} onChange={handleChange} placeholder="4" />
          </div>
          <div className={styles.field}>
            <label>Kilométrage</label>
            <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="0 pour neuf" />
          </div>
          <div className={styles.field}>
            <label>Portes</label>
            <select name="doors" value={formData.doors} onChange={handleChange}>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className={styles.field}>
            <label>Couleur</label>
            <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Noir Obsidienne" />
          </div>
        </div>
      </div>

      {/* SECTION: Détails */}
      <div className={styles.formSection}>
        <h3 className={styles.sectionTitle}>Détails & Équipements</h3>
        <div className={styles.grid2}>
          <div className={styles.field}>
            <label>Numéro de châssis (VIN)</label>
            <input type="text" name="vin" value={formData.vin} onChange={handleChange} placeholder="Ex: WAUZZZ4H8NN000001" />
          </div>
          <div className={styles.field}>
            <label>Équipements (séparés par des virgules)</label>
            <input type="text" name="features" value={formData.features} onChange={handleChange} placeholder="Toit ouvrant, Caméra 360, Cuir" />
          </div>
        </div>
        <div className={styles.field} style={{ marginTop: '20px' }}>
          <label>Description complète</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Décrivez le véhicule en détail pour attirer les acheteurs..."
            style={{ width: '100%', padding: '12px 16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.95rem', resize: 'vertical' }}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={`btn-outline ${styles.cancelBtn}`}>Annuler</button>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Enregistrement...' : (initialData ? 'Modifier le véhicule' : 'Ajouter le véhicule')}
        </button>
      </div>

    </form>
  );
}
