import { formStyles } from './formStyles';
import { NewIcon, LoadTemplateIcon } from '../assets/icons';

interface FormContractProps {
  contractSchoolLead: string;
  contractSchoolName: string;
  contractSamt: string;
  contractProgramRep: string;
  onStartNew?: () => void;
  onLoadDraft?: () => void;
  showDraftButton?: boolean;
  buttonStyles?: {
    button_primary?: React.CSSProperties;
    button_draft?: React.CSSProperties;
  };
}

export function FormContract({
  contractSchoolLead,
  contractSchoolName,
  contractSamt,
  contractProgramRep,
  onStartNew,
  onLoadDraft,
  showDraftButton = false,
  buttonStyles = {},
}: FormContractProps) {
  return (
    <>
      <div style={formStyles.contractSection}>
        <h2 style={formStyles.contractTitle}>
          Neue Zielvereinbarung (ZV) im Startchancen-Programm:
        </h2>

        <div style={formStyles.contractPreview}>
          <p style={{ marginTop: 0, marginBottom: '1.5rem' }}>
            Zwischen <span style={formStyles.contractValue}>{contractSchoolLead}</span> als Schulleitung der{' '}
            <span style={formStyles.contractValue}>{contractSchoolName}</span>.
          </p>
          <p style={{ marginTop: 0, marginBottom: '1.5rem' }}>
            Und dem <span style={formStyles.contractValue}>{contractSamt}</span>, vertreten durch{' '}
            <span style={formStyles.contractValue}>{contractProgramRep}</span>
          </p>
          <p style={{ marginTop: 0, marginBottom: '0rem' }}>
            Die Zielvereinbarung der folgenden Seiten wird verbindlich geschlossen.
          </p>
        </div>
      </div>

      {(onStartNew || onLoadDraft) && (
        <div style={{ marginTop: '2rem', paddingTop: '2rem', display: 'flex', gap: '1rem' }}>
          {onStartNew && (
            <button
              type="button"
              onClick={onStartNew}
              style={{
                ...buttonStyles.button_primary,
                flex: 1,
                padding: '0.65rem 1rem',
              }}
            >
              <NewIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Neue ZV
            </button>
          )}
          {showDraftButton && onLoadDraft && (
            <button 
              type="button"
              onClick={onLoadDraft}
              style={{
                ...buttonStyles.button_draft,
                flex: 1,
                padding: '0.65rem 1rem',
              }}
            >
              <LoadTemplateIcon style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Entwurf laden
            </button>
          )}
        </div>
      )}
    </>
  );
}
