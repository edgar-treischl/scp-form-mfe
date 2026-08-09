import { useState } from 'react';
import { SaveIndicator, Breadcrumb } from '../components';
import { LoadTemplateIcon } from '../assets/icons';
import type { Submission } from '../types';

interface FormEditorProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
  submissionId?: string;
}

interface QuestionModule {
  id: string;
  goal: string;
  indicators: string;
  startDate: string;
  endDate: string;
  evaluation: string;
  comments: string;
}

const GOAL_OPTIONS = [
  'Individuelle Ebene – Ziel 1',
  'Individuelle Ebene – Ziel 2',
  'Individuelle Ebene – Ziel 3',
  'Individuelle Ebene – Ziel 4',
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

// Reusable style objects
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
    fontSize: '1.1rem',
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
  button_secondary: {
    padding: '0.5rem 1.5rem',
    background: colors.neutral,
    color: colors.text,
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    cursor: 'pointer',
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
};

// Mock draft - would come from API (user can only have one draft)
const mockDraft: Submission | null = {
  id: 'sub-002',
  owner: 'maria.schmidt@organisation.de',
  status: 'draft',
  version: 1,
  createdAt: new Date('2020-07-28T09:15:00'),
  updatedAt: new Date('2020-07-28T09:45:00'),
  data: {
    title: 'Zielvereinbarung 2020',
    istStandAnalyse: 'Erste Erkenntnisse aus der laufenden Periode...',
    moduleCount: 1,
  },
};

export function FormEditor({ onNavigate, submissionId }: FormEditorProps) {
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle');
  const [istStandAnalyse, setIstStandAnalyse] = useState('');
  const [questionModules, setQuestionModules] = useState<QuestionModule[]>([
    {
      id: crypto.randomUUID(),
      goal: '',
      indicators: '',
      startDate: '',
      endDate: '',
      evaluation: '',
      comments: '',
    }
  ]);
  const [showDraftPicker, setShowDraftPicker] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(submissionId);

  const triggerAutosave = () => {
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const handleIstStandChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIstStandAnalyse(e.target.value);
    triggerAutosave();
  };

  const handleModuleChange = (id: string, field: keyof QuestionModule, value: string) => {
    setQuestionModules(prev =>
      prev.map(module =>
        module.id === id ? { ...module, [field]: value } : module
      )
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
        indicators: '',
        startDate: '',
        endDate: '',
        evaluation: '',
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

  const loadDraft = () => {
    if (mockDraft) {
      // Load draft data into form
      setIstStandAnalyse((mockDraft.data.istStandAnalyse as string) || '');
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
        { label: 'Zielvereinbarung' }
      ];
    } else {
      // New form
      return [
        { label: 'Start', onClick: () => onNavigate('landing') },
        { label: 'Zielvereinbarung' }
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

      <form onSubmit={handleSubmit}>
        {/* IST-Stand-Analyse Section */}
        <div style={styles.section}>
          <h2 style={styles.section_title}>Ist-Stand</h2>
          <label htmlFor="istStandAnalyse" style={styles.label}>
            Grundlegende Erkenntnisse zur IST-Stand-Analyse in Kurzfassung
          </label>
          <textarea
            id="istStandAnalyse"
            value={istStandAnalyse}
            onChange={handleIstStandChange}
            rows={6}
            style={styles.textarea}
            placeholder="Bitte geben Sie die grundlegenden Erkenntnisse ein..."
          />
        </div>

        <hr style={styles.hr} />

        {/* Ziele Section */}
        <div style={styles.section}>
          <h2 style={styles.section_title}>Ziele</h2>
            
          {questionModules.map((module, index) => (
            <div 
              key={module.id}
              style={styles.moduleCard}
            >
              <div style={styles.module_header}>
                <h3 style={styles.module_title}>Modul {index + 1}</h3>
                {questionModules.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestionModule(module.id)}
                    style={styles.button_danger}
                  >
                    Entfernen
                  </button>
                )}
              </div>

              <div style={styles.fieldGroup}>
                  {/* Feld 2: Ziele im SCP */}
                  <div>
                    <label 
                      htmlFor={`goal-${module.id}`}
                      style={styles.label}
                    >
                      Feld 2: Ziele im SCP <span style={styles.required}>*</span>
                    </label>
                    <select
                      id={`goal-${module.id}`}
                      value={module.goal}
                      onChange={(e) => handleModuleChange(module.id, 'goal', e.target.value)}
                      required
                      style={styles.input}
                    >
                      <option value="">Bitte wählen Sie ein Ziel...</option>
                      {module.goal && !getAvailableGoals(module.id).includes(module.goal) && (
                        <option value={module.goal}>{module.goal}</option>
                      )}
                      {getAvailableGoals(module.id).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  {/* Feld 3a: Zielindikatoren */}
                  <div>
                    <label 
                      htmlFor={`indicators-${module.id}`}
                      style={styles.label}
                    >
                      Zielindikatoren
                    </label>
                    <textarea
                      id={`indicators-${module.id}`}
                      value={module.indicators}
                      onChange={(e) => handleModuleChange(module.id, 'indicators', e.target.value)}
                      rows={4}
                      style={styles.textarea}
                      placeholder="Wie wird festgestellt, ob (inwieweit) das Ziel (Teilziel) erreicht worden ist?"
                    />
                  </div>

                  {/* Feld 4a: Zeitpunkt für die Zielerreichung */}
                  <div>
                    <label style={styles.label}>
                      Zeitpunkt für die Zielerreichung
                    </label>
                    <div style={styles.fieldRow}>
                      <div>
                        <label 
                          htmlFor={`startDate-${module.id}`}
                          style={{...styles.label, marginBottom: '0.25rem', fontSize: '0.875rem'}}
                        >
                          Startdatum
                        </label>
                        <input
                          id={`startDate-${module.id}`}
                          type="date"
                          value={module.startDate}
                          onChange={(e) => handleModuleChange(module.id, 'startDate', e.target.value)}
                          required
                          style={styles.input}
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor={`endDate-${module.id}`}
                          style={{...styles.label, marginBottom: '0.25rem', fontSize: '0.875rem'}}
                        >
                          Enddatum (optional)
                        </label>
                        <input
                          id={`endDate-${module.id}`}
                          type="date"
                          value={module.endDate}
                          onChange={(e) => handleModuleChange(module.id, 'endDate', e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feld 5a: Interne Evaluation */}
                  <div>
                    <label 
                      htmlFor={`evaluation-${module.id}`}
                      style={styles.label}
                    >
                      Interne Evaluation der Teilziele
                    </label>
                    <textarea
                      id={`evaluation-${module.id}`}
                      value={module.evaluation}
                      onChange={(e) => handleModuleChange(module.id, 'evaluation', e.target.value)}
                      rows={4}
                      style={styles.textarea}
                      placeholder="Beschreiben Sie die interne Evaluation..."
                    />
                  </div>

                  {/* Feld 6a: Comments */}
                  <div>
                    <label 
                      htmlFor={`comments-${module.id}`}
                      style={styles.label}
                    >
                      Kommentare
                    </label>
                    <textarea
                      id={`comments-${module.id}`}
                      value={module.comments}
                      onChange={(e) => handleModuleChange(module.id, 'comments', e.target.value)}
                      rows={4}
                      style={styles.textarea}
                      placeholder="Haben Sie Kommentare hierzu?"
                    />
                  </div>

                </div>
              </div>
            ))}

            {/* Add another module */}
            <button
              type="button"
              onClick={addQuestionModule}
              disabled={questionModules.length >= GOAL_OPTIONS.length}
              style={questionModules.length >= GOAL_OPTIONS.length ? styles.button_success_disabled : styles.button_success}
            >
              {questionModules.length >= GOAL_OPTIONS.length 
                ? `✓ Maximal ${GOAL_OPTIONS.length} Zielmodule erreicht` 
                : '+ Weiteres Zielmodul hinzufügen'}
            </button>
          </div>

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
