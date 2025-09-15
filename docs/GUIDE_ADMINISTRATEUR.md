# 🔧 Guide Administrateur - Système de Gestion des Plaintes

## 🎯 Vue d'ensemble technique

Ce guide s'adresse aux administrateurs système et aux responsables techniques du système de gestion des plaintes.

## 🏗️ Architecture technique

### 📁 Structure du projet

```
src/
├── features/
│   ├── auth/                    # Authentification Discord
│   ├── complaints/              # Création des plaintes
│   ├── complaints-list/         # Liste admin des plaintes
│   ├── complaint-details/       # Détails d'une plainte
│   ├── activity-log/            # Gestion des activités/étapes
│   └── file-tracking/           # Suivi côté plaignant
├── database/
│   ├── schema.ts               # Schéma Drizzle ORM
│   └── index.ts                # Configuration DB
├── routes/
│   ├── admin/                  # Interface administrateur
│   ├── complaints/             # Interface plaignant
│   └── api/                    # Endpoints API
└── ui/                         # Composants réutilisables
```

### 🗄️ Base de données

#### Tables principales

**`complaints`**

- `id` : Identifiant unique (CUID)
- `accessCode` : Code de suivi pour le plaignant
- `encryptedContent` : Contenu chiffré de la plainte
- `status` : Statut actuel (submitted, under_investigation, awaiting_judgment, closed)
- `createdAt` / `updatedAt` : Horodatage

**`activityLogs`**

- `id` : Identifiant unique (CUID)
- `complaintId` : Référence vers la plainte
- `action` : Type d'action (note_added, recommendation_added, decision_made, etc.)
- `actorType` : Type d'acteur (inspector, judge, system)
- `actorId` / `actorName` : Identité de l'acteur
- `encryptedContent` : Contenu chiffré de l'activité
- `createdAt` : Horodatage

### 🔐 Sécurité

#### Chiffrement

- **Algorithme** : AES-256-GCM
- **Clé** : Générée automatiquement par utilisateur
- **Stockage** : Clé stockée côté client, données chiffrées en base
- **Déchiffrement** : Uniquement côté serveur pour l'affichage

#### Authentification

- **Provider** : Discord OAuth2
- **Rôles** : Basés sur les rôles Discord du serveur
- **Sessions** : Gérées par Auth.js
- **Protection** : Middleware de vérification des rôles

## 🚀 Déploiement

### 📋 Prérequis

- Node.js 22+
- MySQL 8.0+
- Compte Discord avec bot configuré
- Serveur web (Nginx recommandé)

### 🔧 Configuration

#### Variables d'environnement

```bash
# Base de données
DATABASE_URL="mysql://user:password@localhost:3306/database"

# Discord OAuth
DISCORD_CLIENT_ID="your_client_id"
DISCORD_CLIENT_SECRET="your_client_secret"
DISCORD_GUILD_ID="your_guild_id"

# Chiffrement
ENCRYPTION_KEY="your_32_char_encryption_key"

# Discord Webhook
DISCORD_WEBHOOK_COMPLAINT="https://discord.com/api/webhooks/..."

# Application
NODE_ENV="production"
PORT="3000"
```

#### Configuration Discord

1. **Créer une application Discord**

   - Aller sur https://discord.com/developers/applications
   - Créer une nouvelle application
   - Noter le Client ID et Client Secret

2. **Configurer OAuth2**

   - Ajouter l'URL de callback : `https://votre-domaine.com/api/auth/callback/discord`
   - Activer les scopes : `identify`, `guilds`

3. **Créer un bot Discord**

   - Aller dans l'onglet "Bot"
   - Créer un bot
   - Noter le token (pour les webhooks)

4. **Configurer les rôles**
   - Créer les rôles : `inspector`, `judge`
   - Assigner les rôles aux utilisateurs appropriés

### 🐳 Déploiement Docker

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### 🔄 Scripts de déploiement

```bash
# Build et déploiement
npm run build
npm run start

# Migration de base de données
npm run db:migrate

# Vérification de santé
curl http://localhost:3000/api/health
```

## 📊 Monitoring et maintenance

### 📈 Métriques importantes

- **Temps de réponse** : < 200ms pour les pages statiques
- **Taux d'erreur** : < 1%
- **Disponibilité** : > 99.9%
- **Taille de la base** : Surveiller la croissance

