import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import NewsletterPopup from '@/components/NewsletterPopup/NewsletterPopup';
import StickyContactBar from '@/components/StickyContactBar/StickyContactBar';

export const metadata = {
  title: {
    default: '2s oto | Premium Automotive',
    template: '%s | 2s oto',
  },
  description:
    'Votre destination premium pour l\'achat de véhicules de luxe en Algérie. Découvrez notre sélection de voitures haut de gamme.',
  keywords: ['voitures', 'automobile', 'luxe', 'Algérie', 'showroom', 'véhicules'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        <NewsletterPopup />
        <StickyContactBar />
      </body>
    </html>
  );
}
