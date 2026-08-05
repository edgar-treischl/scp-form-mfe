import { StatusBadge } from '../components';
import type { Submission } from '../types';

interface SubmissionViewProps {
  submissionId: string | null;
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

// Mock submission data
const mockSubmission: Submission = {
  id: 'sub-001',
  owner: 'john.doe@company.com',
  status: 'submitted',
  version: 3,
  createdAt: new Date('2024-07-15T10:30:00'),
  updatedAt: new Date('2024-07-15T14:20:00'),
  submittedAt: new Date('2024-07-15T14:20:00'),
  data: {
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    department: 'Engineering',
    requestType: 'equipment',
    priority: 'high',
    title: 'New laptop for development team',
    description: 'We need new MacBook Pros for the frontend development team. Current machines are 5 years old and struggling with modern development tools.',
    estimatedCost: '$4,500',
    justification: 'This will improve developer productivity by 30% and reduce build times from 10 minutes to 2 minutes.',
  },
};

export function SubmissionView({ submissionId, onNavigate }: SubmissionViewProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleExport = () => {
    alert('Export functionality (Mock - no backend)');
  };

  if (!submissionId) {
    return (
      <div>
        <p>No submission selected.</p>
        <button onClick={() => onNavigate('history')}>Back to History</button>
      </div>
    );
  }

  const data = mockSubmission.data;
  const estimatedCost: string | undefined = data.estimatedCost as string | undefined;
  const justification: string | undefined = data.justification as string | undefined;

  return (
    <div>
      <header>
        <div>
          <h1>View Submission</h1>
          <p style={{ color: '#666', margin: '0.5rem 0 0 0' }}>ID: {mockSubmission.id}</p>
        </div>
        <div>
          <StatusBadge status={mockSubmission.status} />
        </div>
      </header>

      <div style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '4px', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', fontSize: '0.9em' }}>
          <div>
            <strong>Created:</strong>
            <div style={{ color: '#666' }}>{formatDate(mockSubmission.createdAt)}</div>
          </div>
          <div>
            <strong>Last Updated:</strong>
            <div style={{ color: '#666' }}>{formatDate(mockSubmission.updatedAt)}</div>
          </div>
          {mockSubmission.submittedAt && (
            <div>
              <strong>Submitted:</strong>
              <div style={{ color: '#666' }}>{formatDate(mockSubmission.submittedAt)}</div>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Full Name</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
              {data.fullName as string}
            </div>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Email</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
              {data.email as string}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Department</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
              {data.department as string}
            </div>
          </div>

          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Request Type</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', textTransform: 'capitalize' }}>
              {data.requestType as string}
            </div>
          </div>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Priority</label>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', textTransform: 'capitalize' }}>
            {data.priority as string}
          </div>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Request Title</label>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
            {data.title as string}
          </div>
        </div>

        <div>
          <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Description</label>
          <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
            {data.description as string}
          </div>
        </div>

        {estimatedCost && (
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Estimated Cost</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px' }}>
              {estimatedCost}
            </div>
          </div>
        )}

        {justification && (
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.25rem' }}>Business Justification</label>
            <div style={{ padding: '0.5rem', background: '#f5f5f5', borderRadius: '4px', whiteSpace: 'pre-wrap' }}>
              {justification}
            </div>
          </div>
        )}
      </div>

      <footer>
        <button onClick={() => onNavigate('history')}>Back to History</button>
        <button onClick={handleExport}>Export</button>
      </footer>
    </div>
  );
}
