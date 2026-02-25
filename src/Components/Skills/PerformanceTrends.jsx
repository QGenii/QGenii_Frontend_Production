import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MainNavbar from '../MainNavbar'
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './PerformanceTrends.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceTrends = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const years = ['2025', '2025', '2025', '2025', '2025', '2025', '2025', '2025', '2025', '2025', '2025', '2025'];
  
  const skillPerformanceData = {
    labels: months.map((month, index) => `${month}\\n${years[index]}`),
    datasets: [
      {
        label: 'Skill Performance',
        data: [40, 50, 55, 80, 90, 85, 75, 80, 85, 80, 90, 85],
        borderColor: '#1976d2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      }
    ],
  };

  const interviewDropData = {
    labels: months.map((month, index) => `${month}\\n${years[index]}`),
    datasets: [
      {
        label: 'Interview Drop Off',
        data: [20, 15, 20, 18, 30, 35, 25, 40, 30, 20, 25, 22],
        borderColor: '#e53935',
        backgroundColor: 'rgba(229, 57, 53, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      }
    ],
  };

  const hiringVolumeData = {
    labels: months.map((month, index) => `${month}\\n${years[index]}`),
    datasets: [
      {
        label: 'Hiring Volume',
        data: [45, 55, 65, 85, 100, 20, 40, 75, 50, 70, 95, 85],
        backgroundColor: '#4caf50',
        borderRadius: 4,
        yAxisID: 'y',
      }
    ],
  };
  
  // Combined data for the chart
  const combinedData = {
    labels: months.map((month, index) => `${month}\\n${years[index]}`),
    datasets: [
      {
        type: 'line',
        label: 'Skill Performance',
        data: [40, 50, 55, 80, 90, 85, 75, 80, 85, 80, 90, 85],
        borderColor: '#1976d2',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Interview Drop Off',
        data: [20, 15, 20, 18, 30, 35, 25, 40, 30, 20, 25, 22],
        borderColor: '#e53935',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'Hiring Volume',
        data: [45, 55, 65, 85, 100, 20, 40, 75, 50, 70, 95, 85],
        backgroundColor: '#4caf50',
        borderRadius: 4,
        yAxisID: 'y',
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: '#f0f0f0',
        },
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
        cornerRadius: 6,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        padding: 12,
      }
    }
  };

  return (
    <div className="performance-trends-page">
      {/* <MainNavbar /> */}
      <div className="breadcrumb-wrapper">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span> &gt; </span>
          <a href="/skills/study-plan">Study Plan</a>
          <span> &gt; </span>
          <span>Performance Trends</span>
        </div>
      </div>
      <Container>
        <div className="performance-trends-header">
          <h1>Performance Trends</h1>
        </div>
        <div className="chart-container">
          <div style={{ height: 400 }}>
            <Bar 
              data={combinedData} 
              options={chartOptions} 
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default PerformanceTrends;