import React, { useState } from 'react';
import { createBug } from '../services/api';

interface BugFormProps {
  onBugCreated: () => void;
}

const BugForm: React.FC<BugFormProps> = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createBug({ title, description, priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setIsOpen(false);
      onBugCreated();
    } catch (error) {
      console.error('Failed to create bug:', error);
    }
  };

  if (!isOpen) {
    return (
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        + New Bug
      </button>
    );
  }

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <h3>Report New Bug</h3>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's the bug?"
          required
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the bug in detail..."
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Create</button>
        <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>Cancel</button>
      </div>
    </form>
  );
};

export default BugForm;