import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { contactService } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await contactService.send(formData);
    setLoading(false);
    if (success) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5001);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Nous contacter
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vous avez des questions ? Notre équipe est prête à vous aider. Contactez-nous par téléphone, email ou en remplissant le formulaire ci-dessous.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          {[
            {
              icon: <Phone size={32} />,
              title: 'Téléphone',
              info: '+33 (0)1 23 45 67 89',
              subtitle: 'Lun-Ven 9h-18h',
            },
            {
              icon: <Mail size={32} />,
              title: 'Email',
              info: 'contact@getrac.com',
              subtitle: 'Réponse en 24h',
            },
            {
              icon: <MapPin size={32} />,
              title: 'Adresse',
              info: '123 Avenue des Champs, 75008 Paris',
              subtitle: 'Siège social',
            },
          ].map((contact, i) => (
            <div key={i} className="card p-6 text-center">
              <div className="text-[#054d3b] mb-4 flex justify-center">
                {contact.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
              <p className="font-semibold text-gray-900 mb-1">{contact.info}</p>
              <p className="text-sm text-gray-600">{contact.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto card p-8">
          {submitted ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Merci pour votre message !
              </h3>
              <p className="text-gray-600">
                Nous avons bien reçu votre message et nous vous répondrons rapidement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9bd4d0]"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9bd4d0]"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9bd4d0]"
                  placeholder="Sujet de votre message"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#9bd4d0] resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2"
              >
                {loading ? 'Envoi...' : <>
                  <Send size={20} />
                  Envoyer le message
                </>}
              </button>
            </form>
          )}
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trouvez-nous</h2>
          <div className="card overflow-hidden h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9918474319627!2d2.2922926!3d48.8566141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2s123%20Avenue%20des%20Champs%2C%2075008%20Paris!5e0!3m2!1sfr!2sfr!4v"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
