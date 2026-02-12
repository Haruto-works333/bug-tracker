import React from 'react';
import { Bug } from '../types/Bug';

interface BugListProps {
  bugs: Bug[];
  onBugClick: (bug: Bug) => void;
}

const priorityColor: Record<string, string> = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
};

const statusLabel: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
};

const BugList: React.FC<BugListProps> = ({ bugs, onBugClick }) => {
  if (bugs.length === 0) {
    return <p className="no-bugs">No bugs found. Nice work! 🎉</p>;
  }

  return (
    <div className="bug-list">
      {bugs.map((bug) => (
        <div key={bug.id} className="bug-card" onClick={() => onBugClick(bug)}>
          <div className="bug-header">
            <h4>{bug.title}</h4>
            <span
              className="priority-badge"
              style={{ backgroundColor: priorityColor[bug.priority] }}
            >
              {bug.priority}
            </span>
          </div>
          <p className="bug-description">{bug.description || 'No description'}</p>
          <div className="bug-footer">
            <span className={`status-badge status-${bug.status}`}>
              {statusLabel[bug.status] || bug.status}
            </span>
            <span className="bug-date">
              {new Date(bug.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BugList;