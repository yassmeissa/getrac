# Getrac - E-Commerce Platform

Une plateforme e-commerce moderne et sophistiquée construite avec React, TypeScript et Tailwind CSS.

## 🚀 Caractéristiques

- **Interface Moderne**: Design élégant et responsive avec animations fluides
- **Gestion des Produits**: Catalogue complet avec filtres et recherche
- **Détails Produits**: Pages détaillées avec galerie, avis et stock
- **Formulaire de Contact**: Formulaire de contact intégré avec validation
- **À Propos**: Page de présentation avec statistiques et équipe
- **Mobile First**: Optimisé pour tous les appareils
- **Performance**: Build ultra-rapide avec Vite

## 📋 Prérequis

- Node.js 16+
- npm ou yarn

## 🛠️ Installation

```bash
# Cloner le projet
git clone <repo-url>

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Build pour la production
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation principale
│   ├── Footer.tsx      # Pied de page
│   └── ProductCard.tsx # Carte produit
├── pages/              # Pages principales
│   ├── Home.tsx        # Accueil avec produits vedettes
│   ├── Products.tsx    # Catalogue avec filtres
│   ├── ProductDetail.tsx # Détails d'un produit
│   ├── Contact.tsx     # Formulaire de contact
│   ├── About.tsx       # À propos
│   └── NotFound.tsx    # Page 404
├── services/           # Services API
│   └── api.ts          # Client Axios
├── types/              # Types TypeScript
│   └── index.ts        # Interfaces
├── App.tsx             # Routeur principal
└── main.tsx            # Point d'entrée
```

## 🎨 Technologie Utilisée

- **React 18**: Framework UI
- **TypeScript**: Type safety
- **Vite**: Build tool ultra-rapide
- **Tailwind CSS**: Styling utilitaire
- **React Router**: Navigation
- **Axios**: HTTP client
- **Lucide React**: Icônes

## 🔌 Configuration API

L'application s'attend à une API backend sur `http://localhost:5001/api`

### Endpoints Requis:
- `GET /products` - Tous les produits
- `GET /products/:id` - Détails d'un produit
- `POST /contact` - Envoyer un formulaire de contact

## 📦 Scripts Disponibles

```bash
npm run dev      # Démarrer le serveur de développement
npm run build    # Build pour la production
npm run lint     # Lancer ESLint
npm run preview  # Prévisualiser le build
```

## 🎯 Prochaines Étapes

1. **Backend API**: Créer une API Node.js/Express
2. **Authentification**: Implémenter la connexion utilisateur
3. **Panier**: Ajouter la gestion du panier
4. **Paiement**: Intégrer une solution de paiement
5. **Base de données**: Ajouter une vraie base de données

## 📄 Licence

MIT

## 👥 Contact

Pour toute question, contactez-nous sur contact@Getrac.com
# Getrac
