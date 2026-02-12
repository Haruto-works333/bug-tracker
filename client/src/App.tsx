import React, { useState, useEffect } from 'react';
import { getbugs } from './services/api';
import { Bug } from './types/Bug';
import BugList from './components/BugList';
import BugForm from './components/BugForm';
import BugModal from './components/BugModal';
import './App.css';

const App: React.FC = () => {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const fetchBugs = async () => {
    try {
      const data = await getbugs(filterStatus || undefined, filterPriority || undefined);
      setBugs(data);
    } catch (error) {
      console.error('Failed to fetch bugs:', error);
    }
  };

  useEffect(() => {
    fetchBugs();
  }, [filterStatus, filterPriority]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🐛 Bug Tracker</h1>
        <p>Track and manage bugs efficiently</p>
      </header>

      <main className="app-main">
        <div className="toolbar">
          <BugForm onBugCreated={fetchBugs} />
          <div className="filters">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
              <option value="">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <BugList bugs={bugs} onBugClick={setSelectedBug} />

        {selectedBug && (
          <BugModal
            bug={selectedBug}
            onClose={() => setSelectedBug(null)}
            onUpdated={fetchBugs}
          />
        )}
      </main>
    </div>
  );
};

export default App;