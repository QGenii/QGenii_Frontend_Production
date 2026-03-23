// QGenii Study Plan PDF Generator — backend-driven
import jsPDF from 'jspdf';
import logoSrc from '../../assets/assets/Navbar/codeiqgeniuslogo.jpg';

// ─── Utility: load an image src into a base64 data-URL ──────────────────────
const toDataURL = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      c.getContext('2d').drawImage(img, 0, 0);
      resolve(c.toDataURL('image/jpeg'));
    };
    img.onerror = reject;
    img.src = src;
  });

// ─── Utility: draw a performance-trend chart onto an off-screen canvas ───────
const buildChartImage = (skillData, dropData, volumeData) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const W = 980, H = 320;
  const pL = 55, pR = 30, pT = 30, pB = 65;
  const plotW = W - pL - pR;
  const plotH = H - pT - pB;
  const MAX = 120;

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // background
  ctx.fillStyle = '#f9fafb';
  ctx.fillRect(0, 0, W, H);

  const xOf = (i) => pL + (i / (months.length - 1)) * plotW;
  const yOf = (v) => pT + plotH - (v / MAX) * plotH;

  // horizontal grid + y-labels
  ctx.strokeStyle = '#e5e7eb'; ctx.lineWidth = 1;
  for (let t = 0; t <= 5; t++) {
    const yy = pT + (t / 5) * plotH;
    ctx.beginPath(); ctx.moveTo(pL, yy); ctx.lineTo(pL + plotW, yy); ctx.stroke();
    ctx.fillStyle = '#9ca3af'; ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(String(MAX - t * (MAX / 5)), pL - 6, yy + 4);
  }

  // x-labels
  months.forEach((m, i) => {
    ctx.fillStyle = '#6b7280'; ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(m, xOf(i), H - pB + 18);
  });

  // bars — Hiring Volume
  const barW = (plotW / months.length) * 0.48;
  volumeData.forEach((v, i) => {
    const bh = (v / MAX) * plotH;
    ctx.fillStyle = 'rgba(76,175,80,0.55)';
    ctx.beginPath();
    const bx = xOf(i) - barW / 2, by = pT + plotH - bh;
    ctx.roundRect ? ctx.roundRect(bx, by, barW, bh, 3) : ctx.rect(bx, by, barW, bh);
    ctx.fill();
  });

  // line helper
  const drawLine = (data, color) => {
    ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round';
    ctx.beginPath();
    data.forEach((v, i) => i === 0 ? ctx.moveTo(xOf(i), yOf(v)) : ctx.lineTo(xOf(i), yOf(v)));
    ctx.stroke();
    data.forEach((v, i) => {
      ctx.beginPath(); ctx.arc(xOf(i), yOf(v), 4, 0, Math.PI * 2);
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
    });
  };
  drawLine(skillData, '#1976d2');
  drawLine(dropData, '#e53935');

  // legend
  const legendItems = [
    { color: '#1976d2', label: 'Skill Performance' },
    { color: '#e53935', label: 'Interview Drop-Off' },
    { color: 'rgba(76,175,80,0.8)', label: 'Hiring Volume' },
  ];
  let lx = pL;
  legendItems.forEach(({ color, label }) => {
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(lx + 6, H - 18, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#374151'; ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(label, lx + 18, H - 14);
    lx += ctx.measureText(label).width + 46;
  });

  return canvas.toDataURL('image/png');
};

// ─── Build 12-point performance arrays from progressHistory ─────────────────
const buildGraphData = (progressHistory = []) => {
  if (!progressHistory.length) return null;
  // bucket by month (0-11) average
  const byMonth = Array.from({ length: 12 }, () => []);
  progressHistory.forEach(entry => {
    const m = new Date(entry.date).getMonth();
    if (entry.progress != null) byMonth[m].push(entry.progress);
  });
  const avg = (arr) => arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0;
  const skill = byMonth.map(avg);
  // synthetic drop-off & volume from inverse of progress
  const dropOff = skill.map(v => Math.max(0, Math.min(40, Math.round((100 - v) * 0.35))));
  const volume = skill.map(v => Math.max(10, Math.min(100, Math.round(v * 0.9 + 10))));
  return { skill, dropOff, volume };
};

