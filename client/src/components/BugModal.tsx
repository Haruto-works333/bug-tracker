import React, { useState, useEffect } from 'react';
import { Bug } from '../types/Bug';
import { updateBug, deleteBug } from '../services/api';

interface BugModalProps {
  bug: Bug;
  onClose: () => void;
  onUpdated: () => void;
}

const BugModal: React.FC<BugModalProps> = ({ bug, onClose, onUpdated }) => {
  const [title, setTitle] = useState(bug.title);
  const [description, setDescription] = useState(bug.description || '');
  const [status, setStatus] = useState(bug.status);
  const [priority, setPriority] = useState(bug.priority);

  const handleUpdate = async () => {
    try {
      await updateBug(bug.id, { title, description, status, priority });
      onUpdated();
      onClose();
    } catch (error) {
      console.error('Failed to update bug:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await deleteBug(bug.id);
        onUpdated();
        onClose();
      } catch (error) {
        console.error('Failed to delete bug:', error);
      }
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Bug</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
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
          <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BugModal;