type SaveStatus = 'saving' | 'saved' | 'error' | 'idle';

interface SaveIndicatorProps {
  status: SaveStatus;
}

export function SaveIndicator({ status }: SaveIndicatorProps) {
  const messages: Record<SaveStatus, string> = {
    saving: 'Saving...',
    saved: 'All changes saved',
    error: 'Failed to save',
    idle: '',
  };

  const colors: Record<SaveStatus, string> = {
    saving: '#666',
    saved: '#28a745',
    error: '#dc3545',
    idle: '#666',
  };

  if (status === 'idle') return null;

  return (
    <div style={{ 
      fontSize: '0.9em', 
      color: colors[status],
      fontStyle: status === 'saving' ? 'italic' : 'normal'
    }}>
      {status === 'saving' && <span style={{ marginRight: '0.5rem' }}>⏳</span>}
      {status === 'saved' && <span style={{ marginRight: '0.5rem' }}>✓</span>}
      {status === 'error' && <span style={{ marginRight: '0.5rem' }}>⚠️</span>}
      {messages[status]}
    </div>
  );
}
