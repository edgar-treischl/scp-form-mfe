import { StatusBadge } from '../components';
import type { Submission } from '../types';

interface SubmissionHistoryProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view', submissionId?: string) => void;
}

// Mock data
const mockSubmissions: Submission[] = [
  {
    id: 'sub-001',
    owner: 'john.doe@company.com',
    status: 'submitted',
    version: 3,
    createdAt: new Date('2024-07-15T10:30:00'),
    updatedAt: new Date('2024-07-15T14:20:00'),
    submittedAt: new Date('2024-07-15T14:20:00'),
    data: {
      title: 'New laptop for development team',
      requestType: 'equipment',
      priority: 'high',
    },
  },
  {
    id: 'sub-002',
    owner: 'john.doe@company.com',
    status: 'draft',
    version: 1,
    createdAt: new Date('2024-07-28T09:15:00'),
    updatedAt: new Date('2024-07-28T09:45:00'),
    data: {
      title: 'Software license renewal',
      requestType: 'software',
      priority: 'medium',
    },
  },
  {
    id: 'sub-003',
    owner: 'john.doe@company.com',
    status: 'submitted',
    version: 2,
    createdAt: new Date('2024-08-01T11:00:00'),
    updatedAt: new Date('2024-08-01T15:30:00'),
    submittedAt: new Date('2024-08-01T15:30:00'),
    data: {
      title: 'Team training workshop',
      requestType: 'training',
      priority: 'low',
    },
  },
];

export function SubmissionHistory({ onNavigate }: SubmissionHistoryProps) {
  const handleExport = () => {
    alert('Export CSV functionality (Mock - no backend)');
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div>
      <header>
        <h1>Submission History</h1>
        <button onClick={handleExport}>Export CSV</button>
      </header>

      <div style={{ marginTop: '2rem' }}>
        <p style={{ marginBottom: '1rem', color: '#666' }}>
          {mockSubmissions.length} submission{mockSubmissions.length !== 1 ? 's' : ''} found
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>Title</th>
              <th style={{ padding: '0.75rem' }}>Status</th>
              <th style={{ padding: '0.75rem' }}>Created</th>
              <th style={{ padding: '0.75rem' }}>Last Updated</th>
              <th style={{ padding: '0.75rem' }}>Actions</th>
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
                      View
                    </button>
                    {submission.status === 'draft' && (
                      <button
                        onClick={() => onNavigate('form', submission.id)}
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.9em' }}
                      >
                        Edit
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
