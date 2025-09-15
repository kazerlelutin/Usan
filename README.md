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
- ✅ **Complaints** : Système de plaintes complet et fonctionnel

## 📋 Système de Plaintes - Guide Utilisateur

### 🏠 Pour les Plaignants

#### 1. Déposer une plainte

- Accédez à la page d'accueil
- Rédigez votre plainte dans l'éditeur de texte
- Cliquez sur "Soumettre"
- **Important** : Notez votre code de suivi unique !

#### 2. Suivre votre plainte

- Utilisez votre code de suivi pour accéder à `/complaints/[votre-code]`
- Consultez l'historique des étapes
- Vérifiez le statut actuel de votre plainte

#### 3. Statuts possibles

- **Soumis** : Votre plainte a été reçue
- **En cours d'enquête** : Un inspecteur traite votre dossier
- **En attente de jugement** : Une recommandation a été faite, en attente de décision
- **Fermé** : Décision finale prise

### 👨‍💼 Pour les Inspecteurs

#### 1. Accès à l'interface admin

- Connectez-vous avec votre compte Discord ayant le rôle "inspector"
- Accédez à `/admin` pour voir la liste des plaintes

#### 2. Actions disponibles

- **Ajouter une note** : Documenter vos investigations
- **Faire une recommandation** : Proposer une décision
- **Changer le statut** : Passer en "En cours d'enquête" ou "En attente de jugement"

#### 3. Workflow recommandé

1. Consultez la plainte et son historique
2. Ajoutez des notes sur vos investigations
3. Faites une recommandation si nécessaire
4. Le statut se met à jour automatiquement

### ⚖️ Pour les Juges

#### 1. Accès restreint

- Connectez-vous avec votre compte Discord ayant le rôle "judge"
- Vous ne voyez que les plaintes "En attente de jugement" ou "Fermées"

#### 2. Actions disponibles

- **Ajouter une note** : Documenter votre analyse
- **Prendre une décision** : Décision finale sur la plainte
- **Changer le statut** : Passer en "Fermé" après décision

#### 3. Workflow recommandé

1. Consultez la plainte et la recommandation de l'inspecteur
2. Ajoutez votre analyse si nécessaire
3. Prenez une décision finale
4. Le statut passe automatiquement à "Fermé"

### 🔒 Sécurité et Confidentialité

- **Chiffrement** : Toutes les plaintes sont chiffrées avant stockage
- **Accès contrôlé** : Seuls les rôles autorisés peuvent accéder aux interfaces
- **Traçabilité** : Toutes les actions sont enregistrées avec horodatage
- **Immutabilité** : Les activités ne peuvent pas être modifiées après création

### 📱 Notifications

- **Discord** : Les nouvelles activités sont notifiées via webhook Discord
- **Liens directs** : Chaque notification contient un lien vers la plainte concernée

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-feature`)
3. Commit les changements (`git commit -m 'Ajouter nouvelle feature'`)
4. Push vers la branche (`git push origin feature/nouvelle-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.
