interface LandingProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

export function Landing({ onNavigate }: LandingProps) {
  return (
    <div>
      <h1>Form Application</h1>
      <p>Welcome to the internal form submission system.</p>
      
      <section>
        <h2>Start New Form</h2>
        <p>Create a new form submission or continue editing a draft.</p>
        <button onClick={() => onNavigate('form')}>Create New Form</button>
      </section>

      <section>
        <h2>Previous Submissions</h2>
        <p>View and manage your submitted forms and drafts.</p>
        <button onClick={() => onNavigate('history')}>View All Submissions</button>
      </section>
    </div>
  );
}
