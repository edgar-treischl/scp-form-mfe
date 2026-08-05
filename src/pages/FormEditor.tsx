import { useState } from 'react';
import { SaveIndicator } from '../components';

interface FormEditorProps {
  onNavigate: (view: 'landing' | 'form' | 'history' | 'view') => void;
}

export function FormEditor({ onNavigate }: FormEditorProps) {
  const [saveStatus, setSaveStatus] = useState<'saving' | 'saved' | 'error' | 'idle'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    requestType: 'general',
    priority: 'medium',
    title: '',
    description: '',
    estimatedCost: '',
    justification: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Simulate autosave
    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Form submitted! (Mock - no backend)');
    onNavigate('history');
  };

  return (
    <div>
      <header>
        <h1>Edit Form</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ padding: '0.25rem 0.5rem', background: '#fff3cd', borderRadius: '4px' }}>Draft</span>
          <SaveIndicator status={saveStatus} />
        </div>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="fullName">Full Name *</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>

            <div>
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="department">Department *</label>
              <input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>

            <div>
              <label htmlFor="requestType">Request Type *</label>
              <select
                id="requestType"
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              >
                <option value="general">General Request</option>
                <option value="equipment">Equipment Purchase</option>
                <option value="software">Software License</option>
                <option value="training">Training Request</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="priority">Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="title">Request Title *</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Brief summary of your request"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div>
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Provide detailed information about your request"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="estimatedCost">Estimated Cost</label>
              <input
                id="estimatedCost"
                name="estimatedCost"
                type="text"
                value={formData.estimatedCost}
                onChange={handleChange}
                placeholder="e.g., $500"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="justification">Business Justification</label>
            <textarea
              id="justification"
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              rows={4}
              placeholder="Explain why this request is needed and its business impact"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        </div>

        <footer>
          <button type="button" onClick={() => onNavigate('landing')}>Cancel</button>
          <button type="submit" style={{ background: '#0066cc', color: 'white', fontWeight: 'bold' }}>
            Submit Form
          </button>
        </footer>
      </form>
    </div>
  );
}
