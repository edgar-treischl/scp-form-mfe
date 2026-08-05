import { StatusBadge, Breadcrumb } from '../components';
import type { Submission } from '../types';

interface SubmissionHistoryProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view', submissionId?: string) => void;
}

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: 'sub-001',
    owner: 'maria.schmidt@organisation.de',
    status: 'submitted',
    version: 3,
    createdAt: new Date('2024-07-15T10:30:00'),
    updatedAt: new Date('2024-07-15T14:20:00'),
    submittedAt: new Date('2024-07-15T14:20:00'),
    data: {
      title: 'SCP Evaluation Q2/2024',
      istStandAnalyse: 'Umfassende Analyse der aktuellen Situation...',
      moduleCount: 2,
    },
  },
  {
    id: 'sub-002',
    owner: 'maria.schmidt@organisation.de',
    status: 'draft',
    version: 1,
    createdAt: new Date('2024-07-28T09:15:00'),
    updatedAt: new Date('2024-07-28T09:45:00'),
    data: {
      title: 'SCP Zwischenbericht Juli',
      istStandAnalyse: 'Erste Erkenntnisse aus der laufenden Periode...',
      moduleCount: 1,
    },
  },
  {
    id: 'sub-003',
    owner: 'maria.schmidt@organisation.de',
    status: 'submitted',
    version: 2,
    createdAt: new Date('2024-08-01T11:00:00'),
    updatedAt: new Date('2024-08-01T15:30:00'),
    submittedAt: new Date('2024-08-01T15:30:00'),
    data: {
      title: 'SCP Jahresplanung 2024/2025',
      istStandAnalyse: 'Rückblick auf die erreichten Ziele...',
      moduleCount: 4,
    },
  },
];

export function SubmissionHistory({ onNavigate }: SubmissionHistoryProps) {
  const handleExport = () => {
    alert('Export CSV functionality (Mock - no backend)');
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

  return (
    <div>
      <Breadcrumb 
        items={[
          { label: 'Start', onClick: () => onNavigate('landing') },
          { label: 'Eingabehistorie' }
        ]}
      />
      
      <header>
        <h1>Eingabehistorie</h1>
        <button onClick={handleExport}>CSV exportieren</button>
      </header>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          {mockSubmissions.length} Einreichung{mockSubmissions.length !== 1 ? 'en' : ''} gefunden
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>Titel</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Erstellt</th>
              <th style={{ padding: '0.75rem' }}>Aktualisiert</th>
              <th style={{ padding: '0.75rem' }}>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {mockSubmissions.map((submission) => (
              <tr key={submission.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.9em' }}>
                  {submission.id}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {(submission.data.title as string) || 'Untitled'}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <StatusBadge status={submission.status} />
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.9em', color: '#666' }}>
                  {formatDate(submission.createdAt)}
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.9em', color: '#666' }}>
                  {formatDate(submission.updatedAt)}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => onNavigate('view', submission.id)}
                      style={{ padding: '0.25rem 0.75rem', fontSize: '0.9em' }}
                    >
                      Ansehen
                    </button>
                    {submission.status === 'draft' && (
                      <button
                        onClick={() => onNavigate('form', submission.id)}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.9em' }}
                      >
                        Bearbeiten
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
