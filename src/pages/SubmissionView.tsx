import { StatusBadge, Breadcrumb } from '../components';
import { ExportWordIcon } from '../assets/icons';
import type { Submission } from '../types';
import { exportSubmissionAsDOCX } from '../utils/docxExport';

interface SubmissionViewProps {
  submissionId: string | null;
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view' | 'about', submissionId?: string) => void;
}

// Mock submission data
const mockSubmission: Submission = {
  id: 'sub-001',
  owner: 'maria.schmidt@organisation.de',
  status: 'submitted',
  version: 3,
  createdAt: new Date('2024-07-15T10:30:00'),
  updatedAt: new Date('2024-07-15T14:20:00'),
  submittedAt: new Date('2024-07-15T14:20:00'),
  data: {
    istStandAnalyse: 'Die umfassende Analyse der aktuellen Situation zeigt, dass die bestehenden Strukturen und Prozesse grundsätzlich gut funktionieren. Es wurden jedoch einige Optimierungspotenziale identifiziert, insbesondere in den Bereichen Kommunikation und Koordination zwischen den verschiedenen Abteilungen.',
    questionModules: [
      {
        id: '1',
        goal: 'Individuelle Ebene – Ziel 1',
        indicators: 'Erhöhung der Teilnehmerzufriedenheit um mindestens 15%, gemessen durch standardisierte Feedbackbögen. Verbesserung der Kommunikationsqualität, messbar durch reduzierte Rückfragen.',
        startDate: '2024-08-01',
        endDate: '2024-12-31',
        evaluation: 'Quartalsweise Auswertung der Feedbackbögen und monatliche Team-Retrospektiven zur Bewertung der Fortschritte. Anpassung der Maßnahmen bei Bedarf.',
      },
      {
        id: '2',
        goal: 'Individuelle Ebene – Ziel 3',
        indicators: 'Steigerung der interdisziplinären Zusammenarbeit durch mindestens 3 gemeinsame Projekte pro Quartal. Dokumentierte Verbesserung der Prozesseffizienz um 20%.',
        startDate: '2024-09-01',
        endDate: '2025-03-31',
        evaluation: 'Monatliches Monitoring der laufenden Projekte und Erfassung der Effizienzsteigerungen durch Prozessanalysen. Halbjährliche Gesamtbewertung.',
      },
    ],
  },
};

export function SubmissionView({ submissionId, onNavigate }: SubmissionViewProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const handleExport = async () => {
    try {
      await exportSubmissionAsDOCX(mockSubmission);
    } catch (error) {
      alert(`Export fehlgeschlagen: ${error instanceof Error ? error.message : 'Unbekannter Fehler'}`);
    }
  };

  if (!submissionId) {
    return (
      <div>
        <p>Keine Einreichung ausgewählt.</p>
        <button onClick={() => onNavigate('history')}>Zurück zur Historie</button>
      </div>
    );
  }

  const data = mockSubmission.data;
  const istStandAnalyse: string = data.istStandAnalyse as string || '';
  const questionModules: Array<{
    id: string;
    goal: string;
    indicators: string;
    startDate: string;
    endDate: string;
    evaluation: string;
  }> = (data.questionModules as Array<{
    id: string;
    goal: string;
    indicators: string;
    startDate: string;
    endDate: string;
    evaluation: string;
  }>) || [];

  return (
    <div id="submission-content">
      <Breadcrumb 
        items={[
          { label: 'Start', onClick: () => onNavigate('landing') },
          { label: 'Zielvereinbarungen', onClick: () => onNavigate('history') },
          { label: submissionId }
        ]}
      />
      
      <header>
        <div>
          <h1>Einreichung ansehen</h1>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>ID: {mockSubmission.id}</p>
        </div>
        <div>
          <StatusBadge status={mockSubmission.status} />
        </div>
      </header>

      <div style={{ background: '#ffffff', border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', fontSize: '0.9375rem' }}>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Erstellt</div>
            <div style={{ color: '#666' }}>{formatDate(mockSubmission.createdAt)}</div>
          </div>
          <div>
            <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Aktualisiert</div>
            <div style={{ color: '#666' }}>{formatDate(mockSubmission.updatedAt)}</div>
          </div>
          {mockSubmission.submittedAt && (
            <div>
              <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>Eingereicht</div>
              <div style={{ color: '#666' }}>{formatDate(mockSubmission.submittedAt)}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h2 style={{ marginBottom: '1.5rem' }}>Ist-Stand</h2>
          <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
            Grundlegende Erkenntnisse zur IST-Stand-Analyse in Kurzfassung
          </label>
          <div style={{ padding: '0.75rem', background: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '1rem', lineHeight: '1.5' }}>
            {istStandAnalyse}
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '2px solid #ddd' }} />

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
              <h3 style={{ margin: '0 0 1rem 0' }}>Modul {index + 1}</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                    Feld 2: Ziele im SCP
                  </label>
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', fontSize: '1rem' }}>
                    {module.goal}
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                    Zielindikatoren
                  </label>
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '1rem', lineHeight: '1.5' }}>
                    {module.indicators}
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                    Zeitpunkt für die Zielerreichung
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: '#666' }}>Startdatum</div>
                      <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', fontSize: '1rem' }}>
                        {formatDateShort(module.startDate)}
                      </div>
                    </div>
                    {module.endDate && (
                      <div>
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: '#666' }}>Enddatum</div>
                        <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', fontSize: '1rem' }}>
                          {formatDateShort(module.endDate)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                    Interne Evaluation der Teilziele
                  </label>
                  <div style={{ padding: '0.75rem', background: '#f8f9fa', borderRadius: '4px', whiteSpace: 'pre-wrap', fontSize: '1rem', lineHeight: '1.5' }}>
                    {module.evaluation}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer>
        {mockSubmission.status === 'draft' && (
          <button onClick={() => onNavigate('form', mockSubmission.id)}>Bearbeiten</button>
        )}
        <button onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ExportWordIcon style={{ width: '1.4rem', height: '1.4rem' }} />
          Als Word exportieren
        </button>
      </footer>
    </div>
  );
}
