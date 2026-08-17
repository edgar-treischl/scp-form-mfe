import { StatusBadge, Breadcrumb } from '../components';
import type { Submission } from '../types';

interface SubmissionHistoryProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view' | 'about' | 'eval', submissionId?: string) => void;
}

// Mock data - matches FormEditor structure with complete form fields
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
      istStandAnalyse: 'Die Evaluation des Vorjahres zeigt positive Fortschritte in der Teamzusammenarbeit und ein gestärktes Wellbeing-Bewusstsein. Herausforderungen bestehen in der digitalen Transformation der Unterrichtsprozesse und in der gezielten Förderung von Schülerinnen und Schülern mit Förderbedarf.',
      supportPersonnel: true,
      supportTypes: ['SEM', 'BDA'],
      supportOtherText: '',
      dataSources: ['Schulstatistiken (z. B. ASV/ASD)', 'Zentrale Lernstandserhebungen (z. B. VERA, BYLES, Lernstand 5, Orientierungsarbeiten)'],
      questionModules: [
        {
          id: '1',
          smartGoal: 'Steigerung der Deutsch-Kompetenzwerte um mindestens 15% bei 80% der Schülerinnen und Schüler der Klasse 4.',
          targetGroup: ['Alle Schülerinnen und Schüler', '4. Jahrgangsstufe'],
          targetGroupOther: '',
          subject: ['Deutsch', 'Sprachförderung'],
          subjectOther: '',
          dataSources: ['Zentrale Lernstandserhebungen (z. B. VERA, BYLES, Lernstand 5, Orientierungsarbeiten)'],
          dataSourcesOther: '',
          startDate: '2025-08-01',
          endDate: '2025-12-31',
          comments: 'Differenzierte Förderung mit Unterstützung durch Schulpsychologe und SEM.',
        },
      ],
      schoolGoalModules: [
        {
          id: '1',
          smartGoal: 'Implementierung von 2 neuen Schulkultur-Maßnahmen mit dokumentierter Partizipation von mind. 70% der Schulgemeinschaft.',
          targetGroup: ['Schulgemeinschaft'],
          targetGroupOther: '',
          subject: ['Schulentwicklung'],
          subjectOther: '',
          dataSources: ['Schulstatistiken (z. B. ASV/ASD)'],
          dataSourcesOther: '',
          startDate: '2025-08-15',
          endDate: '2025-12-31',
          comments: '',
        },
      ],
      measureModules: [
        {
          id: '1',
          description: 'Wöchentliche Deutsch-Förderblöcke für Schülerinnen und Schüler mit Lernrückständen.',
          type: 'Unterricht/Förderung',
          responsible: 'Deutschlehrkräfte',
          involved: ['Schulpsychologe', 'SEM'],
          resources: ['2h/Woche Förderzeit', 'Differenziertes Material'],
          resourcesDescription: 'Budget für Material: ca. 500€',
          workMethod: ['Kleingruppen-Förderung', 'Individuelle Lernpläne'],
          workMethodDescription: 'Wöchentliche Koordinationstreffen zur Abstimmung',
          deadline: '2025-08-15',
        },
      ],
      selectedGoal: 'Erhöhte Anzahl an Schülerinnen und Schülern erreichen mithilfe entsprechender Basiskompetenzen die Mindeststandards in Deutsch.',
      selectedSchoolGoal: 'Die Schulgemeinschaft verfolgt die Gestaltung einer positiven Schulkultur und die Entwicklung der Schule hin zu einem förderlichen Lern- und Sozialraum als handlungsleitendes Grundprinzip.',
      evaluationDate: '2026-03-31',
      bilanzierungDate: '2026-06-30',
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
      istStandAnalyse: 'Die bisherigen Entwicklungen deuten auf Erfolge bei der Sprachförderung hin. Neue Herausforderungen entstehen durch den Zuzug von Schülerinnen und Schülern mit Flüchtlingshintergrund und dem Bedarf nach verstärkter interkultureller Schulentwicklung.',
      supportPersonnel: true,
      supportTypes: ['SEM', 'Schulpsychologe'],
      supportOtherText: 'Interkulturelle Trainerin',
      dataSources: ['Schulstatistiken (z. B. ASV/ASD)', 'Feedbackfragebögen', 'Unterrichtsbeobachtungen'],
      questionModules: [
        {
          id: '1',
          smartGoal: 'Erhöhung der Elternbeteiligung um 40% durch Einführung von kulturell sensiblen Eltern-Sprechstunden bis Q3 2026.',
          targetGroup: ['Eltern', 'Erziehungsberechtigte'],
          targetGroupOther: 'Familien mit Migrationshintergrund',
          subject: ['Schulentwicklung', 'Elternarbeit'],
          subjectOther: '',
          dataSources: ['Feedbackfragebögen'],
          dataSourcesOther: 'Teilnahmequoten bei Veranstaltungen',
          startDate: '2026-08-01',
          endDate: '2026-12-31',
          comments: 'Kooperation mit Schulpsychologe und interkultureller Trainerin erforderlich.',
        },
      ],
      schoolGoalModules: [
        {
          id: '1',
          smartGoal: 'Aufbau von 3 neuen strategischen Partnerschaften (Integrationsdienst, Berufsschulen, Kultureinrichtungen) mit festgelegten Kooperationsverträgen.',
          targetGroup: ['Schulleitung', 'Koordinator'],
          targetGroupOther: 'Externe Partner',
          subject: ['Netzwerkentwicklung'],
          subjectOther: '',
          dataSources: ['Kooperationsverträge', 'Projektdokumentation'],
          dataSourcesOther: '',
          startDate: '2026-09-01',
          endDate: '2027-03-31',
          comments: 'Steuergruppe koordiniert alle Netzwerk-Aktivitäten.',
        },
      ],
      measureModules: [
        {
          id: '1',
          description: 'Durchführung von monatlichen Eltern-Sprechstunden mit interkultureller Moderation und Dolmetscherdiensten.',
          type: 'Schulentwicklung',
          responsible: 'Schulleiter',
          involved: ['Interkulturelle Trainerin', 'Schulpsychologe', 'Dolmetscher'],
          resources: ['Räumlichkeiten', 'Honorar Moderatorin', 'Dolmetscherdienste'],
          resourcesDescription: 'Budget: ca. 8.000€ für Moderatorin und Dolmetscher (Schuljahr)',
          workMethod: ['Beratungsgespräche', 'Kultursensible Kommunikation'],
          workMethodDescription: 'Schulung aller beteiligten Lehrkräfte in interkultureller Kompetenz',
          deadline: '2026-08-15',
        },
        {
          id: '2',
          description: 'Aufbau von Partnerschaften mit lokalen Integrationsdiensten, Berufsschulen und Kultureinrichtungen.',
          type: 'Netzwerkentwicklung',
          responsible: 'Koordinatorin Schulentwicklung',
          involved: ['Schulleitung', 'Externe Partner'],
          resources: ['Zeit für Abstimmung', 'Kooperationsvertrag'],
          resourcesDescription: 'Keine zusätzlichen Kosten geplant',
          workMethod: ['Netzwerk-Meetings', 'Fachlicher Austausch'],
          workMethodDescription: 'Halbjährliche Koordinationstreffen mit allen Partnern',
          deadline: '2026-09-30',
        },
      ],
      selectedGoal: 'Gesteigerte Umsetzung der Chancengerechtigkeit insbesondere im Bereich der Zusammenarbeit mit Eltern und Erziehungsberechtigten.',
      selectedSchoolGoal: 'Von der Schule werden nachhaltig angelegte außerschulische und schul(art)übergreifende Netzwerke und Unterstützungssysteme wirksam und zielorientiert genutzt.',
      evaluationDate: '2027-03-31',
      bilanzierungDate: '2027-06-30',
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
              <th style={{ padding: '0.75rem' }}>Aktionen</th>
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
                <td style={{ padding: '0.75rem' }}>
                  {submission.status === 'submitted' ? (
                    <button
                      onClick={() => onNavigate('eval', submission.id)}
                      style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        background: '#1E8AD9',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#1565A0';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = '#1E8AD9';
                      }}
                    >
                      Evaluierung
                    </button>
                  ) : (
                    <span style={{ color: '#999', fontSize: '0.85rem' }}>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
