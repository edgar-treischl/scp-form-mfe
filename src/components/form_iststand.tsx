import { formStyles } from './formStyles';

interface FormIststandProps {
  istStandAnalyse: string;
  supportPersonnel: boolean | '';
  supportTypes: string[];
  supportOtherText: string;
  dataSources: string[];
  onIstStandChange: (value: string) => void;
  onSupportPersonnelChange: (value: boolean) => void;
  onSupportTypeChange: (type: string, checked: boolean) => void;
  onSupportOtherTextChange: (value: string) => void;
  onDataSourceChange: (source: string, checked: boolean) => void;
}

const SUPPORT_TYPES = ['SEM', 'BDA', 'BiUSE', 'QmbS'];
const DATA_SOURCES = [
  'Schulstatistiken (z. B. ASV/ASD)',
  'Zentrale Lernstandserhebungen (z. B. VERA, BYLES, Lernstand 5, Orientierungsarbeiten)',
  'Leistungs- und Notenbild (z. B. Notenspiegel, Klassenarbeiten)',
  'Beobachtungen (z. B. Unterricht, Pausen, Übergänge)',
  'Online-Befragungen (z. B. BETSIE, PAUL)',
  'Ergebnisse aus der externen Evaluation (z. B. Befragungsergebnisse, Unterrichtsbeobachtungen, Evaluationsbericht)',
  'Protokolle (Lehrerkonferenzen, SCP-Gruppe)',
];

export function FormIststand({
  istStandAnalyse,
  supportPersonnel,
  supportTypes,
  supportOtherText,
  dataSources,
  onIstStandChange,
  onSupportPersonnelChange,
  onSupportTypeChange,
  onSupportOtherTextChange,
  onDataSourceChange,
}: FormIststandProps) {
  return (
    <div style={formStyles.section}>
      <h2 style={formStyles.section_title}>Ist-Stand</h2>

      <label htmlFor="istStandAnalyse" style={formStyles.label}>
        Grundlegende Erkenntnisse zur IST-Stand-Analyse in Kurzfassung
      </label>
      <textarea
        id="istStandAnalyse"
        value={istStandAnalyse}
        onChange={(e) => onIstStandChange(e.target.value)}
        rows={6}
        style={formStyles.textarea}
        placeholder="Bitte geben Sie die grundlegenden Erkenntnisse ein..."
      />

      {/* Question 1: Support Personnel */}
      <div style={{ marginTop: '2rem' }}>
        <label style={formStyles.label}>
          Wir arbeiten mit Personen aus dem Unterstützungssystem zusammen.
        </label>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
            <input
              type="radio"
              name="supportPersonnel"
              value="true"
              checked={supportPersonnel === true}
              onChange={() => onSupportPersonnelChange(true)}
              style={{ cursor: 'pointer' }}
            />
            Ja
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
            <input
              type="radio"
              name="supportPersonnel"
              value="false"
              checked={supportPersonnel === false}
              onChange={() => onSupportPersonnelChange(false)}
              style={{ cursor: 'pointer' }}
            />
            Nein
          </label>
        </div>
      </div>

      {/* Question 2: Support Types (Filtered) */}
      {supportPersonnel === true && (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
          <label style={formStyles.label}>Mit wem arbeiten Sie zusammen?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SUPPORT_TYPES.map((type) => (
              <label
                key={type}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}
              >
                <input
                  type="checkbox"
                  checked={supportTypes.includes(type)}
                  onChange={(e) => onSupportTypeChange(type, e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                {type}
              </label>
            ))}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
              <input
                type="checkbox"
                checked={supportTypes.includes('Sonstige')}
                onChange={(e) => onSupportTypeChange('Sonstige', e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              Sonstige, nämlich:
            </label>
            {supportTypes.includes('Sonstige') && (
              <input
                type="text"
                value={supportOtherText}
                onChange={(e) => onSupportOtherTextChange(e.target.value)}
                placeholder="Bitte spezifizieren Sie..."
                style={{ ...formStyles.input, marginLeft: '1.5rem' }}
              />
            )}
          </div>
        </div>
      )}

      {/* Question 3: Data Sources */}
      <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
        <label style={formStyles.label}>Datenquellen für die Ist-Stand-Erhebung</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {DATA_SOURCES.map((source) => (
            <label
              key={source}
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontWeight: 'normal' }}
            >
              <input
                type="checkbox"
                checked={dataSources.includes(source)}
                onChange={(e) => onDataSourceChange(source, e.target.checked)}
                style={{ cursor: 'pointer', marginTop: '0.25rem' }}
              />
              <span>{source}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
