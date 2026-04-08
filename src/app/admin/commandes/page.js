import { getOrders } from '@/utils/supabaseClient';

export const metadata = {
  title: 'Commandes & Leads | Admin Dashboard',
};

export default async function AdminCommandes() {
  const orders = await getOrders();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', color: 'var(--color-dark)', marginBottom: '24px' }}>
        Commandes & Leads
      </h1>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Véhicule d&apos;intérêt</th>
              <th>Message</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {new Date(order.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' })}
                </td>
                <td><strong>{order.clientName}</strong></td>
                <td style={{ whiteSpace: 'nowrap' }}>{order.phone}</td>
                <td><span style={{ background: 'var(--color-bg)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>{order.vehicleInterest}</span></td>
                <td style={{ maxWidth: '300px' }}>
                  <p style={{ margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                    {order.message}
                  </p>
                </td>
                <td>
                  <span style={{ 
                    padding: '4px 8px', 
                    background: order.status === 'nouveau' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(245, 158, 11, 0.1)', 
                    color: order.status === 'nouveau' ? '#2563eb' : '#d97706', 
                    borderRadius: '4px', 
                    fontSize: '0.8rem', 
                    fontWeight: 600,
                    textTransform: 'capitalize'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="action-group">
                    <button className="action-btn action-edit" title="Traiter">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button className="action-btn action-delete" title="Supprimer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                      </svg>
                    </button>
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
