import { Award, Users, TrendingUp, Heart } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#9bd4d0] text-[#054d3b] py-20 animate-fadeIn">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              À propos de Getrac
            </h1>
            <p className="text-lg text-[#054d3b]">
              Getrac est une plateforme de présentation de produits : découvrez nos sélections, comparez, inspirez-vous ! Aucun achat en ligne, juste la découverte.
            </p>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
              alt="Hero"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Notre Mission
              </h2>
              <p className="text-gray-700 text-lg mb-4">
                Chez Getrac, notre mission est simple : offrir les meilleurs produits à des prix compétitifs, avec un service client exemplaire.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                Nous croyons que chaque client mérite une expérience d'achat exceptionnelle, du moment où vous visitez notre site jusqu'à la livraison de votre commande.
              </p>
              <p className="text-gray-700 text-lg">
                Depuis notre fondation, nous nous engageons à dépasser les attentes de nos clients en fournissant des produits de qualité supérieure et un support incomparable.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Mission"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <Users size={40} />, stat: '50K+', label: 'Clients satisfaits' },
              { icon: <TrendingUp size={40} />, stat: '10K+', label: 'Produits' },
              { icon: <Award size={40} />, stat: '4.8/5', label: 'Note moyenne' },
              { icon: <Heart size={40} />, stat: '99%', label: 'Taux de satisfaction' },
            ].map((item, i) => (
              <div key={i} className="card p-6 text-center">
                <div className="text-blue-600 mb-4 flex justify-center">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {item.stat}
                </h3>
                <p className="text-gray-600">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Nos Valeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Qualité',
                description: 'Nous proposons uniquement les produits de la plus haute qualité',
              },
              {
                title: 'Honnêteté',
                description: 'La transparence et l\'intégrité guident toutes nos actions',
              },
              {
                title: 'Service',
                description: 'Votre satisfaction est notre priorité absolue',
              },
            ].map((value, i) => (
              <div key={i} className="card p-6 text-center hover:shadow-2xl transition">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Notre Équipe
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="card overflow-hidden text-center">
                <img
                  src={`https://i.pravatar.cc/400?img=${i}`}
                  alt={`Team member ${i}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">John Doe</h3>
                  <p className="text-sm text-gray-600">Directeur Général</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