// ─── Main PDF generator ──────────────────────────────────────────────────────
const generateQGeniiStudyPlanPDF = async ({
  userName = 'Student',
  generatedDate,
  goalName,
  category,
  priority,
  status,
  targetDate,
  estimatedHours,
  actualHours,
  tags = [],
  dailyProgress = 0,
  weeklyProgress = 0,
  overallProgress = 0,
  subtasks = [],
  progressHistory = [],
  notes,
  performanceInsights,
  graphsData,
  allPlans = [],
  selectedOptions = {},
  platformName = 'QGenii',
  website = 'https://qgenii.com',
}) => {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const PW = doc.internal.pageSize.getWidth();
  const PH = doc.internal.pageSize.getHeight();
  const M = 40; // horizontal margin
  const footerH = 110; // footer height
  let y = M;

  // ── helpers ──
  const checkY = (need = 40) => { if (y + need > PH - footerH - 10) { doc.addPage(); y = M; } };

  const sectionHeader = (text) => {
    checkY(40);
    doc.setFillColor(12, 49, 110);
    doc.roundedRect(M, y, PW - M * 2, 24, 4, 4, 'F');
    doc.setFontSize(12); doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(text, M + 10, y + 16);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(34, 34, 34);
    y += 30;
  };

  const drawBar = (label, value, r, g, b) => {
    checkY(38);
    const barW = PW - M * 2;
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(60, 60, 60);
    doc.text(label, M, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`${value}%`, PW - M, y, { align: 'right' });
    y += 15;
    doc.setFillColor(220, 220, 220); doc.roundedRect(M, y, barW, 9, 3, 3, 'F');
    doc.setFillColor(r, g, b); doc.roundedRect(M, y, Math.max(9, (value / 100) * barW), 9, 3, 3, 'F');
    y += 22;
  };

  const twoCol = (label, value, x0 = M, colW = (PW - M * 2) / 2) => {
    checkY(20);
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80);
    doc.text(`${label}:`, x0, y + 8);
    doc.setFont('helvetica', 'normal'); doc.setTextColor(20, 20, 20);
    doc.text(String(value || 'N/A'), x0 + 90, y + 8);
    y += 25;
  };

  // ── 1. Header ──────────────────────────────────────────────────────────────
  let logoData = null;
  try { logoData = await toDataURL(logoSrc); } catch (_) { }

  // header background
  doc.setFillColor(12, 49, 110);
  doc.rect(0, 0, PW, 80, 'F');

  // logo
  if (logoData) {
    doc.addImage(logoData, 'JPEG', M, 14, 52, 52);
  } else {
    doc.setFontSize(24); doc.setFont('helvetica', 'bold');
    doc.setTextColor(255, 255, 255); doc.text('Q', M + 16, 52);
  }

  // title
  doc.setFontSize(22); doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Study Plan Report', M + 68, 38);
  doc.setFontSize(10); doc.setFont('helvetica', 'normal');
  doc.setTextColor(180, 210, 255);
  doc.text(`Generated: ${generatedDate || new Date().toLocaleDateString()}  ·  ${platformName}  ·  ${website}`, M + 68, 56);

  y = 98;

  // ── 2. Overview ────────────────────────────────────────────────────────────
  sectionHeader('Overview');

  const half = (PW - M * 2) / 2;
  const rows = [
    ['User', userName],
    ['Goal', goalName || 'N/A'],
  ];
  rows.forEach(([l, v]) => twoCol(l, v));

  // two-column info grid
  const gridRows = [
    ['Category', category], ['Priority', priority],
    ['Status', status?.replace('_', ' ')], ['Target Date', targetDate ? new Date(targetDate).toLocaleDateString() : 'N/A'],
    ['Est. Hours', estimatedHours ? `${estimatedHours} hrs` : 'N/A'], ['Actual Hours', actualHours ? `${actualHours} hrs` : 'N/A'],
    ['Tags', tags?.length ? tags.join(', ') : 'None'],
  ];

  gridRows.forEach(([l, v], i) => {
    if (i % 2 === 0) {
      checkY(18);
      doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80);
      doc.text(`${l}:`, M + 2, y);
      doc.setFont('helvetica', 'normal'); doc.setTextColor(20, 20, 20);
      doc.text(String(v || 'N/A'), M + 90, y);

      // next col if exists
      const next = gridRows[i + 1];
      if (next) {
        doc.setFont('helvetica', 'bold'); doc.setTextColor(80, 80, 80);
        doc.text(`${next[0]}:`, M + half + 2, y);
        doc.setFont('helvetica', 'normal'); doc.setTextColor(20, 20, 20);
        doc.text(String(next[1] || 'N/A'), M + half + 90, y);
      }
      y += 20;
    }
  });
  y += 14;

  // ── 3. Progress ────────────────────────────────────────────────────────────
  if (selectedOptions.dailyProgress !== false) {
    sectionHeader('Progress');
    y += 10;
    drawBar('Daily Progress', dailyProgress, 95, 127, 189);
    drawBar('Weekly Progress', weeklyProgress, 242, 184, 39);
    drawBar('Overall Progress', overallProgress, 39, 174, 96);
    y += 9;
  }

  // ── 4. Performance Trend Chart ─────────────────────────────────────────────
  if (selectedOptions.graphsCharts !== false) {
    sectionHeader('Performance Trends');

    const fromHistory = buildGraphData(progressHistory);
    const gd = graphsData || fromHistory || {
      skill: [40, 50, 55, 80, 90, 85, 75, 80, 85, 80, 90, 85],
      dropOff: [20, 15, 20, 18, 30, 35, 25, 40, 30, 20, 25, 22],
      volume: [45, 55, 65, 85, 100, 20, 40, 75, 50, 70, 95, 85],
    };

    const chartImg = buildChartImage(gd.skill, gd.dropOff, gd.volume);
    const chartH = 128;
    checkY(chartH + 10);
    doc.addImage(chartImg, 'PNG', M, y, PW - M * 2, chartH);
    y += chartH + 17;
  }

  // ── 5. Goals / Subtasks ────────────────────────────────────────────────────
  if (selectedOptions.goalsChecklist !== false) {
    sectionHeader('Goals & Subtasks');
    y += 10;
    if (subtasks && subtasks.length) {
      subtasks.forEach(sub => {
        checkY(16);
        const done = sub.isCompleted;
        doc.setFontSize(11);
        doc.setDrawColor(done ? 39 : 150, done ? 174 : 150, done ? 96 : 150);
        doc.rect(M + 2, y - 9, 8, 8);
        if (done) {
          doc.setTextColor(39, 174, 96);
          doc.text('✓', M + 3, y - 2);
        }
        doc.setFont('helvetica', done ? 'normal' : 'normal');
        doc.setTextColor(done ? 80 : 20, done ? 80 : 20, done ? 80 : 20);
        doc.text(sub.title, M + 16, y);
        if (done) {
          // strikethrough
          const tw = doc.getTextWidth(sub.title);
          doc.setDrawColor(120, 120, 120); doc.setLineWidth(0.5);
          doc.line(M + 16, y - 3, M + 16 + tw, y - 3);
        }
        y += 19;
      });
    } else {
      doc.setFontSize(10); doc.setTextColor(150, 150, 150);
      doc.text('No subtasks defined.', M, y); y += 14;
    }
    y += 9;
  }

  // ── 6. Performance Insights ────────────────────────────────────────────────
  if (selectedOptions.weeklySummary !== false) {
    sectionHeader('Performance Summary');
    y += 10;
    const pi = performanceInsights || {};
    [
      ['Total Plans', allPlans.length || '—'],
      ['Completed Plans', allPlans.filter(p => p.status === 'COMPLETED').length || '—'],
      ['In Progress', allPlans.filter(p => p.status === 'IN_PROGRESS').length || '—'],
      ['Overdue', allPlans.filter(p => p.status === 'OVERDUE').length || '—'],
      ['Accuracy', pi.accuracy || 'N/A'],
      ['Skill Growth', pi.skillGrowth || 'N/A'],
    ].forEach(([l, v]) => twoCol(l, v));
    y += 9;
  }

  // ── 7. All Study Plans Table ───────────────────────────────────────────────
  if (selectedOptions.studyPlansList !== false && allPlans.length > 0) {
    sectionHeader('All Study Plans');
    y += 10;
    const cols = [180, 80, 70, 70, 80, 50]; // widths
    const headers = ['Title', 'Category', 'Priority', 'Status', 'Target Date', 'Progress'];
    checkY(26);

    // table header
    doc.setFillColor(229, 234, 245);
    doc.rect(M, y, PW - M * 2, 20, 'F');
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(12, 49, 110);
    let cx = M + 4;
    headers.forEach((h, i) => { doc.text(h, cx, y + 13); cx += cols[i]; });
    y += 22;

    allPlans.slice(0, 25).forEach((plan, idx) => {
      checkY(18);
      if (idx % 2 === 0) {
        doc.setFillColor(248, 250, 255); doc.rect(M, y - 12, PW - M * 2, 18, 'F');
      }
      doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.setTextColor(30, 30, 30);
      cx = M + 4;
      const cells = [
        plan.title?.substring(0, 26) || '—',
        plan.category || '—',
        plan.priority || '—',
        (plan.status || '—').replace('_', ' '),
        plan.targetDate ? new Date(plan.targetDate).toLocaleDateString() : '—',
        `${plan.progress ?? 0}%`,
      ];
      cells.forEach((cell, i) => { doc.text(cell, cx, y); cx += cols[i]; });
      y += 20;
    });
    y += 9;
  }

  // ── 8. Notes ──────────────────────────────────────────────────────────────
  if (selectedOptions.notes !== false && notes) {
    sectionHeader('Notes');
    y += 10;
    doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(50, 50, 50);
    const lines = doc.splitTextToSize(String(notes), PW - M * 2 - 10);
    lines.forEach(line => { checkY(13); doc.text(line, M + 4, y); y += 14; });
    y += 9;
  }

  // ── Footer on every page ──────────────────────────────────────────────────
  const total = doc.internal.getNumberOfPages();
  for (let pg = 1; pg <= total; pg++) {
    doc.setPage(pg);

    // Footer Background
    doc.setFillColor(12, 49, 110);
    doc.rect(0, PH - footerH, PW, footerH, 'F');

    // Top Row: Company Name & Tagline
    doc.setFontSize(11); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
    doc.text('QGenii LLP', PW / 2, PH - footerH + 20, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal'); doc.setTextColor(180, 210, 255);
    doc.text('Free Learning. Verified Skills. Real Careers.', PW / 2, PH - footerH + 34, { align: 'center' });

    // Middle Row: Official Address
    doc.setFontSize(8); doc.setTextColor(220, 230, 245);
    const address = 'Room No. 1, Nandkishor Yadav Residence, Shivrajpur, Barahiya Tola, Sadipur Panchayat, Near Kali Mandir, PO: Mustafabad, PS: Goriya Kothi, Siwan, Bihar – 841439';
    const addressLines = doc.splitTextToSize(address, PW - M * 2);
    let fy = PH - footerH + 52;
    addressLines.forEach(line => {
      doc.text(line, PW / 2, fy, { align: 'center' });
      fy += 12;
    });

    // Bottom Row: Emails & LLPIN
    fy += 4;
    doc.setFontSize(8); doc.setTextColor(180, 210, 255);
    doc.text('support@qgenii.com | business@qgenii.com | people@qgenii.com', PW / 2, fy, { align: 'center' });
    fy += 14;
    doc.setFont('helvetica', 'bold');
    doc.text('LLPIN: ACV-7311', PW / 2, fy, { align: 'center' });

    // Page Number (bottom right)
    doc.setFont('helvetica', 'normal'); doc.setTextColor(150, 180, 230);
    doc.text(`Page ${pg} of ${total}`, PW - M, PH - 14, { align: 'right' });
  }

  doc.save('QGenii_Study_Plan.pdf');
};

export default generateQGeniiStudyPlanPDF;
