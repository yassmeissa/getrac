import React from 'react';
import { ShieldCheck, FileText, Clock, ChevronRight, Mail, Phone } from 'lucide-react';

export const Terms = () => {
  const lastUpdate = "01 Mars 2026";

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container-max mx-auto px-4 max-w-5xl">
        
        {/* Header de la page */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#115E59]/10 rounded-2xl mb-4">
            <ShieldCheck size={32} className="text-[#115E59]" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Conditions Générales de Vente
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            Dernière mise à jour : {lastUpdate}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sommaire rapide (Sidebar) */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-[#115E59]" />
                Sommaire
              </h3>
              <nav className="space-y-3">
                {['Objet', 'Commande', 'Prix', 'Paiement', 'Livraison', 'Rétractation', 'Service client'].map((item, index) => (
                  <a 
                    key={index}
                    href={`#section-${index + 1}`}
                    className="block text-sm text-gray-600 hover:text-[#115E59] hover:translate-x-1 transition-all flex items-center gap-2"
                  >
                    <ChevronRight size={12} className="text-[#9bd4d0]" />
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Contenu principal */}
          <div className="lg:flex-1 bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100 prose prose-slate max-w-none">
            
            <section id="section-1" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">1</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Objet</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Les présentes conditions régissent les ventes de produits et services proposés par <strong>Getrac Services</strong> sur son site internet. Elles visent à définir les relations contractuelles entre Getrac Services et l'acheteur, qu'il soit professionnel ou particulier.
              </p>
            </section>

            <section id="section-2" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">2</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Commande</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Toute commande passée sur le site implique l’acceptation pleine et entière des présentes conditions générales de vente. Getrac Services se réserve le droit d'annuler ou de refuser toute commande d'un client avec lequel il existerait un litige relatif au paiement d'une commande antérieure.
              </p>
            </section>

            <section id="section-3" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">3</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Prix</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Les prix de nos produits sont indiqués en <strong>Francs CFA (F CFA)</strong>, toutes taxes comprises (TTC). Les frais d'expédition sont calculés lors du passage à la caisse. Getrac Services se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section id="section-4" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">4</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Paiement</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Le règlement de vos achats s'effectue via les moyens sécurisés proposés par notre partenaire <strong>PayDunya</strong> (Wave, Orange Money, Free Money, Carte Bancaire) ou à la livraison selon les zones géographiques éligibles.
              </p>
            </section>

            <section id="section-5" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">5</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Livraison</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Les produits sont livrés à l'adresse de livraison indiquée au cours du processus de commande. Les délais de livraison sont donnés à titre indicatif. Getrac Services ne saurait être tenue responsable d’un retard de livraison dû exclusivement à une indisponibilité du client après plusieurs propositions de rendez-vous.
              </p>
            </section>

            <section id="section-6" className="mb-10 scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#115E59] text-white text-sm font-bold">6</span>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Droit de rétractation</h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Conformément à la législation en vigueur au Sénégal, le client dispose d’un délai de <strong>7 jours</strong> à compter de la réception de ses produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalité. Le produit doit être retourné neuf, non utilisé et dans son emballage d’origine.
              </p>
            </section>

            <section id="section-7" className="p-6 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <h2 className="text-xl font-bold text-[#115E59] mb-4">Besoin d'assistance ?</h2>
              <p className="text-gray-600 mb-0">
                Notre service client est à votre disposition pour toute question relative aux CGV :
              </p>
              <ul className="list-none p-0 mt-4 space-y-2">
                <li className="flex items-center gap-2 font-semibold text-gray-900">
                  <Mail size={16} className="text-[#115E59]" /> servicesgetrac@gmail.com
                </li>
                <li className="flex items-center gap-2 font-semibold text-gray-900">
                  <Phone size={16} className="text-[#115E59]" /> +221 33 825 00 93
                </li>
              </ul>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;