import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './DownloadPlanModal.css';

const DownloadPlanModal = ({ show, handleClose }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    dailyProgress: false,
    weeklySummary: false,
    goalsChecklist: false,
    notes: false,
    graphsCharts: false
  });
  const [goalName, setGoalName] = useState('');

  const handleCheckboxChange = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [option]: !selectedOptions[option]
    });
  };

  const handleDownload = () => {
    // Logic to generate and download PDF would go here
    console.log("Downloading with options:", selectedOptions, "Goal:", goalName);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="download-plan-modal">
      <Modal.Header closeButton>
        <Modal.Title>Download Your study Plan as PDF</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="download-preview-section">
          <div className="preview-container">
            <div className="pdf-preview">
              <div className="preview-header">
                <h5>Study Plan</h5>
                <p>August 12, 2023</p>
              </div>
              <div className="preview-progress-bars">
                <div className="preview-progress">
                  <div className="preview-progress-label">Daily Progress</div>
                  <div className="preview-progress-bar">
                    <div className="preview-progress-fill" style={{ width: '65%' }}></div>
                  </div>
                  <div className="preview-progress-value">65%</div>
                </div>
                <div className="preview-progress">
                  <div className="preview-progress-label">Weekly Progress</div>
                  <div className="preview-progress-bar">
                    <div className="preview-progress-fill" style={{ width: '75%' }}></div>
                  </div>
                  <div className="preview-progress-value">75%</div>
                </div>
              </div>
              {/* <div className="preview-subjects"> */}
                {/* <div className="preview-subject-item">
                  <div>Math 101</div>
                  <div>80%</div>
                </div>
                <div className="preview-subject-item">
                  <div>Mathematics</div>
                  <div>65%</div>
                </div>
                <div className="preview-subject-item">
                  <div>Philosophy</div>
                  <div>75%</div>
                </div>
                <div className="preview-subject-item">
                  <div>Computer Science</div>
                  <div>88%</div>
                </div>
                <div className="preview-subject-item">
                  <div>History</div>
                  <div>55%</div>
                </div>
              </div> */}
            </div>
          </div>
          
          <div className="download-options">
            <div className="download-checkboxes">
              <Form.Check 
                type="checkbox"
                id="daily-progress"
                label="Daily Progress"
                checked={selectedOptions.dailyProgress}
                onChange={() => handleCheckboxChange('dailyProgress')}
              />
              <Form.Check 
                type="checkbox"
                id="weekly-summary"
                label="Weekly Summary"
                checked={selectedOptions.weeklySummary}
                onChange={() => handleCheckboxChange('weeklySummary')}
              />
              <Form.Check 
                type="checkbox"
                id="goals-checklist"
                label="Goals Checklist"
                checked={selectedOptions.goalsChecklist}
                onChange={() => handleCheckboxChange('goalsChecklist')}
              />
              <Form.Check 
                type="checkbox"
                id="notes"
                label="Notes"
                checked={selectedOptions.notes}
                onChange={() => handleCheckboxChange('notes')}
              />
              <Form.Check 
                type="checkbox"
                id="graphs-charts"
                label="Graphs/Charts"
                checked={selectedOptions.graphsCharts}
                onChange={() => handleCheckboxChange('graphsCharts')}
              />
            </div>
            
            <div className="goal-name-input">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Goal Name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleDownload} 
          className="download-pdf-btn"
        >
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadPlanModal;