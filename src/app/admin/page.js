import { getVehicles, getOrders } from '@/utils/supabaseClient';

export default async function AdminDashboard() {
  const vehicles = await getVehicles();
  const orders = await getOrders();

  const totalValue = vehicles.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div>
      <h1 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--color-dark)' }}>
        Vue d&apos;ensemble
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        
        {/* Stat Card 1 */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Total Véhicules</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-dark)' }}>{vehicles.length}</div>
        </div>

        {/* Stat Card 2 */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Nouveaux Leads (Commandes)</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-primary)' }}>{orders.filter(o => o.status === 'nouveau').length}</div>
        </div>

        {/* Stat Card 3 */}
        <div style={{ background: '#fff', padding: '24px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '8px' }}>Valeur du stock (DA)</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--color-dark)', marginTop: '8px' }}>
            {totalValue.toLocaleString('fr-DZ')}
          </div>
        </div>

      </div>
    </div>
  );
}
