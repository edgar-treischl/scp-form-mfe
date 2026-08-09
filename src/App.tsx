import { useState } from 'react';
import { Landing, FormEditor, SubmissionHistory, SubmissionView, About } from './pages';
import { Footer } from './components';
import './App.css';

type View = 'landing' | 'form' | 'history' | 'view' | 'about';

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
        return <FormEditor onNavigate={handleNavigate} submissionId={selectedSubmissionId || undefined} />;
      case 'history':
        return <SubmissionHistory onNavigate={handleNavigate} />;
      case 'view':
        return <SubmissionView submissionId={selectedSubmissionId} onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return <Landing onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      <main>
        {renderView()}
        <Footer onNavigate={handleNavigate} />
      </main>
    </div>
  );
}

export default App;
