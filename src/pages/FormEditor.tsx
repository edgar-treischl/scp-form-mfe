import { useState } from 'react';
import { SaveIndicator } from '../components';

interface FormEditorProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

interface QuestionModule {
  id: string;
  goal: string;
  indicators: string;
  startDate: string;
  endDate: string;
  evaluation: string;
}

const GOAL_OPTIONS = [
  'Individuelle Ebene – Ziel 1',
  'Individuelle Ebene – Ziel 2',
  'Individuelle Ebene – Ziel 3',
  'Individuelle Ebene – Ziel 4',
];

export function FormEditor({ onNavigate }: FormEditorProps) {
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
    }
  ]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formular eingereicht! (Mock - kein Backend)');
    onNavigate('history');
  };

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={() => onNavigate('landing')}
          style={{ 
            padding: '0.5rem 1rem',
            background: '#f0f0f0',
            border: '1px solid #ddd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          ← Zurück zur Startseite
        </button>
      </div>
      
      <header>
        <h1>SCP Formular</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#fff3cd', borderRadius: '4px' }}>Entwurf</span>
          <SaveIndicator status={saveStatus} />
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Feld 1: IST-Stand-Analyse */}
          <div>
            <label htmlFor="istStandAnalyse" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Feld 1: Grundlegende Erkenntnisse zur IST-Stand-Analyse in Kurzfassung
            </label>
            <textarea
              id="istStandAnalyse"
              value={istStandAnalyse}
              onChange={handleIstStandChange}
              rows={6}
              style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
              placeholder="Bitte geben Sie die grundlegenden Erkenntnisse ein..."
            />
          </div>

          <hr style={{ border: 'none', borderTop: '2px solid #ddd' }} />

          {/* Question Modules */}
          <div>
            <h2 style={{ marginBottom: '1.5rem' }}>Zielmodule</h2>
            
            {questionModules.map((module, index) => (
              <div 
                key={module.id}
                style={{ 
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  background: '#f9f9f9'
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
                        fontSize: '0.875rem'
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
                      style={{ width: '100%', padding: '0.5rem' }}
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
                      Feld 3a: Zielindikatoren
                    </label>
                    <textarea
                      id={`indicators-${module.id}`}
                      value={module.indicators}
                      onChange={(e) => handleModuleChange(module.id, 'indicators', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
                      placeholder="Beschreiben Sie die Zielindikatoren..."
                    />
                  </div>

                  {/* Feld 4a: Zeitpunkt für die Zielerreichung */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                      Feld 4a: Zeitpunkt für die Zielerreichung *
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label 
                          htmlFor={`startDate-${module.id}`}
                          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}
                        >
                          Startdatum
                        </label>
                        <input
                          id={`startDate-${module.id}`}
                          type="date"
                          value={module.startDate}
                          onChange={(e) => handleModuleChange(module.id, 'startDate', e.target.value)}
                          required
                          style={{ width: '100%', padding: '0.5rem' }}
                        />
                      </div>
                      <div>
                        <label 
                          htmlFor={`endDate-${module.id}`}
                          style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.875rem' }}
                        >
                          Enddatum (optional)
                        </label>
                        <input
                          id={`endDate-${module.id}`}
                          type="date"
                          value={module.endDate}
                          onChange={(e) => handleModuleChange(module.id, 'endDate', e.target.value)}
                          style={{ width: '100%', padding: '0.5rem' }}
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
                      Feld 5a: Interne Evaluation der Teilziele
                    </label>
                    <textarea
                      id={`evaluation-${module.id}`}
                      value={module.evaluation}
                      onChange={(e) => handleModuleChange(module.id, 'evaluation', e.target.value)}
                      rows={4}
                      style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }}
                      placeholder="Beschreiben Sie die interne Evaluation..."
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Feld 6a: Add another module */}
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
            Formular einreichen
          </button>
        </footer>
      </form>
    </div>
  );
}
