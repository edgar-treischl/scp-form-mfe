import { useState } from 'react';
import { Landing, FormEditor, SubmissionHistory, SubmissionView } from './pages';
import './App.css';

type View = 'landing' | 'form' | 'history' | 'view';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

  const handleNavigate = (view: View, submissionId?: string) => {
    setCurrentView(view);
    if (submissionId) {
      setSelectedSubmissionId(submissionId);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <Landing onNavigate={handleNavigate} />;
      case 'form':
        return <FormEditor onNavigate={handleNavigate} />;
      case 'history':
        return <SubmissionHistory onNavigate={handleNavigate} />;
      case 'view':
        return <SubmissionView submissionId={selectedSubmissionId} onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <nav>
        <button onClick={() => handleNavigate('landing')}>Home</button>
        <button onClick={() => handleNavigate('form')}>Form</button>
        <button onClick={() => handleNavigate('history')}>History</button>
      </nav>
      
      <main>
        {renderView()}
      </main>
    </div>
  );
}

export default App;
