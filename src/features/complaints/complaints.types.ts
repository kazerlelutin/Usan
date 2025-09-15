import type { OutputData } from '@editorjs/editorjs';
export interface ComplaintFormData {
  content: OutputData;
  captcha?: string;
}

export interface ComplaintSubmission {
  id: string;
  accessCode: string;
  encryptedContent: string;
  status: string;
  createdAt: Date;
}

export type { EditorContent } from '~/features/editor';

export interface EncryptionResult {
  encrypted: string;
  key: string;
}

export interface DecryptionResult {
  decrypted: string;
}
