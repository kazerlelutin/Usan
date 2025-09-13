import { mysqlTable, varchar, longtext, timestamp } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';


export const complaints = mysqlTable('complaints', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  accessCode: longtext('access_code').notNull().unique(), // Code pour le plaignant
  encryptedContent: longtext('encrypted_content').notNull(), // Contenu chiffré de la plainte
  status: varchar('status', { length: 50 }).notNull().default('submitted'), // submitted, under_investigation, awaiting_judgment, closed
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
});


export const activityLogs = mysqlTable('activity_logs', {
  id: varchar('id', { length: 128 }).primaryKey().$defaultFn(() => createId()),
  complaintId: varchar('complaint_id', { length: 128 }).notNull(),
  action: varchar('action', { length: 100 }).notNull(), // submitted, status_changed, note_added, question_asked, response_added, etc.
  actorType: varchar('actor_type', { length: 50 }).notNull(), // complainant, inspector, judge, system
  actorId: varchar('actor_id', { length: 128 }), // ID Discord de l'acteur (null pour complainant)
  actorName: varchar('actor_name', { length: 255 }), // Nom affiché de l'acteur
  encryptedContent: longtext('encrypted_content').notNull(), // Détails de l'action chiffrés
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

//TODO move to feature

export type Complaint = typeof complaints.$inferSelect;
export type NewComplaint = typeof complaints.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;


export const COMPLAINT_STATUS = {
  SUBMITTED: 'submitted',
  UNDER_INVESTIGATION: 'under_investigation',
  AWAITING_JUDGMENT: 'awaiting_judgment',
  CLOSED: 'closed'
} as const;

// Types d'actions possibles
export const ACTIVITY_ACTIONS = {
  SUBMITTED: 'submitted',
  STATUS_CHANGED: 'status_changed',
  NOTE_ADDED: 'note_added',
  QUESTION_ASKED: 'question_asked',
  RESPONSE_ADDED: 'response_added',
  ASSIGNED_TO_INSPECTOR: 'assigned_to_inspector',
  ASSIGNED_TO_JUDGE: 'assigned_to_judge',
  RECOMMENDATION_ADDED: 'recommendation_added',
  DECISION_MADE: 'decision_made'
} as const;

export const ACTOR_TYPES = {
  COMPLAINANT: 'complainant',
  INSPECTOR: 'inspector',
  JUDGE: 'judge',
  SYSTEM: 'system'
} as const;

// Relations Drizzle
export const complaintsRelations = relations(complaints, ({ many }) => ({
  activityLogs: many(activityLogs),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  complaint: one(complaints, {
    fields: [activityLogs.complaintId],
    references: [complaints.id],
  }),
}));