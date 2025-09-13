import type { EditorData } from '~/features/editor';

export const createComplaintTemplate = (): EditorData => {
  return {
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Résumé du signalement',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Décrivez brièvement en une phrase la situation que vous souhaitez signaler.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Contexte et circonstances',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Quand et où cet incident s\'est-il produit ?'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Date et heure (si connues)',
            'Lieu précis',
            'Personnes présentes',
            'Circonstances particulières'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Description détaillée',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Décrivez en détail ce qui s\'est passé. Soyez aussi précis que possible.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Personnes impliquées',
          level: 2
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Nom(s) des personnes concernées (si vous les connaissez)',
            'Leur rôle/fonction',
            'Votre relation avec ces personnes (victime, témoin, autre)',
            'Autres témoins éventuels'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Impact et conséquences',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Quel a été l\'impact de cet incident sur vous ou sur d\'autres personnes ?'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Conséquences émotionnelles',
            'Conséquences professionnelles',
            'Conséquences physiques (si applicable)',
            'Autres impacts'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Preuves et documents',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Avez-vous des preuves ou des documents à joindre ? (captures d\'écran, emails, témoignages, etc.)'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Demandes et attentes',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Que souhaitez-vous voir se produire suite à ce signalement ?'
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Mesures disciplinaires',
            'Excuses',
            'Formation/sensibilisation',
            'Changements organisationnels',
            'Autre (précisez)'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Informations complémentaires',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Y a-t-il d\'autres informations importantes que vous souhaitez partager ?'
        }
      },
      {
        type: 'delimiter',
        data: {}
      },
      {
        type: 'paragraph',
        data: {
          text: 'Merci de votre confiance. Votre signalement sera traité avec la plus grande attention et dans le respect de la confidentialité.'
        }
      }
    ]
  };
};

export const createUrgentComplaintTemplate = (): EditorData => {
  return {
    blocks: [
      {
        type: 'header',
        data: {
          text: 'SIGNALEMENT URGENT',
          level: 1
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Décrivez brièvement la situation urgente qui nécessite une intervention immédiate.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Informations essentielles',
          level: 2
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Quand : Date et heure',
            'Où : Lieu précis',
            'Qui : Personnes impliquées',
            'Quoi : Description de l\'incident',
            'Pourquoi : Raison de l\'urgence'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Action immédiate requise',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Quelle action immédiate attendez-vous de notre part ?'
        }
      }
    ]
  };
};

export const createHarassmentComplaintTemplate = (): EditorData => {
  return {
    blocks: [
      {
        type: 'header',
        data: {
          text: 'Signalement de harcèlement',
          level: 1
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Ce template vous guide pour signaler un cas de harcèlement. Remplissez chaque section avec les informations dont vous disposez.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Type de harcèlement',
          level: 2
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Harcèlement moral',
            'Harcèlement sexuel',
            'Harcèlement discriminatoire',
            'Cyberharcèlement',
            'Autre (précisez)'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Chronologie des événements',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Décrivez les incidents dans l\'ordre chronologique. Incluez les dates, lieux et détails de chaque événement.'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Auteur(s) du harcèlement',
          level: 2
        }
      },
      {
        type: 'list',
        data: {
          style: 'unordered',
          items: [
            'Nom et fonction de la personne',
            'Votre relation avec cette personne',
            'Comportements observés',
            'Témoins des faits'
          ]
        }
      },
      {
        type: 'header',
        data: {
          text: 'Impact sur votre bien-être',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Comment ce harcèlement affecte-t-il votre travail et votre bien-être personnel ?'
        }
      },
      {
        type: 'header',
        data: {
          text: 'Actions déjà entreprises',
          level: 2
        }
      },
      {
        type: 'paragraph',
        data: {
          text: 'Avez-vous déjà tenté de résoudre cette situation ? Si oui, comment ?'
        }
      }
    ]
  };
};

export const COMPLAINT_TEMPLATES = {
  STANDARD: 'standard',
  URGENT: 'urgent',
  HARASSMENT: 'harassment'
} as const;

export type ComplaintTemplateType = typeof COMPLAINT_TEMPLATES[keyof typeof COMPLAINT_TEMPLATES];

export const getComplaintTemplate = (type: ComplaintTemplateType): EditorData => {
  switch (type) {
    case COMPLAINT_TEMPLATES.URGENT:
      return createUrgentComplaintTemplate();
    case COMPLAINT_TEMPLATES.HARASSMENT:
      return createHarassmentComplaintTemplate();
    case COMPLAINT_TEMPLATES.STANDARD:
    default:
      return createComplaintTemplate();
  }
};
