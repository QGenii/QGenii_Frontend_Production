import React, { useState, useRef, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import './MonthSelector.css';

const MonthSelector = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  const [showMonth, setShowMonth] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const years = Array.from({ length: 26 }, (_, i) => 2025 + i);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (monthRef.current && !monthRef.current.contains(e.target)) setShowMonth(false);
      if (dayRef.current && !dayRef.current.contains(e.target)) setShowDay(false);
      if (yearRef.current && !yearRef.current.contains(e.target)) setShowYear(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthSelect = (month) => {
    onMonthChange(month);
    setShowMonth(false);
  };

  const handleYearSelect = (year) => {
    onYearChange(year);
    setShowYear(false);
  };

  const handleDayClick = () => {
    setShowDay(false);
  };

  return (
    <div className="selector-container">
      <div className="selector-buttons">
        {/* Month dropdown */}
        <div className="selector-dropdown-wrap" ref={monthRef}>
          <Dropdown
            show={showMonth}
            onToggle={(isOpen) => {
              setShowMonth(isOpen);
              if (isOpen) {
                setShowDay(false);
                setShowYear(false);
              }
            }}
            align="start"
            drop="down"
          >
            <Dropdown.Toggle variant="light" id="month-dropdown" className="selector-button">
              {selectedMonth || 'Month'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-list">
              <div className="month-dropdown-header">List Of Months</div>
              <div className="month-list">
                {months.map((month, index) => (
                  <Dropdown.Item
                    key={month}
                    as="button"
                    type="button"
                    active={month === selectedMonth}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleMonthSelect(month);
                    }}
                  >
                    {month}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Day dropdown */}
        <div className="selector-dropdown-wrap" ref={dayRef}>
          <Dropdown
            show={showDay}
            onToggle={(isOpen) => {
              setShowDay(isOpen);
              if (isOpen) {
                setShowMonth(false);
                setShowYear(false);
              }
            }}
            align="start"
            drop="down"
          >
            <Dropdown.Toggle variant="light" id="day-dropdown" className="selector-button">
              Select Day
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-list">
              <div className="month-dropdown-header">List of days</div>
              <div className="day-list">
                {days.map((day, index) => (
                  <Dropdown.Item
                    key={day}
                    as="button"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDayClick();
                    }}
                  >
                    {day}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Year dropdown */}
        <div className="selector-dropdown-wrap" ref={yearRef}>
          <Dropdown
            show={showYear}
            onToggle={(isOpen) => {
              setShowYear(isOpen);
              if (isOpen) {
                setShowMonth(false);
                setShowDay(false);
              }
            }}
            align="start"
            drop="down"
          >
            <Dropdown.Toggle variant="light" id="year-dropdown" className="selector-button">
              {selectedYear || 'Select Year'}
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-list year-dropdown-menu">
              <div className="month-dropdown-header">List of Years</div>
              <div className="year-grid">
                {years.map((year) => (
                  <Dropdown.Item
                    key={year}
                    as="button"
                    type="button"
                    className="year-item"
                    active={year === selectedYear}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleYearSelect(year);
                    }}
                  >
                    {year}
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default MonthSelector;
