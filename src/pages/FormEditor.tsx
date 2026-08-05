import { useState } from 'react';
import { SaveIndicator, Breadcrumb } from '../components';
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
    <div>
      <Breadcrumb items={getBreadcrumbItems()} />

      {mockDraft && !currentDraftId && !submissionId && (
        <div style={{ marginBottom: '1rem' }}>
          <button 
            onClick={() => setShowDraftPicker(true)}
            style={{ 
              padding: '0.5rem 1rem',
              background: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📄 Entwurf laden
          </button>
        </div>
      )}

      {/* Draft Load Confirmation Modal */}
      {showDraftPicker && mockDraft && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '8px',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h2 style={{ margin: '0 0 1rem 0' }}>Entwurf laden?</h2>
            
            <div style={{
              background: '#ffffff',
              border: '1px solid #ddd',
              borderRadius: '4px',
              padding: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ marginBottom: '0.5rem', fontWeight: '500' }}>
                {(mockDraft.data.title as string) || 'Untitled'}
              </div>
              <div style={{ fontSize: '0.9375rem', color: '#666', marginBottom: '0.75rem' }}>
                {(mockDraft.data.istStandAnalyse as string)?.substring(0, 150)}...
              </div>
              <div style={{ fontSize: '0.875rem', color: '#999' }}>
                Zuletzt aktualisiert: {formatDate(mockDraft.updatedAt)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowDraftPicker(false)}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Abbrechen
              </button>
              <button
                onClick={loadDraft}
                style={{
                  padding: '0.5rem 1.5rem',
                  background: '#0066cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Entwurf laden
              </button>
            </div>
          </div>
        </div>
      )}
      
      <header>
        <h1>Zielvereinbarung</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#fff3cd', borderRadius: '4px' }}>
            Entwurf {currentDraftId ? `(${currentDraftId})` : ''}
          </span>
          <SaveIndicator status={saveStatus} />
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Feld 1: IST-Stand-Analyse */}
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Ist-Stand</h2>
            <label htmlFor="istStandAnalyse" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Grundlegende Erkenntnisse zur IST-Stand-Analyse in Kurzfassung
            </label>
            <textarea
              id="istStandAnalyse"
              value={istStandAnalyse}
              onChange={handleIstStandChange}
              rows={6}
              style={{ width: '100%', padding: '0.75rem', fontFamily: 'inherit', fontSize: '1rem' }}
              placeholder="Bitte geben Sie die grundlegenden Erkenntnisse ein..."
            />
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #ddd' }} />

          {/* Question Modules */}
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Ziele</h2>
            
            {questionModules.map((module, index) => (
              <div 
                key={module.id}
                style={{ 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  background: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0 }}>Modul {index + 1}</h3>
                  {questionModules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestionModule(module.id)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9375rem'
                      }}
                    >
                      Entfernen
                    </button>
                  )}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Feld 2: Ziele im SCP */}
                  <div>
                    <label 
                      htmlFor={`goal-${module.id}`}
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                    >
                      Feld 2: Ziele im SCP *
                    </label>
                    <select
                      id={`goal-${module.id}`}
                      value={module.goal}
                      onChange={(e) => handleModuleChange(module.id, 'goal', e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
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
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                    >
                      Zielindikatoren
                    </label>
                    <textarea
                      id={`indicators-${module.id}`}
                      value={module.indicators}
                      onChange={(e) => handleModuleChange(module.id, 'indicators', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '0.75rem', fontFamily: 'inherit', fontSize: '1rem' }}
                      placeholder="Wie wird festgestellt, ob (inwieweit) das Ziel (Teilziel) erreicht worden ist?"
                    />
                  </div>

                  {/* Feld 4a: Zeitpunkt für die Zielerreichung */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Zeitpunkt für die Zielerreichung
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label 
                          htmlFor={`startDate-${module.id}`}
                          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9375rem' }}
                        >
                          Startdatum
                        </label>
                        <input
                          id={`startDate-${module.id}`}
                          type="date"
                          value={module.startDate}
                          onChange={(e) => handleModuleChange(module.id, 'startDate', e.target.value)}
                          required
                          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor={`endDate-${module.id}`}
                          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9375rem' }}
                        >
                          Enddatum (optional)
                        </label>
                        <input
                          id={`endDate-${module.id}`}
                          type="date"
                          value={module.endDate}
                          onChange={(e) => handleModuleChange(module.id, 'endDate', e.target.value)}
                          style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feld 5a: Interne Evaluation */}
                  <div>
                    <label 
                      htmlFor={`evaluation-${module.id}`}
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                    >
                      Interne Evaluation der Teilziele
                    </label>
                    <textarea
                      id={`evaluation-${module.id}`}
                      value={module.evaluation}
                      onChange={(e) => handleModuleChange(module.id, 'evaluation', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '0.75rem', fontFamily: 'inherit', fontSize: '1rem' }}
                      placeholder="Beschreiben Sie die interne Evaluation..."
                    />
                  </div>

                {/* Feld 6a: Comments */}
                  <div>
                    <label 
                      htmlFor={`evaluation-${module.id}`}
                      style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}
                    >
                      Kommentare
                    </label>
                    <textarea
                      id={`evaluation-${module.id}`}
                      value={module.comments}
                      onChange={(e) => handleModuleChange(module.id, 'evaluation', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '0.75rem', fontFamily: 'inherit', fontSize: '1rem' }}
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
              style={{
                padding: '0.75rem 1.5rem',
                background: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                width: '100%'
              }}
            >
              + Weiteres Zielmodul hinzufügen
            </button>
          </div>
        </div>

        <footer style={{ marginTop: '2rem' }}>
          <button type="button" onClick={() => onNavigate('landing')}>Abbrechen</button>
          <button type="submit" style={{ background: '#0066cc', color: 'white', fontWeight: 'bold' }}>
            ZV einreichen
          </button>
        </footer>
      </form>
    </div>
  );
}
