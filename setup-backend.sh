#!/bin/bash

# GetRac Backend Setup Script
# Ce script crée une API backend complète pour GetRac

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== GetRac Backend Setup ===${NC}\n"

# 1. Créer le répertoire backend
echo -e "${GREEN}✓ Creating backend directory...${NC}"
mkdir -p getrac-backend
cd getrac-backend

# 2. Initialiser le projet npm
echo -e "${GREEN}✓ Initializing npm project...${NC}"
npm init -y > /dev/null

# 3. Installer les dépendances
echo -e "${GREEN}✓ Installing dependencies...${NC}"
npm install express cors dotenv axios
npm install -D nodemon ts-node typescript @types/express @types/node @types/cors

# 4. Créer la structure du projet
echo -e "${GREEN}✓ Creating project structure...${NC}"
mkdir -p src/routes src/middleware src/data src/config

# 5. Créer les fichiers TypeScript
echo -e "${GREEN}✓ Creating configuration files...${NC}"

# Create tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
EOF

# Create .env
cat > .env << 'EOF'
PORT=5001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
EOF

# Create server.ts
cat > src/server.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
app.use(express.json());

// Dummy data
const products = [
  {
    id: 1,
    name: "Laptop Pro",
    price: 1299.99,
    description: "High-performance laptop for professionals",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    stock: 15,
    rating: 4.8,
    reviews: 234
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 199.99,
    description: "Premium wireless headphones with noise cancellation",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    stock: 42,
    rating: 4.6,
    reviews: 567
  }
];

// Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log(`New contact message from ${name} (${email}): ${subject}`);
  res.json({ success: true, message: 'Message received' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`CORS enabled for ${process.env.CORS_ORIGIN}`);
});
EOF

# Create package.json scripts
cat > package.json << 'EOF'
{
  "name": "getrac-backend",
  "version": "1.0.0",
  "description": "GetRac E-commerce API Backend",
  "main": "dist/server.js",
  "scripts": {
    "dev": "nodemon src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "axios": "^1.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "ts-node": "^10.9.1",
    "typescript": "^5.1.3",
    "@types/express": "^4.17.17",
    "@types/node": "^20.3.1",
    "@types/cors": "^2.8.13"
  }
}
EOF

echo -e "\n${GREEN}✓ Backend setup complete!${NC}\n"
echo -e "${BLUE}Next steps:${NC}"
echo "1. cd getrac-backend"
echo "2. npm run dev"
echo ""
echo "The backend will be available at http://localhost:5001"
