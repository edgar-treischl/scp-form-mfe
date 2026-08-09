import logoLeft from '/src/assets/isb_raute.png';
import logoRight from '/src/assets/startchancen.png';

interface LandingProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1.5rem 1rem 2rem',
      }}
    >
      {/* Logo Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4rem',
          padding: '0 0.5rem',
        }}
      >
        {/* Left Logo */}
        <img
          src={logoLeft}
          alt="Logo links"
          style={{
            height: '100px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />

        {/* Right Logo */}
        <img
          src={logoRight}
          alt="Logo rechts"
          style={{
            height: '100px',
            width: 'auto',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Header */}
      <div style={{ marginBottom: '4rem' }}>
        <h3>Prototyp</h3>

        <h1
          style={{
            fontSize: '2.5rem',
            margin: '0 0 1rem 0',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Zielvereinbarung SCP
        </h1>

        <p
          style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#666',
            margin: 0,
            maxWidth: '700px',
          }}
        >
          Neue Zielvereinbarungen anlegen, bearbeiten und bislang eingereichte
          Einreichung verwalten.
        </p>
      </div>

      {/* Feature Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
        }}
      >
        {/* Start New Form Card */}
        <div
          onClick={() => onNavigate('form')}
          style={{
            padding: '2rem',
            background: 'white',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0066cc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              margin: '0 0 0.5rem 0',
              color: '#333',
            }}
          >
            Neu
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.5',
              color: '#666',
              margin: 0,
            }}
          >
            Eine neue Zielvereinbarung anlegen.
          </p>
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
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0066cc';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e0e0e0';
          }}
        >
          <h2
            style={{
              fontSize: '1.25rem',
              margin: '0 0 0.5rem 0',
              color: '#333',
            }}
          >
            Verwalten
          </h2>

          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.5',
              color: '#666',
              margin: 0,
            }}
          >
            Bisherige Zielvereinbarungen einsehen und verwalten.
          </p>
        </div>
      </div>
    </div>
  );
}
