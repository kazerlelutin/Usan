export interface FileTrackingActivity {
  id: string;
  action: string;
  actorType: string;
  actorName: string;
  createdAt: Date;
  decryptedContent: string;
}

export interface FileTracking {
  id: string;
  code: string;
  content: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  activities?: FileTrackingActivity[];
}