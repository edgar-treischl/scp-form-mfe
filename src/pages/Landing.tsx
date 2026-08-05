interface LandingProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Header Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        marginBottom: '4rem',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '0',
            fontWeight: 'bold',
            color: '#333'
          }}>
            Internal Request Forms
          </h1>
        </div>
        <div>
          <p style={{ 
            fontSize: '1rem', 
            lineHeight: '1.6',
            color: '#666',
            margin: '0'
          }}>
            Submit and manage internal business requests for equipment, software, training, and other resources. 
            All forms auto-save and include complete submission history.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem'
      }}>
        {/* Start New Form Card */}
        <div 
          onClick={() => onNavigate('form')}
          style={{
            padding: '2rem',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0066cc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <h2 style={{ 
            fontSize: '1.25rem', 
            margin: '0 0 0.5rem 0',
            color: '#333'
          }}>
            Start New Form
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: '1.5',
            color: '#666',
            margin: '0 0 1.5rem 0'
          }}>
            Create a new request form. Progress is automatically saved.
          </p>
          <button style={{
            padding: '0.5rem 1.25rem',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Create Form →
          </button>
        </div>

        {/* Previous Submissions Card */}
        <div 
          onClick={() => onNavigate('history')}
          style={{
            padding: '2rem',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0066cc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <h2 style={{ 
            fontSize: '1.25rem', 
            margin: '0 0 0.5rem 0',
            color: '#333'
          }}>
            Previous Submissions
          </h2>
          <p style={{ 
            fontSize: '0.95rem', 
            lineHeight: '1.5',
            color: '#666',
            margin: '0 0 1.5rem 0'
          }}>
            View and manage all your submitted forms and drafts.
          </p>
          <button style={{
            padding: '0.5rem 1.25rem',
            background: '#0066cc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            View History →
          </button>
        </div>
      </div>
    </div>
  );
}
