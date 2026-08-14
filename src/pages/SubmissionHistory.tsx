import { StatusBadge, Breadcrumb } from '../components';
import type { Submission } from '../types';

interface SubmissionHistoryProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view' | 'about', submissionId?: string) => void;
}

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: '001',
    owner: 'maria.schmidt@organisation.de',
    status: 'submitted',
    version: 3,
    createdAt: new Date('2025-07-15T10:30:00'),
    updatedAt: new Date('2025-07-15T14:20:00'),
    submittedAt: new Date('2025-07-15T14:20:00'),
    data: {
      title: 'Zielvereinbarung 2025',
      istStandAnalyse: 'Umfassende Analyse der aktuellen Situation...',
      moduleCount: 2,
    },
  },
  {
    id: '002',
    owner: 'maria.schmidt@organisation.de',
    status: 'draft',
    version: 1,
    createdAt: new Date('2026-07-28T09:15:00'),
    updatedAt: new Date('2026-07-28T09:45:00'),
    data: {
      title: 'Zielvereinbarung 2026',
      istStandAnalyse: 'Erste Erkenntnisse aus der laufenden Periode...',
      moduleCount: 1,
    },
  },
];

export function SubmissionHistory({ onNavigate }: SubmissionHistoryProps) {
  
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <Breadcrumb 
        items={[
          { label: 'Start', onClick: () => onNavigate('landing') },
          { label: 'Zielvereinbarungen' }
        ]}
      />
      
      <header>
        <h1>Zielvereinbarungen verwalten</h1>
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
            </tr>
          </thead>
          <tbody>
            {mockSubmissions.map((submission) => (
              <tr key={submission.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace', fontSize: '0.9em' }}>
                  {submission.id}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <button
                    onClick={() => onNavigate('view', submission.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E8AD9ff',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontSize: 'inherit',
                      fontFamily: 'inherit',
                      padding: 0,
                      textAlign: 'left',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {(submission.data.title as string) || 'Untitled'}
                  </button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
