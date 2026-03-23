import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './DownloadPlanModal.css';
import generateQGeniiStudyPlanPDF from './generate';
import logoSrc from '../../assets/assets/Navbar/codeiqgeniuslogo.jpg';

const DownloadPlanModal = ({ show, handleClose, studyPlanData = {} }) => {
  const [goalName, setGoalName] = useState(studyPlanData?.goalName || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    dailyProgress: true,
    weeklySummary: true,
    goalsChecklist: true,
    notes: true,
    graphsCharts: true,
    studyPlansList: true,
  });

  const handleCheckboxChange = (option) => {
    setSelectedOptions(prev => ({ ...prev, [option]: !prev[option] }));
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generateQGeniiStudyPlanPDF({
        ...studyPlanData,
        goalName: goalName || studyPlanData?.goalName,
        selectedOptions,
        platformName: 'QGenii',
        website: 'https://qgenii.com',
      });
    } finally {
      setIsGenerating(false);
      handleClose();
    }
  };

  const dp  = studyPlanData?.dailyProgress   ?? 0;
  const wp  = studyPlanData?.weeklyProgress  ?? 0;
  const op  = studyPlanData?.overallProgress ?? 0;
  const cat = studyPlanData?.category  || '—';
  const pri = studyPlanData?.priority  || '—';
  const sts = studyPlanData?.status    || '—';
  const targetDate = studyPlanData?.targetDate
    ? new Date(studyPlanData.targetDate).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })
    : '—';

  return (
    <Modal show={show} onHide={handleClose} centered className="download-plan-modal">
      <Modal.Header closeButton>
        <Modal.Title>📄 Download Study Plan as PDF</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="download-preview-section">

          {/* ── Left: PDF Preview ── */}
          <div className="preview-container">
            <div className="pdf-preview">
              {/* mini header strip */}
              <div className="preview-header-strip">
                <img
                  src={logoSrc}
                  alt="QGenii"
                  className="preview-logo-thumb"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="preview-logo-placeholder" style={{ display: 'none' }}>Q</div>
                <div className="preview-header-text">
                  <h5>QGenii Study Plan</h5>
                  <p>{new Date().toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</p>
                </div>
              </div>

              <div className="preview-body">
                {/* badges */}
                <div className="preview-badges">
                  <span className={`preview-badge category`}>{cat}</span>
                  <span className={`preview-badge priority-${pri}`}>{pri}</span>
                  <span className={`preview-badge status-${sts}`}>{sts.replace('_', ' ')}</span>
                </div>

                {/* progress bars */}
                <div className="preview-progress-bars">
                  <div className="preview-progress">
                    <div className="preview-progress-row">
                      <span className="preview-progress-label">Daily Progress</span>
                      <span className="preview-progress-value">{dp}%</span>
                    </div>
                    <div className="preview-progress-bar">
                      <div className="preview-progress-fill daily" style={{ width: `${dp}%` }} />
                    </div>
                  </div>
                  <div className="preview-progress">
                    <div className="preview-progress-row">
                      <span className="preview-progress-label">Weekly Progress</span>
                      <span className="preview-progress-value">{wp}%</span>
                    </div>
                    <div className="preview-progress-bar">
                      <div className="preview-progress-fill weekly" style={{ width: `${wp}%` }} />
                    </div>
                  </div>
                  <div className="preview-progress">
                    <div className="preview-progress-row">
                      <span className="preview-progress-label">Overall Progress</span>
                      <span className="preview-progress-value">{op}%</span>
                    </div>
                    <div className="preview-progress-bar">
                      <div className="preview-progress-fill overall" style={{ width: `${op}%` }} />
                    </div>
                  </div>
                </div>

                {/* info rows */}
                <div style={{ marginTop: 10 }}>
                  <div className="preview-info-row">
                    <span>Target Date</span>
                    <strong>{targetDate}</strong>
                  </div>
                  <div className="preview-info-row">
                    <span>Est. Hours</span>
                    <strong>{studyPlanData?.estimatedHours ?? '—'} hrs</strong>
                  </div>
                  <div className="preview-info-row">
                    <span>Actual Hours</span>
                    <strong>{studyPlanData?.actualHours ?? '—'} hrs</strong>
                  </div>
                  <div className="preview-info-row">
                    <span>Plans Total</span>
                    <strong>{studyPlanData?.totalPlans ?? '—'}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Options ── */}
          <div className="download-options">
            <p className="options-section-label">Include Sections</p>
            <div className="download-checkboxes">
              {[
                { key: 'dailyProgress',   label: 'Daily & Weekly Progress' },
                { key: 'weeklySummary',   label: 'Performance Summary' },
                { key: 'goalsChecklist',  label: 'Goals / Subtasks Checklist' },
                { key: 'graphsCharts',    label: 'Performance Trend Chart' },
                { key: 'studyPlansList',  label: 'All Study Plans Table' },
                { key: 'notes',           label: 'Notes' },
              ].map(({ key, label }) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  id={key}
                  label={label}
                  checked={selectedOptions[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
              ))}
            </div>

            <div className="goal-name-input">
              <Form.Label>Goal Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. Crack FAANG Interview"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" className="cancel-btn" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          className="download-pdf-btn"
          onClick={handleDownload}
          disabled={isGenerating}
        >
          {isGenerating ? '⏳ Generating PDF…' : '⬇ Download PDF'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadPlanModal;