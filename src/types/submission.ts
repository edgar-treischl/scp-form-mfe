export type SubmissionStatus = 'draft' | 'submitted';

export interface FormData {
  // Form fields will be defined here
  // Placeholder for now
  [key: string]: unknown;
}

export interface Submission {
  id: string;
  owner: string;
  status: SubmissionStatus;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
  data: FormData;
}
