import { useState } from 'react';
import { Breadcrumb } from '../components';
import { FormContract } from '../components/form_contract';
import { FormCallout } from '../components/form_callout';
import { FormIststand } from '../components/form_iststand';
import { FormGoals } from '../components/form_goals';
import { FormSchoolGoals } from '../components/form_school_goals';
import { FormMeasure } from '../components/form_measure';
import { FormEvaluation } from '../components/form_evaluation';

import type { Submission } from '../types';

interface FormEditorProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view' | 'about') => void;
  submissionId?: string;
}

interface QuestionModule {
  id: string;
  goal: string;
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

interface MeasureModule {
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

const FORM_GOAL_OPTIONS = [
  'Erhöhte Anzahl an Schülerinnen und Schülern erreichen mithilfe entsprechender Basiskompetenzen die Mindeststandards in Deutsch.',
  'Erhöhte Anzahl an Schülerinnen und Schülern gestalten mithilfe entsprechender sozialer und personaler Kompetenzen eine Wellbeing-Kultur an der Schule mit.',
  'Gesteigerte Umsetzung der Chancengerechtigkeit insbesondere im Bereich der Zusammenarbeit mit Eltern und Erziehungsberechtigten.',
  'Erhöhte Anzahl an Schülerinnen und Schülern erreichen einen Schulabschluss und beginnen eine anschließende Berufsausbildung.',
];

const SCHOOL_GOAL_OPTIONS = [
  'Die Schulgemeinschaft verfolgt die Gestaltung einer positiven Schulkultur und die Entwicklung der Schule hin zu einem förderlichen Lern- und Sozialraum als handlungsleitendes Grundprinzip.',
  'An der Schule sind Verfahren nachhaltig angelegter, ko-konstruktiver Professionalisierung implementiert.',
  'Von der Schule werden nachhaltig angelegte außerschulische und schul(art)übergreifende Netzwerke und Unterstützungssysteme wirksam und zielorientiert genutzt.',
  'Innerhalb der Schule sind mittel- und langfristig Verfahren systematischer Qualitätsentwicklung unter Einbezug datengestützter Verfahren etabliert.',
];

// Professional color palette
const colors = {
  primary: '#1E8AD9',
  success: '#64D4C6',
  danger: '#dc3545',
  warning: '#ffc107',
  neutral: '#f8f9fa',
  border: '#dee2e6',
  text: '#212529',
  textMuted: '#6c757d',
  disabled: '#e9ecef',
};
const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    marginBottom: '2rem',
    paddingBottom: '1.5rem',
  },
  header_title: {
    fontSize: '2rem',
    fontWeight: '600',
    lineHeight: '1.25',
    color: colors.text,
    margin: 0,
    marginBottom: '0.5rem',
  },
  header_meta: {
    display: 'flex' as const,
    gap: '1rem',
    alignItems: 'center',
    marginTop: '1rem',
  },
  status_badge: {
    padding: '0.35rem 0.75rem',
    background: colors.warning,
    color: '#000',
    borderRadius: '4px',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  section: {
    marginBottom: '2.5rem',
  },
  section_title: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: colors.text,
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block' as const,
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: colors.text,
    fontSize: '0.95rem',
  },
  required: {
    color: colors.danger,
  },
  input: {
    width: '100%',
    padding: '0.65rem 0.75rem',
    fontSize: '0.95rem',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '0.95rem',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    transition: 'border-color 0.2s',
  },
  moduleCard: {
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    background: '#fff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  module_header: {
    display: 'flex' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  module_title: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: colors.text,
    margin: 0,
  },
  button_primary: {
    padding: '0.75rem 1.5rem',
    background: colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s',
  },
  button_secondary: {
    padding: '0.5rem 1.5rem',
    background: colors.neutral,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s',
  },
  button_success: {
    width: '100%',
    padding: '0.85rem 1.5rem',
    background: colors.success,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'all 0.2s',
  },
  button_success_disabled: {
    width: '100%',
    padding: '0.85rem 1.5rem',
    background: colors.disabled,
    color: colors.textMuted,
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    fontWeight: '500',
    fontSize: '0.95rem',
  },
  button_danger: {
    padding: '0.35rem 0.75rem',
    background: colors.danger,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
  },
  button_draft: {
    padding: '0.65rem 1rem',
    background: '#fff8e1',
    border: `1px solid ${colors.warning}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.95rem',
    transition: 'background-color 0.2s',
  },
  draftInfoBox: {
    marginBottom: '1.5rem',
  },
  modalOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
  },
  modalTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: colors.text,
    margin: '0 0 1.5rem 0',
  },
  draftCard: {
    background: colors.neutral,
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    padding: '1rem',
    marginBottom: '1.5rem',
  },
  draftCard_title: {
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: colors.text,
  },
  draftCard_preview: {
    fontSize: '0.9rem',
    color: colors.textMuted,
    marginBottom: '0.75rem',
  },
  draftCard_meta: {
    fontSize: '0.85rem',
    color: colors.textMuted,
  },
  fieldGroup: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '1.5rem',
  },
  fieldRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  footer: {
    display: 'flex' as const,
    gap: '1rem',
    justifyContent: 'flex-end',
    marginTop: '2rem',
    paddingTop: '1.5rem',
    borderTop: `1px solid ${colors.border}`,
  },
  hr: {
    border: 'none',
    borderTop: `1px solid ${colors.border}`,
    margin: '2rem 0',
  },
  contractSection: {
    border: `2px solid ${colors.primary}`,
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  contractTitle: {
    fontSize: '1.1rem',
    fontWeight: '700',
    color: colors.primary,
    marginBottom: '1rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  contractPreview: {
    fontSize: '0.95rem',
    lineHeight: '1.8',
    color: colors.text,
    fontStyle: 'italic' as const,
  },
  contractValue: {
    borderBottom: `2px solid ${colors.primary}`,
    color: colors.text,
    fontWeight: '600',
    fontStyle: 'normal' as const,
    paddingBottom: '2px',
  },
  contractInputsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  contractInputWrapper: {
    display: 'flex' as const,
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  contractLabel: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: colors.primary,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.3px',
  },
};

// Mock draft - would come from API (user can only have one draft)
const mockDraft: Submission | null = {
  id: '002',
  owner: 'maria.schmidt@organisation.de',
  status: 'draft',
  version: 1,
  createdAt: new Date('2026-07-28T09:15:00'),
  updatedAt: new Date('2026-07-28T09:45:00'),
  data: {
    title: 'Zielvereinbarung 2026',
    istStandAnalyse: 'Erste Erkenntnisse aus der laufenden Periode...',
    supportPersonnel: true,
    supportTypes: ['SEM', 'BDA'],
    supportOtherText: '',
    dataSources: ['Schulstatistiken (z. B. ASV/ASD)', 'Zentrale Lernstandserhebungen (z. B. VERA, BYLES, Lernstand 5, Orientierungsarbeiten)'],
    moduleCount: 1,
  },
};

export function FormEditor({ onNavigate, submissionId }: FormEditorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [istStandAnalyse, setIstStandAnalyse] = useState('');
  const [supportPersonnel, setSupportPersonnel] = useState<boolean | ''>('');
  const [supportTypes, setSupportTypes] = useState<string[]>([]);
  const [supportOtherText, setSupportOtherText] = useState('');
  const [dataSources, setDataSources] = useState<string[]>([]);
  const [questionModules, setQuestionModules] = useState<QuestionModule[]>([
    {
      id: crypto.randomUUID(),
      goal: '',
      smartGoal: '',
      targetGroup: [],
      targetGroupOther: '',
      subject: [],
      subjectOther: '',
      dataSources: [],
      dataSourcesOther: '',
      startDate: '',
      endDate: '',
      comments: '',
    }
  ]);
  const [schoolGoalModules, setSchoolGoalModules] = useState<QuestionModule[]>([
    {
      id: crypto.randomUUID(),
      goal: '',
      smartGoal: '',
      targetGroup: [],
      targetGroupOther: '',
      subject: [],
      subjectOther: '',
      dataSources: [],
      dataSourcesOther: '',
      startDate: '',
      endDate: '',
      comments: '',
    }
  ]);
  const [measureModules, setMeasureModules] = useState<MeasureModule[]>([
    {
      id: crypto.randomUUID(),
      description: '',
      type: '',
      responsible: '',
      involved: [],
      resources: [],
      resourcesDescription: '',
      workMethod: [],
      workMethodDescription: '',
      deadline: '',
    }
  ]);
  const [evaluationDate, setEvaluationDate] = useState('');
  const [bilanzierungDate, setBilanzierungDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(submissionId);

  // Contract party parameters (from authentication/context - these values change per user)
  const contractSchoolName = 'Zauberberg Grundschule';
  const contractSchoolLead = 'Dr. Monika Musterfrau';
  const contractSamt = 'Staatl. Schulamt Zauberberg';
  const contractProgramRep = 'Max Musterman';

  // Define form steps
  const steps = [
    { id: 'landing', title: 'Zielvereinbarung starten', component: 'landing' },
    { id: 'iststand', title: 'IST-Stand Analyse', component: 'iststand' },
    { id: 'goals', title: 'Individualziele', component: 'goals' },
    { id: 'schoolGoals', title: 'Schulziele', component: 'schoolGoals' },
    { id: 'measures', title: 'Maßnahmen', component: 'measures' },
    { id: 'evaluation', title: 'Evaluierung', component: 'evaluation' },
    { id: 'callout', title: 'Hinweis', component: 'callout' },
  ];

  const totalSteps = steps.length;
  const currentStepData = steps[currentStep];

  const handleStartNew = () => {
    setCurrentDraftId(undefined);
    handleNextStep();
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleIstStandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIstStandAnalyse(e.target.value);
  };

  const handleSupportPersonnelChange = (value: boolean) => {
    setSupportPersonnel(value);
    if (!value) {
      setSupportTypes([]);
      setSupportOtherText('');
    }

  };

  const handleSupportTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSupportTypes(prev => [...prev, type]);
    } else {
      setSupportTypes(prev => prev.filter(t => t !== type));
      if (type === 'Sonstige') {
        setSupportOtherText('');
      }
    }

  };

  const handleDataSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setDataSources(prev => [...prev, source]);
    } else {
      setDataSources(prev => prev.filter(s => s !== source));
    }

  };

  const handleModuleChange = (id: string, field: keyof QuestionModule, value: string | string[]) => {
    setQuestionModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );

  };

  const handleModuleCheckboxChange = (id: string, field: 'targetGroup' | 'subject' | 'dataSources', option: string) => {
    setQuestionModules(prev =>
      prev.map(module => {
        if (module.id === id) {
          const currentArray = module[field];
          return {
            ...module,
            [field]: currentArray.includes(option)
              ? currentArray.filter(item => item !== option)
              : [...currentArray, option]
          };
        }
        return module;
      })
    );

  };

  const addQuestionModule = () => {
    if (questionModules.length >= FORM_GOAL_OPTIONS.length) {
      alert(`Es können maximal ${FORM_GOAL_OPTIONS.length} Zielmodule hinzugefügt werden.`);
      return;
    }
    setQuestionModules(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        goal: '',
        smartGoal: '',
        targetGroup: [],
        targetGroupOther: '',
        subject: [],
        subjectOther: '',
        dataSources: [],
        dataSourcesOther: '',
        startDate: '',
        endDate: '',
        comments: '',
      }
    ]);
  };

  const removeQuestionModule = (id: string) => {
    setQuestionModules(prev => prev.filter(module => module.id !== id));

  };

  const getAvailableGoals = (currentModuleId: string) => {
    const selectedGoals = questionModules
      .filter(module => module.id !== currentModuleId && module.goal !== '')
      .map(module => module.goal);
    
    return FORM_GOAL_OPTIONS.filter(goal => !selectedGoals.includes(goal));
  };

  const handleSchoolGoalModuleChange = (id: string, field: keyof QuestionModule, value: string | string[]) => {
    setSchoolGoalModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );

  };

  const handleSchoolGoalModuleCheckboxChange = (id: string, field: 'targetGroup' | 'subject' | 'dataSources', option: string) => {
    setSchoolGoalModules(prev =>
      prev.map(module => {
        if (module.id === id) {
          const currentArray = module[field];
          return {
            ...module,
            [field]: currentArray.includes(option)
              ? currentArray.filter(item => item !== option)
              : [...currentArray, option]
          };
        }
        return module;
      })
    );

  };

  const addSchoolGoalModule = () => {
    if (schoolGoalModules.length >= SCHOOL_GOAL_OPTIONS.length) {
      alert(`Es können maximal ${SCHOOL_GOAL_OPTIONS.length} Schulzielmodule hinzugefügt werden.`);
      return;
    }
    setSchoolGoalModules(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        goal: '',
        smartGoal: '',
        targetGroup: [],
        targetGroupOther: '',
        subject: [],
        subjectOther: '',
        dataSources: [],
        dataSourcesOther: '',
        startDate: '',
        endDate: '',
        comments: '',
      }
    ]);
  };

  const removeSchoolGoalModule = (id: string) => {
    setSchoolGoalModules(prev => prev.filter(module => module.id !== id));

  };

  const getAvailableSchoolGoals = (currentModuleId: string) => {
    const selectedGoals = schoolGoalModules
      .filter(module => module.id !== currentModuleId && module.goal !== '')
      .map(module => module.goal);
    
    return SCHOOL_GOAL_OPTIONS.filter(goal => !selectedGoals.includes(goal));
  };

  const handleMeasureModuleChange = (id: string, field: keyof MeasureModule, value: string | string[]) => {
    setMeasureModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );

  };

  const handleMeasureModuleCheckboxChange = (id: string, field: 'involved' | 'resources' | 'workMethod', option: string) => {
    setMeasureModules(prev =>
      prev.map(module => {
        if (module.id === id) {
          const currentArray = module[field];
          return {
            ...module,
            [field]: currentArray.includes(option)
              ? currentArray.filter(item => item !== option)
              : [...currentArray, option]
          };
        }
        return module;
      })
    );

  };

  const addMeasureModule = () => {
    if (measureModules.length >= 5) {
      alert('Es können maximal 5 Maßnahmen hinzugefügt werden.');
      return;
    }
    setMeasureModules(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description: '',
        type: '',
        responsible: '',
        involved: [],
        resources: [],
        resourcesDescription: '',
        workMethod: [],
        workMethodDescription: '',
        deadline: '',
      }
    ]);
  };

  const removeMeasureModule = (id: string) => {
    setMeasureModules(prev => prev.filter(module => module.id !== id));

  };

  const loadDraft = () => {
    if (mockDraft) {
      // Load draft data into form
      setIstStandAnalyse((mockDraft.data.istStandAnalyse as string) || '');
      setSupportPersonnel((mockDraft.data.supportPersonnel as boolean) || false);
      setSupportTypes((mockDraft.data.supportTypes as string[]) || []);
      setSupportOtherText((mockDraft.data.supportOtherText as string) || '');
      setDataSources((mockDraft.data.dataSources as string[]) || []);
      setCurrentDraftId(mockDraft.id);
      // Move to contract step (step 1) after loading draft
      setCurrentStep(1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formular eingereicht! (Mock - kein Backend)');
    onNavigate('history');
  };

  const handleEvaluationDateChange = (date: string) => {
    setEvaluationDate(date);

  };

  const handleBilanzierungDateChange = (date: string) => {
    setBilanzierungDate(date);

  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);

  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));

  };

  const getBreadcrumbItems = () => {
    if (submissionId) {
      // Editing existing submission
      return [
        { label: 'Start', onClick: () => onNavigate('landing') },
        { label: 'Neu' }
      ];
    } else {
      // New form
      return [
        { label: 'Start', onClick: () => onNavigate('landing') },
        { label: 'Neu' }
      ];
    }
  };

  return (
    <div style={styles.container}>
      <Breadcrumb items={getBreadcrumbItems()} />
      
      <header style={styles.header}>
        <div style={styles.header_meta}>
          {currentStep > 0 && (
            <span style={styles.status_badge}>
              Schritt {currentStep} von {totalSteps - 1}: {currentStepData.title}
            </span>
          )}
        </div>
      </header>

      {/* Landing Step - Show Contract then offer Load or Create New */}
      {currentStep === 0 && (
        <FormContract
          contractSchoolLead={contractSchoolLead}
          contractSchoolName={contractSchoolName}
          contractSamt={contractSamt}
          contractProgramRep={contractProgramRep}
          onStartNew={handleStartNew}
          onLoadDraft={loadDraft}
          showDraftButton={!!(mockDraft && !currentDraftId && !submissionId)}
          buttonStyles={{
            button_primary: styles.button_primary,
            button_draft: styles.button_draft,
          }}
        />
      )}

      <form onSubmit={handleSubmit} style={{ display: currentStep === 0 ? 'none' : 'block' }}>
        {/* IST-Stand Analysis Step */}
        {currentStep === 1 && (
          <FormIststand
            istStandAnalyse={istStandAnalyse}
            supportPersonnel={supportPersonnel}
            supportTypes={supportTypes}
            supportOtherText={supportOtherText}
            dataSources={dataSources}
            onIstStandChange={(value) =>
              handleIstStandChange({ target: { value } } as React.ChangeEvent<HTMLTextAreaElement>)
            }
            onSupportPersonnelChange={handleSupportPersonnelChange}
            onSupportTypeChange={handleSupportTypeChange}
            onSupportOtherTextChange={(val) => {
              setSupportOtherText(val);

            }}
            onDataSourceChange={handleDataSourceChange}
          />
        )}

        {/* Individual Goals Step */}
        {currentStep === 2 && (
          <FormGoals
            questionModules={questionModules}
            onModuleChange={handleModuleChange}
            onModuleCheckboxChange={handleModuleCheckboxChange}
            onAddModule={addQuestionModule}
            onRemoveModule={removeQuestionModule}
            getAvailableGoals={getAvailableGoals}
            goalOptions={FORM_GOAL_OPTIONS}
          />
        )}

        {/* School Goals Step */}
        {currentStep === 3 && (
          <FormSchoolGoals
            questionModules={schoolGoalModules}
            onModuleChange={handleSchoolGoalModuleChange}
            onModuleCheckboxChange={handleSchoolGoalModuleCheckboxChange}
            onAddModule={addSchoolGoalModule}
            onRemoveModule={removeSchoolGoalModule}
            getAvailableGoals={getAvailableSchoolGoals}
            goalOptions={SCHOOL_GOAL_OPTIONS}
          />
        )}

        {/* Measures Step */}
        {currentStep === 4 && (
          <FormMeasure
            measureModules={measureModules}
            onModuleChange={handleMeasureModuleChange}
            onModuleCheckboxChange={handleMeasureModuleCheckboxChange}
            onAddModule={addMeasureModule}
            onRemoveModule={removeMeasureModule}
          />
        )}

        {/* Evaluation Step */}
        {currentStep === 5 && (
          <FormEvaluation
            evaluationDate={evaluationDate}
            bilanzierungDate={bilanzierungDate}
            uploadedFiles={uploadedFiles}
            onEvaluationDateChange={handleEvaluationDateChange}
            onBilanzierungDateChange={handleBilanzierungDateChange}
            onFileUpload={handleFileUpload}
            onFileRemove={handleFileRemove}
          />
        )}

        {/* Callout Step */}
        {currentStep === 6 && (
          <FormCallout
            title="Hinweis: Weitere Fragen zur Datengestützte Bilanzierung pro Teilziel"
            message="Das Formular zur Bilanzierung pro Teilziel ist nicht implementiert."
          />
        )}

        {/* Step Navigation Footer */}
        <footer style={styles.footer}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
            <button 
              type="button" 
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              style={{
                ...styles.button_secondary,
                ...(currentStep === 0 && { opacity: 0.5, cursor: 'not-allowed' })
              }}
            >
              ← Zurück
            </button>
            {currentStep > 0 && (
              <span style={{ color: colors.textMuted, fontSize: '0.9rem', minWidth: '80px' }}>
                Schritt {currentStep} / {totalSteps - 1}
              </span>
            )}
            <button 
              type="button" 
              onClick={handleNextStep}
              disabled={currentStep === totalSteps - 1}
              style={{
                ...styles.button_secondary,
                ...(currentStep === totalSteps - 1 && { opacity: 0.5, cursor: 'not-allowed' })
              }}
            >
              Weiter →
            </button>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" onClick={() => onNavigate('landing')} style={styles.button_secondary}>
              Abbrechen
            </button>
            {currentStep === totalSteps - 1 && (
              <button type="submit" style={styles.button_primary}>
                ZV einreichen
              </button>
            )}
          </div>
        </footer>
      </form>
    </div>
  );
}
