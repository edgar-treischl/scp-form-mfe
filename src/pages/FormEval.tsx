import { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { FormCallout } from '../components/form_callout';
import { FormEvaluation } from '../components/form_evaluation';

interface FormEvalProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view' | 'about' | 'eval') => void;
}

export function FormEval({ onNavigate }: FormEvalProps) {
  const [currentStep, setCurrentStep] = useState(5);
  const [evaluationDate, setEvaluationDate] = useState('');
  const [bilanzierungDate, setBilanzierungDate] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleEvaluationDateChange = (date: string) => {
    setEvaluationDate(date);
  };

  const handleBilanzierungDateChange = (date: string) => {
    setBilanzierungDate(date);
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handlePreviousStep = () => {
    if (currentStep > 5) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = () => {
    alert('Evaluierung eingereicht! (Mock - kein Backend)');
    onNavigate('history');
  };

  const colors = {
    primary: '#1E8AD9',
    success: '#64D4C6',
    danger: '#dc3545',
    warning: '#ffc107',
    neutral: '#f8f9fa',
    border: '#dee2e6',
    text: '#212529',
    textMuted: '#6c757d',
    disabled: '#e9ecef',
  };

  const styles = {
    container: {
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem 1rem',
    } as const,
    header: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
    } as const,
    header_title: {
      fontSize: '2rem',
      fontWeight: '600' as const,
      lineHeight: '1.25',
      color: colors.text,
      margin: 0,
      marginBottom: '0.5rem',
    } as const,
    button: {
      padding: '0.65rem 1.5rem',
      fontSize: '0.95rem',
      fontWeight: '500' as const,
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      background: colors.primary,
      color: 'white',
    } as const,
    button_secondary: {
      background: colors.neutral,
      color: colors.text,
      border: `1px solid ${colors.border}`,
    } as const,
    button_disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    } as const,
    footer: {
      display: 'flex' as const,
      gap: '1rem',
      justifyContent: 'space-between',
      marginTop: '2rem',
      paddingTop: '2rem',
      borderTop: `1px solid ${colors.border}`,
    } as const,
    button_back: {
      background: colors.neutral,
      color: colors.text,
      border: `1px solid ${colors.border}`,
    } as const,
  };

  const breadcrumbItems = [
    { label: 'Home', onClick: () => onNavigate('landing') },
    { label: 'Bilanzierung' },
  ];

  return (
    <div style={styles.container}>
      <Breadcrumb items={breadcrumbItems} />
      <header style={styles.header}>
        <h1 style={styles.header_title}>Bilanzierung</h1>
      </header>

      {/* Evaluation Step */}
      {currentStep === 5 && (
        <FormEvaluation
          evaluationDate={evaluationDate}
          bilanzierungDate={bilanzierungDate}
          uploadedFiles={uploadedFiles}
          onEvaluationDateChange={handleEvaluationDateChange}
          onBilanzierungDateChange={handleBilanzierungDateChange}
          onFileUpload={handleFileUpload}
          onFileRemove={handleFileRemove}
        />
      )}

      {/* Callout Step */}
      {currentStep === 6 && (
        <FormCallout
          title="Hinweis: Weitere Fragen zur Datengestützte Bilanzierung pro Teilziel"
          message="Das Formular zur Bilanzierung pro Teilziel ist nicht implementiert."
        />
      )}

      {/* Step Navigation Footer */}
      <footer style={styles.footer}>
        <button
          type="button"
          onClick={handlePreviousStep}
          style={{
            ...styles.button,
            ...styles.button_back,
            ...(currentStep === 5 ? styles.button_disabled : {}),
          }}
          disabled={currentStep === 5}
        >
          ← Zurück
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="button"
            onClick={() => onNavigate('history')}
            style={{
              ...styles.button,
              ...styles.button_secondary,
            }}
          >
            Abbrechen
          </button>
          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNextStep}
              style={{
                ...styles.button,
                ...(currentStep === 6 ? styles.button_disabled : {}),
              }}
              disabled={currentStep === 6}
            >
              Weiter →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                ...styles.button,
              }}
            >
              Senden ✓
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