### 🔍 Logs à surveiller

```bash
# Erreurs d'authentification
grep "Unauthorized" /var/log/app.log

# Erreurs de déchiffrement
grep "decrypt" /var/log/app.log

# Erreurs de base de données
grep "database" /var/log/app.log
```

### 🛠️ Maintenance régulière

#### Quotidienne

- Vérifier les logs d'erreur
- Surveiller les performances
- Vérifier les webhooks Discord

#### Hebdomadaire

- Nettoyer les logs anciens
- Vérifier l'espace disque
- Tester les sauvegardes

#### Mensuelle

- Mettre à jour les dépendances
- Analyser les métriques d'usage
- Optimiser la base de données

## 🔧 Dépannage

### ❌ Problèmes courants

#### Erreur d'authentification Discord

```bash
# Vérifier la configuration
echo $DISCORD_CLIENT_ID
echo $DISCORD_CLIENT_SECRET

# Tester la connexion
curl -X GET "https://discord.com/api/v10/users/@me" \
  -H "Authorization: Bearer $TOKEN"
```

#### Erreur de base de données

```bash
# Vérifier la connexion
mysql -h localhost -u user -p database

# Vérifier les migrations
npm run db:status
```

#### Erreur de déchiffrement

```bash
# Vérifier la clé de chiffrement
echo $ENCRYPTION_KEY | wc -c  # Doit être 32 caractères

# Tester le déchiffrement
node -e "console.log(require('crypto').createHash('sha256').update('test').digest('hex'))"
```

### 🔄 Procédures de récupération

#### Sauvegarde de base de données

```bash
# Sauvegarde complète
mysqldump -u user -p database > backup_$(date +%Y%m%d).sql

# Restauration
mysql -u user -p database < backup_20240115.sql
```

#### Récupération après incident

1. **Arrêter l'application**
2. **Restaurer la base de données**
3. **Vérifier la configuration**
4. **Redémarrer l'application**
5. **Tester les fonctionnalités critiques**

## 📋 Checklist de déploiement

### ✅ Pré-déploiement

- [ ] Tests unitaires passent
- [ ] Tests d'intégration passent
- [ ] Configuration production validée
- [ ] Sauvegarde de base effectuée
- [ ] Plan de rollback préparé

### ✅ Déploiement

- [ ] Code déployé
- [ ] Base de données migrée
- [ ] Configuration appliquée
- [ ] Services redémarrés
- [ ] Tests de santé passent

### ✅ Post-déploiement

- [ ] Monitoring activé
- [ ] Logs vérifiés
- [ ] Fonctionnalités testées
- [ ] Équipe notifiée
- [ ] Documentation mise à jour

## 🔐 Sécurité avancée

### 🛡️ Bonnes pratiques

- **HTTPS obligatoire** : Certificats SSL valides
- **Headers de sécurité** : CSP, HSTS, X-Frame-Options
- **Rate limiting** : Protection contre les attaques DDoS
- **Audit logs** : Traçabilité complète des actions

### 🔍 Audit de sécurité

#### Vérifications régulières

- [ ] Mise à jour des dépendances
- [ ] Scan de vulnérabilités
- [ ] Test de pénétration
- [ ] Révision des logs d'accès
- [ ] Vérification des permissions

#### Réponse aux incidents

1. **Isoler** le système compromis
2. **Analyser** l'étendue de l'incident
3. **Corriger** les vulnérabilités
4. **Restaurer** les services
5. **Documenter** l'incident

## 📞 Support et contacts

### 🆘 Escalade d'incidents

| Niveau | Criticité | Délai de réponse | Contact             |
| ------ | --------- | ---------------- | ------------------- |
| P1     | Critique  | 15 min           | [contact-urgence]   |
| P2     | Élevée    | 1 heure          | [contact-technique] |
| P3     | Normale   | 4 heures         | [contact-support]   |
| P4     | Faible    | 24 heures        | [contact-support]   |

### 📚 Ressources

- **Documentation technique** : `/docs/`
- **Logs système** : `/var/log/app.log`
- **Métriques** : Dashboard de monitoring
- **Sauvegardes** : `/backups/`

---

_Guide administrateur v1.0 - Dernière mise à jour : [Date actuelle]_
