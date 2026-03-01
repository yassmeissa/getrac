# Getrac Backend Setup Guide

## 📋 Vue d'ensemble

Le backend Getrac est une API REST construite avec Node.js et Express qui alimente l'application React frontend.

## 🚀 Quick Start

### 1. Créer le projet backend

```bash
mkdir Getrac-backend
cd Getrac-backend
npm init -y
```

### 2. Installer les dépendances

```bash
npm install express cors dotenv axios
npm install -D nodemon ts-node typescript @types/express @types/node
```

### 3. Créer la structure du projet

```
Getrac-backend/
├── src/
│   ├── server.ts
│   ├── routes/
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   └── contact.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   ├── data/
│   │   └── products.json
│   └── config/
│       └── config.ts
├── .env
├── .gitignore
└── package.json
```

### 4. Exemple de serveur Express (src/server.ts)

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', (req, res) => {
  // Retourner les produits
  res.json([]);
});

app.get('/api/products/:id', (req, res) => {
  // Retourner un produit par ID
  res.json({});
});

app.post('/api/contact', (req, res) => {
  // Traiter le formulaire de contact
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

## 📦 Endpoints API Requis

### Produits

#### GET `/api/products`
Récupère tous les produits

**Query Parameters:**
- `category` (optional) - Filtrer par catégorie
- `search` (optional) - Rechercher par nom

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 99.99,
    "description": "Product description",
    "category": "electronics",
    "image": "https://...",
    "stock": 10,
    "rating": 4.5,
    "reviews": 42
  }
]
```

#### GET `/api/products/:id`
Récupère les détails d'un produit

**Response:**
```json
{
  "id": 1,
  "name": "Product Name",
  "price": 99.99,
  "description": "Product description",
  "category": "electronics",
  "image": "https://...",
  "stock": 10,
  "rating": 4.5,
  "reviews": 42
}
```

### Catégories

#### GET `/api/categories`
Récupère toutes les catégories

**Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic devices"
  }
]
```

### Contact

#### POST `/api/contact`
Envoie un message de contact

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Contact subject",
  "message": "Contact message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

## 🗄️ Données d'exemple (src/data/products.json)

```json
[
  {
    "id": 1,
    "name": "Laptop Pro",
    "price": 1299.99,
    "description": "High-performance laptop for professionals",
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    "stock": 15,
    "rating": 4.8,
    "reviews": 234
  },
  {
    "id": 2,
    "name": "Wireless Headphones",
    "price": 199.99,
    "description": "Premium wireless headphones with noise cancellation",
    "category": "electronics",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    "stock": 42,
    "rating": 4.6,
    "reviews": 567
  }
]
```

## 🔧 Configuration (.env)

```
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## 📝 package.json scripts

```json
{
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

## 🚀 Démarrer le serveur

```bash
npm run dev
```

Le serveur démarrera sur `http://localhost:5001`

## 🔗 Connecter Frontend et Backend

Le frontend attend l'API sur `http://localhost:5001/api`

Assurez-vous que:
1. Le serveur backend est en cours d'exécution sur le port 5001
2. CORS est activé
3. Tous les endpoints sont correctement implémentés

## 📚 Prochaines Étapes

1. **Authentification**: Ajouter JWT pour la sécurité
2. **Base de données**: Connecter MongoDB ou PostgreSQL
3. **Validation**: Ajouter Joi ou Zod pour la validation
4. **Tests**: Ajouter des tests unitaires avec Jest
5. **Déploiement**: Déployer sur Heroku ou AWS

## 🆘 Troubleshooting

### CORS Error
Assurez-vous que `cors()` est ajouté avant les routes

### Port Already in Use
```bash
# Changer le port dans .env
PORT=5001
```

### Modules Not Found
```bash
npm install
```
