import { formStyles } from './formStyles';

interface FormSchoolGoalsProps {
  questionModules: Array<{
    id: string;
    goal: string;
    smartGoal: string;
    targetGroup: string[];
    targetGroupOther: string;
    subject: string[];
    subjectOther: string;
    dataSources: string[];
    dataSourcesOther: string;
    startDate: string;
    endDate: string;
    comments: string;
  }>;
  onModuleChange: (
    id: string,
    field: 'goal' | 'smartGoal' | 'targetGroup' | 'targetGroupOther' | 'subject' | 'subjectOther' | 'dataSources' | 'dataSourcesOther' | 'startDate' | 'endDate' | 'comments',
    value: string | string[]
  ) => void;
  onModuleCheckboxChange: (id: string, field: 'targetGroup' | 'subject' | 'dataSources', option: string) => void;
  onAddModule: () => void;
  onRemoveModule: (id: string) => void;
  getAvailableGoals: (currentModuleId: string) => string[];
}

const GOAL_OPTIONS = [
  'Schulgemeinschaft verfolgt die Gestaltung einer positiven Schulkultur und die Entwicklung der Schule hin zu einem förderlichen Lern- und Sozialraum als handlungsleitendes Grundprinzip.',
  'XXx.',
  'xxx.',
  'XXX.',
];

const TARGET_GROUP_OPTIONS = [
  'Schülerinnen und Schüler',
  'Lehrkräfte / Kollegium',
  'Eltern / Erziehungsberechtigte',
  'Schulgemeinschaft',
  'Schule als Organisation (z. B. für Abläufe)',
  'Sonstige',
];

const SUBJECT_OPTIONS = [
  'Kompetenzen/Fähigkeiten (z. B. Medienkompetenz, Leseförderung)',
  'Prozesse/Abläufe (z. B. Kommunikationswege, Feedbackkultur)',
  'Angebote/Projekte (z. B. AGs, Ganztagsangebote)',
  'Sonstiges',
];

const DATA_SOURCES_OPTIONS = [
  'Schulstatistiken (z. B. ASV/ASD)',
  'Zentrale Lernstandserhebungen (z. B. VERA, BYLES, Lernstand 5, Orientierungsarbeiten)',
  'Leistungs- und Notenbild (z. B. Notenspiegel, Klassenarbeiten)',
  'Beobachtungen (z. B. Unterricht, Pausen, Übergänge)',
  'Online-Befragungen (z. B. BETSIE, PAUL)',
  'Protokolle (Lehrerkonferenzen, SCP-Gruppe)',
  'Sonstiges',
];

