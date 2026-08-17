export type SubmissionStatus = 'draft' | 'submitted';

export interface QuestionModule {
  id: string;
  smartGoal: string;
  targetGroup: string[];
  targetGroupOther: string;
  subject: string[];
  subjectOther: string;
  dataSources: string[];
  dataSourcesOther: string;
  startDate: string;
  endDate: string;
  comments: string;
}

export interface MeasureModule {
  id: string;
  description: string;
  type: string;
  responsible: string;
  involved: string[];
  resources: string[];
  resourcesDescription: string;
  workMethod: string[];
  workMethodDescription: string;
  deadline: string;
}

export interface FormData {
  title?: string;
  istStandAnalyse: string;
  supportPersonnel: boolean;
  supportTypes: string[];
  supportOtherText: string;
  dataSources: string[];
  selectedGoal: string;
  selectedSchoolGoal: string;
  questionModules: QuestionModule[];
  schoolGoalModules: QuestionModule[];
  measureModules: MeasureModule[];
  evaluationDate: string;
  bilanzierungDate: string;
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
