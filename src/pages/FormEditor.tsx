import { useState } from 'react';
import { SaveIndicator, Breadcrumb } from '../components';
import { FormContract } from '../components/form_contract';
import { FormIststand } from '../components/form_iststand';
import { FormGoals } from '../components/form_goals';
import { FormSchoolGoals } from '../components/school_goals';
import { LoadTemplateIcon } from '../assets/icons';
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
  subject: string[];
  dataSources: string[];
  startDate: string;
  endDate: string;
  comments: string;
}
const GOAL_OPTIONS = [
  'Erhöhte Anzahl an Schülerinnen und Schülern erreichen mithilfe entsprechender Basiskompetenzen die Mindeststandards in Deutsch.',
  'Erhöhte Anzahl an Schülerinnen und Schülern gestalten mithilfe entsprechender sozialer und personaler Kompetenzen eine Wellbeing-Kultur an der Schule mit.',
  'Gesteigerte Umsetzung der Chancengerechtigkeit insbesondere im Bereich der Zusammenarbeit mit Eltern und Erziehungsberechtigten.',
  'Erhöhte Anzahl an Schülerinnen und Schülern erreichen einen Schulabschluss und beginnen eine anschließende Berufsausbildung.',
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
    borderBottom: `2px solid ${colors.border}`,
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
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle');
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
      subject: [],
      dataSources: [],
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
      subject: [],
      dataSources: [],
      startDate: '',
      endDate: '',
      comments: '',
    }
  ]);
  const [showDraftPicker, setShowDraftPicker] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(submissionId);

  // Contract party parameters (from authentication/context - these values change per user)
  const contractSchoolName = 'Zauberberg Grundschule';
  const contractSchoolLead = 'Dr. Monika Musterfrau';
  const contractSamt = 'Staatl. Schulamt Zauberberg';
  const contractProgramRep = 'Max Musterman';


  const triggerAutosave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const handleIstStandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIstStandAnalyse(e.target.value);
    triggerAutosave();
  };

  const handleSupportPersonnelChange = (value: boolean) => {
    setSupportPersonnel(value);
    if (!value) {
      setSupportTypes([]);
      setSupportOtherText('');
    }
    triggerAutosave();
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
    triggerAutosave();
  };

  const handleDataSourceChange = (source: string, checked: boolean) => {
    if (checked) {
      setDataSources(prev => [...prev, source]);
    } else {
      setDataSources(prev => prev.filter(s => s !== source));
    }
    triggerAutosave();
  };

  const handleModuleChange = (id: string, field: keyof QuestionModule, value: string | string[]) => {
    setQuestionModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );
    triggerAutosave();
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
    triggerAutosave();
  };

  const addQuestionModule = () => {
    if (questionModules.length >= GOAL_OPTIONS.length) {
      alert(`Es können maximal ${GOAL_OPTIONS.length} Zielmodule hinzugefügt werden.`);
      return;
    }
    setQuestionModules(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        goal: '',
        smartGoal: '',
        targetGroup: [],
        subject: [],
        dataSources: [],
        startDate: '',
        endDate: '',
        comments: '',
      }
    ]);
  };

  const removeQuestionModule = (id: string) => {
    setQuestionModules(prev => prev.filter(module => module.id !== id));
    triggerAutosave();
  };

  const getAvailableGoals = (currentModuleId: string) => {
    const selectedGoals = questionModules
      .filter(module => module.id !== currentModuleId && module.goal !== '')
      .map(module => module.goal);
    
    return GOAL_OPTIONS.filter(goal => !selectedGoals.includes(goal));
  };

  const handleSchoolGoalModuleChange = (id: string, field: keyof QuestionModule, value: string | string[]) => {
    setSchoolGoalModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
    );
    triggerAutosave();
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
    triggerAutosave();
  };

  const addSchoolGoalModule = () => {
    if (schoolGoalModules.length >= GOAL_OPTIONS.length) {
      alert(`Es können maximal ${GOAL_OPTIONS.length} Schulzielmodule hinzugefügt werden.`);
      return;
    }
    setSchoolGoalModules(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        goal: '',
        smartGoal: '',
        targetGroup: [],
        subject: [],
        dataSources: [],
        startDate: '',
        endDate: '',
        comments: '',
      }
    ]);
  };

  const removeSchoolGoalModule = (id: string) => {
    setSchoolGoalModules(prev => prev.filter(module => module.id !== id));
    triggerAutosave();
  };

  const getAvailableSchoolGoals = (currentModuleId: string) => {
    const selectedGoals = schoolGoalModules
      .filter(module => module.id !== currentModuleId && module.goal !== '')
      .map(module => module.goal);
    
    return GOAL_OPTIONS.filter(goal => !selectedGoals.includes(goal));
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
      setShowDraftPicker(false);
      setSaveStatus('saved');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formular eingereicht! (Mock - kein Backend)');
    onNavigate('history');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
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

      {mockDraft && !currentDraftId && !submissionId && (
        <div style={styles.draftInfoBox}>
          <button 
            onClick={() => setShowDraftPicker(true)}
            style={styles.button_draft}
          >
            <LoadTemplateIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Entwurf laden
          </button>
        </div>
      )}

      {/* Draft Load Confirmation Modal */}
      {showDraftPicker && mockDraft && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Entwurf laden?</h2>
            
            <div style={styles.draftCard}>
              <div style={styles.draftCard_title}>
                {(mockDraft.data.title as string) || 'Untitled'}
              </div>
              <div style={styles.draftCard_preview}>
                {(mockDraft.data.istStandAnalyse as string)?.substring(0, 150)}...
              </div>
              <div style={styles.draftCard_meta}>
                Zuletzt aktualisiert: {formatDate(mockDraft.updatedAt)}
              </div>
            </div>

            <div style={styles.footer}>
              <button
                onClick={() => setShowDraftPicker(false)}
                style={styles.button_secondary}
              >
                Abbrechen
              </button>
              <button
                onClick={loadDraft}
                style={styles.button_primary}
              >
                Entwurf laden
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header style={styles.header}>
        <h1 style={styles.header_title}>Neue Zielvereinbarung</h1>
        <div style={styles.header_meta}>
          <span style={styles.status_badge}>
            Entwurf {currentDraftId ? `(${currentDraftId})` : ''}
          </span>
          <SaveIndicator status={saveStatus} />
        </div>
      </header>

      <FormContract
        contractSchoolLead={contractSchoolLead}
        contractSchoolName={contractSchoolName}
        contractSamt={contractSamt}
        contractProgramRep={contractProgramRep}
      />

      <form onSubmit={handleSubmit}>
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
            triggerAutosave();
          }}
          onDataSourceChange={handleDataSourceChange}
        />

        <hr style={styles.hr} />

        <FormGoals
          questionModules={questionModules}
          goalOptions={GOAL_OPTIONS}
          onModuleChange={handleModuleChange}
          onModuleCheckboxChange={handleModuleCheckboxChange}
          onAddModule={addQuestionModule}
          onRemoveModule={removeQuestionModule}
          getAvailableGoals={getAvailableGoals}
        />

        <hr style={styles.hr} />

        <FormSchoolGoals
          questionModules={schoolGoalModules}
          goalOptions={GOAL_OPTIONS}
          onModuleChange={handleSchoolGoalModuleChange}
          onModuleCheckboxChange={handleSchoolGoalModuleCheckboxChange}
          onAddModule={addSchoolGoalModule}
          onRemoveModule={removeSchoolGoalModule}
          getAvailableGoals={getAvailableSchoolGoals}
        />

        <footer style={styles.footer}>
          <button type="button" onClick={() => onNavigate('landing')} style={styles.button_secondary}>
            Abbrechen
          </button>
          <button type="submit" style={styles.button_primary}>
            ZV einreichen
          </button>
        </footer>
      </form>
    </div>
  );
}
