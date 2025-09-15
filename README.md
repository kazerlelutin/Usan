# 🏗️ Usan - Système de Gestion de Plaintes

Application de gestion de plaintes pour association, construite avec SolidJS et une architecture DDD pragmatique. Ce système permet aux victimes et témoins de remonter des événements problématiques de manière sécurisée et traçable.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 22+
- Yarn
- MySQL

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd usan

# Installer les dépendances
yarn install

# Configurer les variables d'environnement
cp env.example .env
# Éditer .env avec vos valeurs

# Démarrer en développement
yarn dev
```

## 🏗️ Architecture

### Structure Features-Based

```
src/
├── features/                   # Features métier
│   ├── auth/                   # Authentification
│   │   ├── auth.store.ts       # État et logique métier
│   │   ├── auth.hook.ts        # Hooks SolidJS
│   │   ├── auth.view.tsx       # Composants UI
│   │   ├── auth.api.ts         # Routes API
│   │   └── *.test.ts           # Tests
│   ├── members/                # Gestion des membres
│   ├── events/                 # Événements
│   └── ...
├── database/                   # Configuration Drizzle
├── auth/                       # Configuration Auth.js
├── ui/                         # Composants réutilisables
├── utils/                      # Utilitaires
└── types/                      # Types TypeScript globaux
```

### Principes DDD Pragmatique

- **Colocation** : Tests à côté du code
- **Isolation** : Features indépendantes
- **Namespaces** : Préfixes clairs (xxx.store.ts)
- **Scope** : Feature trop grosse = mal découpée
- **Shared** : Ce qui n'est pas dans features est partagé

## 🧪 Tests

```bash
# Lancer tous les tests
yarn test

# Tests en mode watch
yarn test --watch

# Tests avec interface UI
yarn test:ui

# Tests avec couverture
yarn test:coverage
```

## 🎨 Styling

Le projet utilise **Tailwind CSS v4** avec des couleurs personnalisées définies dans `src/app.css` :

```css
@theme {
  --color-bg: #f2f2f2;
  --color-primary: #4088cf;
  --color-secondary: #e84855;
  --color-discord: #5468ff;
  /* ... */
}
```

## 🔐 Authentification et Rôles

L'authentification utilise **Auth.js** avec Discord comme provider :

- Configuration dans `src/features/auth/auth.api.ts`
- Variables d'environnement requises dans `.env`
- Hooks et composants dans `src/features/auth/`

### Rôles Discord

Le système utilise les rôles Discord pour gérer les permissions :

- **`inspector`** : Peut instruire les dossiers et faire des recommandations
- **`judge`** : Accès final aux dossiers pour les décisions
- **`complainant`** : Accès anonyme pour déposer et suivre les plaintes

> **⚠️ Recommandation de sécurité** : Seuls les inspecteurs devraient être administrateurs du serveur Discord pour éviter les conflits d'intérêts.

## 📊 Base de données

- **ORM** : Drizzle ORM
- **Base** : MySQL
- **Configuration** : `src/database/`
- **URL** : `DATABASE_URL` dans `.env`

## 🚀 Scripts disponibles

```bash
yarn dev          # Développement
yarn build        # Build de production
yarn start        # Serveur de production
yarn lint         # Linting
yarn test         # Tests
yarn test:ui      # Tests avec UI
yarn test:coverage # Tests avec couverture
```

## 📁 Documentation

- `docs/` : Documentation technique
- `docs/features/` : Documentation des features
- `docs/architecture/` : Architecture et tech stack

## 🎯 Architecture du Système de Plaintes

### 🏠 Page d'accueil - Formulaire de plainte

- **Éditeur de texte intégré** (pas d'images/pièces jointes lourdes)
- **Chiffrement côté client** avant envoi pour éviter les fuites
- **Captcha** pour éviter le spam
- **Bouton soumettre** simple et intuitif

### 🔐 Système de suivi

- **Code unique** généré après soumission
- **URL personnalisée** pour le plaignant
- **Consultation** de l'instruction en cours
- **Réponses** aux demandes supplémentaires

### 👥 Rôles et permissions

- **Plaignants** : Accès anonyme, formulaire + suivi
- **Inspecteurs** : Instruction des dossiers, recommandations
- **Juges** : Accès final, décisions

### 🛡️ Sécurité

- **Chiffrement** des plaintes (évite les fuites)
- **Authentification Discord** pour les agents
- **Séparation des rôles** (inspecteurs vs juges)

## 🎯 Features implémentées

- ✅ **Auth** : Authentification Discord complète avec rôles
- 🔄 **Complaints** : Système de plaintes (en cours)
- 🔄 **Members** : Gestion des membres (en cours)
- 🔄 **Events** : Événements (en cours)
- 🔄 **Newsletter** : Newsletter (en cours)
- 🔄 **Donations** : Dons (en cours)
- 🔄 **Collection** : Collection (en cours)
- 🔄 **Content Management** : Gestion vidéos (en cours)
- 🔄 **AG Management** : Assemblées Générales (en cours)

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-feature`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle feature'`)
4. Push vers la branche (`git push origin feature/nouvelle-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
