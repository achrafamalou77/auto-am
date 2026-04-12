import styles from './WhyChooseUs.module.css';

const reasons = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.19M15 6h2a2 2 0 012 2v1M21.13 15.78A2 2 0 0119 18h-1" />
        <path d="M2 16l6-8 6 8" />
        <circle cx="18" cy="17" r="3" />
        <path d="M15 14l6.4-6.4" />
      </svg>
    ),
    step: '01',
    title: 'Importation Express',
    description:
      "De la Chine à l'Algérie en moins de 3 mois et demi. Un processus logistique optimisé pour vous livrer un véhicule clé en main le plus rapidement possible.",
    accent: 'orange',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    step: '02',
    title: 'Transparence & Fiabilité',
    description:
      "Une démarche d'importation 100% sécurisée. Nous gérons toutes les démarches administratives et douanières avec une transparence totale.",
    accent: 'green',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    step: '03',
    title: '+370 Clients Satisfaits',
    description:
      "Notre réputation n'est plus à faire. Rejoignez notre communauté grandissante d'acheteurs qui nous ont fait confiance pour leur projet automobile.",
    accent: 'gold',
  },
];

export default function WhyChooseUs() {
  return (
    <section className={styles.section} id="why-choose-us">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.badge}>Notre Engagement</span>
          <h2 className={styles.title}>
            Pourquoi Nous Choisir<span className={styles.titleAccent}> ?</span>
          </h2>
          <p className={styles.subtitle}>
            Un service complet d&apos;importation automobile, de la commande en Chine jusqu&apos;à la livraison en Algérie.
          </p>
        </div>
        <div className={styles.grid}>
          {reasons.map((reason) => (
            <div key={reason.title} className={`${styles.card} ${styles[reason.accent]}`}>
              {/* Glowing border overlay */}
              <div className={styles.glowBorder} />

              {/* Step number */}
              <span className={styles.step}>{reason.step}</span>

              {/* Icon */}
              <div className={styles.iconWrap}>
                <div className={styles.iconInner}>{reason.icon}</div>
              </div>

              {/* Content */}
              <h3 className={styles.cardTitle}>{reason.title}</h3>
              <p className={styles.cardDesc}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