export function FormSchoolGoals({
  questionModules,
  onModuleChange,
  onModuleCheckboxChange,
  onAddModule,
  onRemoveModule,
  getAvailableGoals,
}: FormSchoolGoalsProps) {
  return (
    <>
      <div style={formStyles.section}>
        <h2 style={formStyles.section_title}>Schulziele</h2>

        {questionModules.map((module, index) => (
          <div key={module.id} style={formStyles.moduleCard}>
            <div style={formStyles.module_header}>
              <h3 style={formStyles.module_title}>Schulziel {index + 1}</h3>
              {questionModules.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveModule(module.id)}
                  style={formStyles.button_danger}
                >
                  Entfernen
                </button>
              )}
            </div>

            <div style={formStyles.fieldGroup}>
              {/* Question 01: Ziele im SCP */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label htmlFor={`goal-${module.id}`} style={formStyles.label}>
                  01. Ziele im SCP: Für welches SCP-Kernziel auf der schulischen Ebene hat sich Ihre Schule entschieden? <span style={formStyles.required}>*</span>
                </label>
                <select
                  id={`goal-${module.id}`}
                  value={module.goal}
                  onChange={(e) => onModuleChange(module.id, 'goal', e.target.value)}
                  required
                  style={formStyles.input}
                >
                  <option value="">Bitte wählen Sie ein Ziel...</option>
                  {module.goal && !getAvailableGoals(module.id).includes(module.goal) && (
                    <option value={module.goal}>{module.goal}</option>
                  )}
                  {getAvailableGoals(module.id).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question 1a: SMART Teilziel */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label htmlFor={`smartGoal-${module.id}`} style={formStyles.label}>
                  1a. Formulieren Sie ein SMART Teilziel
                </label>
                <textarea
                  id={`smartGoal-${module.id}`}
                  value={module.smartGoal}
                  onChange={(e) => onModuleChange(module.id, 'smartGoal', e.target.value)}
                  rows={3}
                  style={formStyles.textarea}
                  placeholder="Beschreiben Sie hier ein spezifisches, messbares, erreichbares, relevantes und zeitgebundenes Teilziel..."
                />
              </div>

              {/* Question 02: Auf wen bezieht sich das Ziel? */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={formStyles.label}>
                  02. Auf wen bezieht sich das Ziel? <span style={formStyles.required}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {TARGET_GROUP_OPTIONS.map((option) => (
                    <div key={option}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontWeight: 'normal',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={module.targetGroup.includes(option)}
                          onChange={() => onModuleCheckboxChange(module.id, 'targetGroup', option)}
                          style={{ cursor: 'pointer', marginTop: '0.25rem' }}
                        />
                        <span>{option}</span>
                      </label>
                      {option === 'Sonstige' && module.targetGroup.includes('Sonstige') && (
                        <input
                          type="text"
                          value={module.targetGroupOther}
                          onChange={(e) => onModuleChange(module.id, 'targetGroupOther', e.target.value)}
                          placeholder="Bitte geben Sie die Zielgruppe an..."
                          style={{ ...formStyles.input, marginLeft: '1.5rem', marginTop: '0.5rem' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 03: Was ist der Gegenstand des Ziels? */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={formStyles.label}>
                  03. Was ist der Gegenstand des Ziels? <span style={formStyles.required}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {SUBJECT_OPTIONS.map((option) => (
                    <div key={option}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontWeight: 'normal',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={module.subject.includes(option)}
                          onChange={() => onModuleCheckboxChange(module.id, 'subject', option)}
                          style={{ cursor: 'pointer', marginTop: '0.25rem' }}
                        />
                        <span>{option}</span>
                      </label>
                      {option === 'Sonstiges' && module.subject.includes('Sonstiges') && (
                        <input
                          type="text"
                          value={module.subjectOther}
                          onChange={(e) => onModuleChange(module.id, 'subjectOther', e.target.value)}
                          placeholder="Bitte geben Sie den Gegenstand an..."
                          style={{ ...formStyles.input, marginLeft: '1.5rem', marginTop: '0.5rem' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 04: Welche Datenquellen nutzen Sie, um die Zielerreichung zu überprüfen? */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={formStyles.label}>
                  04. Welche Datenquellen nutzen Sie, um die Zielerreichung zu überprüfen?{' '}
                  <span style={formStyles.required}>*</span>
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {DATA_SOURCES_OPTIONS.map((option) => (
                    <div key={option}>
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          fontWeight: 'normal',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={module.dataSources.includes(option)}
                          onChange={() => onModuleCheckboxChange(module.id, 'dataSources', option)}
                          style={{ cursor: 'pointer', marginTop: '0.25rem' }}
                        />
                        <span>{option}</span>
                      </label>
                      {option === 'Sonstiges' && module.dataSources.includes('Sonstiges') && (
                        <input
                          type="text"
                          value={module.dataSourcesOther}
                          onChange={(e) => onModuleChange(module.id, 'dataSourcesOther', e.target.value)}
                          placeholder="Bitte geben Sie die Datenquelle an..."
                          style={{ ...formStyles.input, marginLeft: '1.5rem', marginTop: '0.5rem' }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Question 05: Zeitpunkt für die Zielerreichung */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <label style={formStyles.label}>05. Zeitpunkt für die Zielerreichung</label>
                <div style={formStyles.fieldRow}>
                  <div>
                    <label
                      htmlFor={`startDate-${module.id}`}
                      style={{ ...formStyles.label, marginBottom: '0.25rem', fontSize: '0.875rem' }}
                    >
                      Startdatum
                    </label>
                    <input
                      id={`startDate-${module.id}`}
                      type="date"
                      value={module.startDate}
                      onChange={(e) => onModuleChange(module.id, 'startDate', e.target.value)}
                      required
                      style={formStyles.input}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`endDate-${module.id}`}
                      style={{ ...formStyles.label, marginBottom: '0.25rem', fontSize: '0.875rem' }}
                    >
                      Enddatum (optional)
                    </label>
                    <input
                      id={`endDate-${module.id}`}
                      type="date"
                      value={module.endDate}
                      onChange={(e) => onModuleChange(module.id, 'endDate', e.target.value)}
                      style={formStyles.input}
                    />
                  </div>
                </div>
              </div>

              {/* Question 06: Kommentare */}
              <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
                <label htmlFor={`comments-${module.id}`} style={formStyles.label}>
                  06. Kommentare
                </label>
                <textarea
                  id={`comments-${module.id}`}
                  value={module.comments}
                  onChange={(e) => onModuleChange(module.id, 'comments', e.target.value)}
                  rows={4}
                  style={formStyles.textarea}
                  placeholder="Haben Sie Kommentare hierzu?"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add another module */}
        <button
          type="button"
          onClick={onAddModule}
          disabled={questionModules.length >= GOAL_OPTIONS.length}
          style={
            questionModules.length >= GOAL_OPTIONS.length
              ? formStyles.button_success_disabled
              : formStyles.button_success
          }
        >
          {questionModules.length >= GOAL_OPTIONS.length
            ? `✓ Maximal ${GOAL_OPTIONS.length} Schulzielmodule erreicht`
            : '+ Weiteres Schulzielmodul hinzufügen'}
        </button>
      </div>

      <hr style={formStyles.hr} />
    </>
  );
}
