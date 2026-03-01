import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Building2, User } from 'lucide-react';
import { contactService } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    userType: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = { ...formData };
    const dataToSend = {
      name: `${form.firstName} ${form.lastName}`,
      userType: form.userType,
      lastName: form.lastName,
      firstName: form.firstName,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
    };
    
    // Appel à ton service API
    const success = await contactService.send(dataToSend);
    
    setLoading(false);
    if (success) {
      setSubmitted(true);
      setFormData({ userType: '', lastName: '', firstName: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      // Dans le cas où tu simules en attendant de lier le backend
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-max mx-auto px-4">
        
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Contactez Getrac Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une question sur nos matériels télécoms, informatiques ou fournitures de bureau ? Notre équipe est à votre écoute.
          </p>
        </div>

        {/* Conteneur principal avec le Split Layout */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto">
          
          {/* Panneau de gauche : Informations */}
          <div className="bg-[#115E59] text-white p-10 lg:p-14 lg:w-2/5 flex flex-col justify-between relative overflow-hidden">
            {/* Formes décoratives en arrière-plan */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-[#9bd4d0] opacity-10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Nos Coordonnées</h2>
              <p className="text-[#9bd4d0] mb-12 text-lg">
                Remplissez le formulaire et nous vous répondrons dans les plus brefs délais.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Phone className="text-[#9bd4d0]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Téléphone</h4>
                    <p className="text-gray-300">+221 77 634 74 75</p>
                    <p className="text-sm text-[#9bd4d0] mt-1">Lun-Ven, 8h00 - 18h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <Mail className="text-[#9bd4d0]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Email</h4>
                    <p className="text-gray-300">servicesgetrac@gmail.com</p>
                    <p className="text-sm text-[#9bd4d0] mt-1">Support en ligne 24/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl">
                    <MapPin className="text-[#9bd4d0]" size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                    <p className="text-gray-300">Dakar, Sénégal</p>
                    <p className="text-sm text-[#9bd4d0] mt-1">Siège social</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panneau de droite : Formulaire */}
          <div className="p-10 lg:p-14 lg:w-3/5 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-slideUp">
                <CheckCircle2 size={80} className="text-green-500 mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Message envoyé !
                </h3>
                <p className="text-gray-600 text-lg">
                  Merci de nous avoir contactés. L'équipe Getrac Services a bien reçu votre demande et vous répondra très rapidement.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>

                {/* Vous êtes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Vous êtes : <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${formData.userType === 'particulier' ? 'border-[#115E59] bg-[#115E59]/5 text-[#115E59]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input
                        type="radio"
                        name="userType"
                        value="particulier"
                        onChange={handleChange}
                        required
                        className="absolute opacity-0 w-0 h-0"
                      />
                      <User size={18} /> Particulier
                    </label>
                    <label className={`flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-colors ${formData.userType === 'professionnel' ? 'border-[#115E59] bg-[#115E59]/5 text-[#115E59]' : 'border-gray-200 hover:border-gray-300'}`}>
                      <input type="radio" name="userType" value="professionnel" onChange={handleChange} required className="hidden" />
                      <Building2 size={18} /> Professionnel
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Prénom */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Prénom <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      pattern="^[a-zA-ZÀ-ÿ\s\-]+$"
                      title="Uniquement des lettres, espaces ou tirets"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  {/* Nom */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Nom <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      pattern="^[a-zA-ZÀ-ÿ\s\-]+$"
                      title="Uniquement des lettres, espaces ou tirets"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email <span className="text-red-500">*</span></label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                  {/* Téléphone (Format Sénégalais) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="^(33|70|75|76|77|78)[0-9]{7}$"
                      title="Format sénégalais valide requis (ex: 771234567)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all"
                      placeholder="Ex: 771234567"
                    />
                  </div>
                </div>

                {/* Objet */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Objet de la demande <span className="text-red-500">*</span></label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all appearance-none"
                  >
                    <option value="" disabled>Sélectionnez un motif</option>
                    <option value="Demande d'informations">Demande d'informations</option>
                    <option value="Support technique">Support technique</option>
                    <option value="Réclamation">Réclamation</option>
                    <option value="Autres">Autre</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message <span className="text-red-500">*</span></label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#9bd4d0] focus:ring-2 focus:ring-[#9bd4d0]/20 transition-all resize-none"
                    placeholder="Détaillez votre demande ici..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 rounded-xl text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                >
                  {loading ? 'Envoi en cours...' : <>
                    <Send size={20} />
                    Envoyer le message
                  </>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Map Section - Raccourcie et modernisée */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="bg-white p-2 rounded-3xl shadow-md h-80 overflow-hidden border border-gray-100">
            {/* J'ai mis les coordonnées de Dakar par défaut dans l'iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123689.51658428131!2d-17.535031980315343!3d14.733560662660417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDQ0JzAxLjAiTiAxN8KwMjgnMDUuOSJX!5e0!3m2!1sfr!2ssn!4v1620000000000!5m2!1sfr!2ssn"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.2rem' }}
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