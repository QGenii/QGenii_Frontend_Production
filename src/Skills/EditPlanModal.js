import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditPlanModal.css';

const EditPlanModal = ({ show, handleClose }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Practice Algebra', frequency: '1 hour per day', isNew: false },
    { id: 2, title: 'Review Calculus', frequency: '2 hours per week', isNew: false }
  ]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskFrequency, setNewTaskFrequency] = useState('');

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== '' && newTaskFrequency.trim() !== '') {
      const newTask = {
        id: Date.now(),
        title: newTaskTitle,
        frequency: newTaskFrequency,
        isNew: true
      };
      
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskFrequency('');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="edit-plan-modal">
      <Modal.Header closeButton>
        <Modal.Title>Edit Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="subject-selector">
          <label>Subject</label>
          <Form.Select 
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="math">Mathematics</option>
            <option value="science">Science</option>
            <option value="language">Language</option>
            <option value="programming">Programming</option>
          </Form.Select>
        </div>
        
        <div className="tasks-section">
          <label>Tasks</label>
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <div className="task-details">
                  <div className="task-title">{task.title}</div>
                  <div className="task-frequency">{task.frequency}</div>
                </div>
                <Button 
                  variant="link" 
                  className="delete-task-btn"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="add-task-section">
          <Button 
            variant="outline-primary" 
            className="add-task-btn"
            onClick={handleAddTask}
          >
            <span className="plus-icon">+</span> Add task
          </Button>
          <div className="new-task-form">
            <Form.Control
              placeholder="Task title"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="mb-2"
            />
            <Form.Control
              placeholder="Frequency (e.g., 1 hour daily)"
              value={newTaskFrequency}
              onChange={(e) => setNewTaskFrequency(e.target.value)}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose} className="save-plan-btn">
          Save Plan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPlanModal;