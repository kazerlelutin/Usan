# 📋 Guide Utilisateur - Système de Gestion des Plaintes

## 🎯 Vue d'ensemble

Le système de gestion des plaintes permet aux victimes et témoins de remonter des événements problématiques de manière sécurisée et traçable. Il est conçu pour garantir la confidentialité, la traçabilité et un traitement équitable des plaintes.

## 🏠 Pour les Plaignants

### 📝 Déposer une plainte

1. **Accédez à la page d'accueil** de l'application
2. **Rédigez votre plainte** dans l'éditeur de texte riche :
   - Utilisez les outils de formatage (gras, italique, listes, etc.)
   - Soyez précis et factuel dans vos descriptions
   - Incluez les dates, lieux et personnes concernées
3. **Cliquez sur "Soumettre"**
4. **⚠️ IMPORTANT** : Notez précieusement votre **code de suivi unique** !

### 🔍 Suivre votre plainte

1. **Utilisez votre code de suivi** pour accéder à l'URL : `/complaints/[votre-code]`
2. **Consultez l'historique** des étapes de traitement
3. **Vérifiez le statut** actuel de votre plainte
4. **Lisez les communications** des agents traitant votre dossier

### 📊 Statuts des plaintes

| Statut                     | Description | Signification                                                 |
| -------------------------- | ----------- | ------------------------------------------------------------- |
| **Soumis**                 | 🟢          | Votre plainte a été reçue et enregistrée                      |
| **En cours d'enquête**     | 🟡          | Un inspecteur traite activement votre dossier                 |
| **En attente de jugement** | 🔵          | Une recommandation a été faite, en attente de décision finale |
| **Fermé**                  | ⚫          | Décision finale prise, le dossier est clos                    |

### 💡 Conseils pour les plaignants

- **Soyez précis** : Incluez tous les détails pertinents
- **Restez factuel** : Évitez les jugements de valeur
- **Conservez votre code** : C'est votre seul moyen de suivre votre plainte
- **Vérifiez régulièrement** : Le statut peut évoluer rapidement

## 👨‍💼 Pour les Inspecteurs

### 🔐 Accès à l'interface

1. **Connectez-vous** avec votre compte Discord ayant le rôle "inspector"
2. **Accédez à l'interface admin** via `/admin`
3. **Consultez la liste** des plaintes avec pagination

### 📋 Actions disponibles

#### Ajouter une note

- **Quand** : Pendant l'investigation
- **Objectif** : Documenter vos recherches et constatations
- **Effet** : Le statut passe automatiquement à "En cours d'enquête"

#### Faire une recommandation

- **Quand** : Après avoir terminé l'investigation
- **Objectif** : Proposer une décision au juge
- **Effet** : Le statut passe automatiquement à "En attente de jugement"

#### Changer le statut manuellement

- **Statuts disponibles** : "En cours d'enquête", "En attente de jugement", "Fermé"
- **Utilisation** : Pour des cas particuliers nécessitant un changement de statut direct

### 🔄 Workflow recommandé

1. **Consultez la plainte** et son historique complet
2. **Ajoutez des notes** sur vos investigations au fur et à mesure
3. **Faites une recommandation** une fois l'investigation terminée
4. **Le statut se met à jour automatiquement** selon vos actions

### 📝 Bonnes pratiques

- **Documentez tout** : Chaque étape de votre investigation doit être tracée
- **Soyez objectif** : Basez vos recommandations sur les faits
- **Respectez les délais** : Traitez les dossiers dans des délais raisonnables
- **Communiquez clairement** : Vos notes seront visibles par le plaignant

## ⚖️ Pour les Juges

### 🔐 Accès restreint

1. **Connectez-vous** avec votre compte Discord ayant le rôle "judge"
2. **Accès limité** : Vous ne voyez que les plaintes "En attente de jugement" ou "Fermées"
3. **Interface identique** à celle des inspecteurs mais avec des actions limitées

### 📋 Actions disponibles

#### Ajouter une note

- **Quand** : Pour documenter votre analyse
- **Objectif** : Expliquer votre raisonnement
- **Visibilité** : Visible par le plaignant

#### Prendre une décision

- **Quand** : Après avoir analysé la plainte et la recommandation
- **Objectif** : Décision finale sur la plainte
- **Effet** : Le statut passe automatiquement à "Fermé"

#### Changer le statut

- **Statuts disponibles** : "En cours d'enquête", "En attente de jugement", "Fermé"
- **Utilisation** : Pour des cas nécessitant un retour en arrière

### 🔄 Workflow recommandé

1. **Consultez la plainte** et la recommandation de l'inspecteur
2. **Ajoutez votre analyse** si nécessaire
3. **Prenez une décision finale** claire et motivée
4. **Le statut passe automatiquement** à "Fermé"

### ⚖️ Responsabilités

- **Décision finale** : Vous avez la responsabilité de la décision
- **Motivation** : Expliquez clairement votre raisonnement
- **Équité** : Basez vos décisions sur les faits et la réglementation
- **Confidentialité** : Respectez la confidentialité des informations

## 🔒 Sécurité et Confidentialité

### 🛡️ Mesures de sécurité

- **Chiffrement** : Toutes les plaintes sont chiffrées avant stockage
- **Accès contrôlé** : Seuls les rôles autorisés peuvent accéder aux interfaces
- **Authentification** : Connexion obligatoire via Discord
- **Traçabilité** : Toutes les actions sont enregistrées avec horodatage

### 🔐 Confidentialité

- **Immutabilité** : Les activités ne peuvent pas être modifiées après création
- **Audit trail** : Historique complet de toutes les actions
- **Séparation des rôles** : Inspecteurs et juges ont des accès différents
- **Chiffrement bout en bout** : Protection des données sensibles

### 📱 Notifications

- **Discord** : Les nouvelles activités sont notifiées via webhook Discord
- **Liens directs** : Chaque notification contient un lien vers la plainte concernée
- **Temps réel** : Notifications instantanées pour un suivi efficace

## 🚨 Gestion des incidents

### ⚠️ Problèmes techniques

- **Code de suivi perdu** : Contactez l'administrateur système
- **Accès refusé** : Vérifiez vos rôles Discord
- **Erreurs d'affichage** : Rechargez la page ou contactez le support

### 📞 Support

- **Problèmes techniques** : Contactez l'équipe technique
- **Questions sur le processus** : Consultez ce guide ou contactez un administrateur
- **Urgences** : Utilisez les canaux de communication d'urgence de l'organisation

## 📈 Métriques et rapports

### 📊 Tableaux de bord

- **Inspecteurs** : Vue d'ensemble des dossiers en cours
- **Juges** : Dossiers en attente de décision
- **Administrateurs** : Statistiques globales et métriques de performance

### 📋 Rapports

- **Temps de traitement** : Suivi des délais de traitement
- **Volume de plaintes** : Statistiques mensuelles/annuelles
- **Taux de résolution** : Efficacité du système

## 🔄 Mises à jour et évolutions

### 📝 Changelog

Le système évolue régulièrement. Consultez le changelog pour les nouvelles fonctionnalités.

### 💡 Suggestions d'amélioration

- **Feedback utilisateur** : Vos retours sont précieux
- **Nouvelles fonctionnalités** : Propositions via les canaux appropriés
- **Formation** : Sessions de formation disponibles sur demande

---

## 📞 Contact et Support

Pour toute question ou problème :

- **Support technique** : [contact-technique@organisation.fr]
- **Questions process** : [contact-process@organisation.fr]
- **Urgences** : [contact-urgence@organisation.fr]

---

_Dernière mise à jour : [Date actuelle]_
_Version du guide : 1.0_
