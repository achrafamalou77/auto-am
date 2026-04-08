import Image from 'next/image';
import Link from 'next/link';
import { getVehicles } from '@/utils/supabaseClient';
import { formatPrice } from '@/utils/formatPrice';
import DeleteButton from '@/components/Admin/DeleteButton';

export const metadata = {
  title: 'Inventaire | Admin Dashboard',
};

export default async function AdminInventory() {
  const vehicles = await getVehicles();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)' }}>Gestion de l&apos;Inventaire</h1>
        <Link href="/admin/add-vehicle" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '8px' }}>
          + Ajouter un véhicule
        </Link>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Marque & Modèle</th>
              <th>Année</th>
              <th>Prix (DA)</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>
                  <div style={{ position: 'relative', width: '60px', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
                    <Image src={vehicle.images?.[0] || '/images/cars/placeholder.jpg'} alt="Thumbnail" fill sizes="60px" style={{ objectFit: 'cover' }} />
                  </div>
                </td>
                <td>
                  <strong>{vehicle.make}</strong> {vehicle.model}
                </td>
                <td>{vehicle.year}</td>
                <td><strong>{formatPrice(vehicle.price)}</strong></td>
                <td>
                  <span style={{ padding: '4px 8px', background: 'rgba(34, 197, 94, 0.1)', color: '#16a34a', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600 }}>
                    En ligne
                  </span>
                </td>
                <td>
                  <div className="action-group">
                    <Link href={`/admin/edit-vehicle/${vehicle.id}`} className="action-btn action-edit" title="Modifier">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </Link>
                    <DeleteButton id={vehicle.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
