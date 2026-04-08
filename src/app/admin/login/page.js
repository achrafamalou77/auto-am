'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { loginAdmin } from '@/utils/supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginAdmin(email, password);
      router.push('/admin');
    } catch (err) {
      setError(err.message || 'Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--color-bg)',
      fontFamily: 'var(--font-sans)',
      padding: '24px'
    }}>
      <div style={{
        background: '#fff',
        padding: '40px 32px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid var(--color-border)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Image
            src="/images/logo.webp"
            alt="2s oto Logo"
            width={120}
            height={48}
            priority
            style={{ margin: '0 auto 12px', display: 'block' }}
          />
          <p style={{ color: 'var(--color-text)', fontSize: '0.95rem' }}>Espace Administrateur</p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '24px',
            fontSize: '0.9rem',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: 'var(--color-dark)' }}>Adresse Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@2soto.com" 
              required
              className="form-input"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px', color: 'var(--color-dark)' }}>Mot de passe</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
              className="form-input"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '1rem' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', padding: '14px', borderRadius: '8px', fontSize: '1rem', marginTop: '8px' }}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
