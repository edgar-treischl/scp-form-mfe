import { formStyles } from './formStyles';

interface FormContractProps {
  contractSchoolLead: string;
  contractSchoolName: string;
  contractSamt: string;
  contractProgramRep: string;
}

export function FormContract({
  contractSchoolLead,
  contractSchoolName,
  contractSamt,
  contractProgramRep,
}: FormContractProps) {
  return (
    <div style={formStyles.contractSection}>
      <h2 style={formStyles.contractTitle}>
        Zielvereinbarung für Schulen im Startchancen-Programm:
      </h2>

      <div style={formStyles.contractPreview}>
        <p style={{ marginTop: 0, marginBottom: '1.5rem' }}>
          Zwischen <span style={formStyles.contractValue}>{contractSchoolLead}</span> als Schulleitung der{' '}
          <span style={formStyles.contractValue}>{contractSchoolName}</span>.
        </p>
        <p style={{ marginTop: 0, marginBottom: '1.5rem' }}>
          Und dem <span style={formStyles.contractValue}>{contractSamt}</span>, vertreten durch{' '}
          <span style={formStyles.contractValue}>{contractProgramRep}</span>. Folgende
          Zielvereinbarung geschlossen und verbindlich vereinbart.
        </p>
        <p style={{ marginTop: 0, marginBottom: '0rem' }}>
          Folgende Zielvereinbarung wird verbindlich vereinbart und geschlossen.
        </p>
      </div>
    </div>
  );
}
