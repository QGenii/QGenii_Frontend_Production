import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import './MonthSelector.css';

const MonthSelector = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showDayDropdown, setShowDayDropdown] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const years = Array.from({ length: 26 }, (_, i) => 2025 + i);

  const handleMonthClick = (month) => {
    onMonthChange(month);
    setShowMonthDropdown(false);
  };

  const handleYearClick = (year) => {
    onYearChange(year);
    setShowYearDropdown(false);
  };

  return (
    <div className="selector-container">
      <div className="selector-buttons">
        <Dropdown show={showMonthDropdown} onToggle={(isOpen) => setShowMonthDropdown(isOpen)} className="selector-dropdown">
          <Dropdown.Toggle variant="light" id="month-dropdown" className="selector-button">
            Month
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-list">
            <div className="month-dropdown-header">List Of Months</div>
            <div className="month-list">
              {months.map((month, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleMonthClick(month)}
                  active={month === selectedMonth}
                >
                  {month}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={showDayDropdown} onToggle={(isOpen) => setShowDayDropdown(isOpen)} className="selector-dropdown">
          <Dropdown.Toggle variant="light" id="day-dropdown" className="selector-button">
            Select Day
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-list">
            <div className="month-dropdown-header">List of days</div>
            <div className="day-list">
              {days.map((day, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => setShowDayDropdown(false)}
                >
                  {day}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={showYearDropdown} onToggle={(isOpen) => setShowYearDropdown(isOpen)} className="selector-dropdown">
          <Dropdown.Toggle variant="light" id="year-dropdown" className="selector-button">
            Select Year
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-menu-list year-dropdown-menu">
            <div className="month-dropdown-header">List of Years</div>
            <div className="year-grid">
              {years.map((year, index) => (
                <Dropdown.Item
                  key={index}
                  onClick={() => handleYearClick(year)}
                  active={year === selectedYear}
                  className="year-item"
                >
                  {year}
                </Dropdown.Item>
              ))}
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default MonthSelector;