import React from 'react';
import { ShieldCheck, Lock, Eye, Database, Cookie, UserCheck, Mail, ChevronRight, Clock } from 'lucide-react';

export const Privacy = () => {
  const lastUpdate = "01 Mars 2026";

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-max mx-auto px-4 max-w-5xl">
        
        {/* Header de la page */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#115E59]/10 rounded-2xl mb-4">
            <Lock size={32} className="text-[#115E59]" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Politique de Confidentialité
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            Dernière mise à jour : {lastUpdate}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar de navigation rapide */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#115E59]" />
                Vos données
              </h3>
              <nav className="space-y-3">
                {[
                  { label: 'Collecte', icon: <Database size={14} /> },
                  { label: 'Utilisation', icon: <Eye size={14} /> },
                  { label: 'Sécurité', icon: <Lock size={14} /> },
                  { label: 'Vos Droits', icon: <UserCheck size={14} /> },
                  { label: 'Cookies', icon: <Cookie size={14} /> }
                ].map((item, index) => (
                  <a 
                    key={index}
                    href={`#section-${index + 1}`}
                    className="block text-sm text-gray-600 hover:text-[#115E59] hover:translate-x-1 transition-all flex items-center gap-2"
                  >
                    <span className="text-[#9bd4d0]">{item.icon}</span>
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="lg:flex-1 bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-teal max-w-none">
            
            <section id="section-1" className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#115E59]/5 rounded-lg">
                  <Database size={24} className="text-[#115E59]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">1. Collecte des données</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Chez <strong>Getrac Services</strong>, nous attachons une importance capitale à la protection de votre vie privée. Nous collectons uniquement les données strictement nécessaires :
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-4">
                <li>Informations d'identité (Nom, Prénom) pour la personnalisation.</li>
                <li>Coordonnées (Email, Téléphone, Adresse) pour le suivi de commande et la livraison.</li>
                <li>Données de navigation pour optimiser votre expérience sur le site.</li>
              </ul>
            </section>

            <section id="section-2" className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#115E59]/5 rounded-lg">
                  <Eye size={24} className="text-[#115E59]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">2. Utilisation des données</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Vos informations personnelles ne sont <strong>jamais revendues ou louées</strong> à des tiers. Leur utilisation est strictement limitée à :
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2 mt-4">
                <li>La gestion de vos commandes et livraisons.</li>
                <li>L'envoi de factures et confirmations de paiement.</li>
                <li>L'amélioration technique de nos services et offres promotionnelles (avec votre accord).</li>
              </ul>
            </section>

            <section id="section-3" className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#115E59]/5 rounded-lg">
                  <Lock size={24} className="text-[#115E59]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">3. Sécurité</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Nous mettons en œuvre des protocoles de sécurité avancés (chiffrement SSL, accès restreints) pour garantir l'intégrité de vos informations. Nos transactions financières sont déléguées à notre partenaire certifié <strong>PayDunya</strong>, garantissant un niveau de sécurité bancaire pour vos paiements Wave, OM ou Carte Bancaire.
              </p>
            </section>

            <section id="section-4" className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#115E59]/5 rounded-lg">
                  <UserCheck size={24} className="text-[#115E59]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">4. Droit d’accès et de rectification</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Conformément à la protection des données personnelles, vous disposez d'un droit total sur vos informations. Vous pouvez à tout moment demander l’accès, la modification ou la suppression définitive de vos données en nous contactant directement par email.
              </p>
            </section>

            <section id="section-5" className="mb-12 scroll-mt-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#115E59]/5 rounded-lg">
                  <Cookie size={24} className="text-[#115E59]" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">5. Cookies</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Le site Getrac Services utilise des cookies pour mémoriser votre panier et vos préférences d'affichage. Ces petits fichiers permettent une navigation plus fluide. Vous pouvez choisir de les refuser dans les réglages de votre navigateur, bien que cela puisse altérer certaines fonctionnalités (comme le panier).
              </p>
            </section>

            {/* Zone de contact finale */}
            <div className="mt-16 p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-[#115E59]" size={20} />
                <h3 className="text-xl font-bold text-gray-900 m-0">Une question sur vos données ?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Notre délégué à la protection des données est à votre disposition pour toute demande spécifique.
              </p>
              <a 
                href="mailto:servicesgetrac@gmail.com" 
                className="inline-flex items-center gap-2 bg-[#115E59] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#0d4a46] transition-all shadow-sm"
              >
                Nous contacter
                <ChevronRight size={18} />
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;