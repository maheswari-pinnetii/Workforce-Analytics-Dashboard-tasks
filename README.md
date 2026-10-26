# 🏢 Workforce Analytics Platform — Enterprise Dashboard UI/UX

An enterprise-grade, human-crafted **Workforce Analytics Platform Dashboard** built from scratch using **React 18 + TypeScript + Vite**, **Material UI (MUI)**, and **Recharts**.

---

## 🎯 Engineering Standards & Project Guidelines

This project adheres to the mandated core engineering instructions:

- **Independent Implementation from Scratch:** UI, components, layout, state hooks, and analytical algorithms were built independently without pre-packaged UI kits or templates.
- **Realistic Mock Data Architecture:** Uses strongly typed domain mock data (`mockWorkforceData.ts`) representing workforce telemetry across six technology hubs: Bengaluru, Chennai, Salem, Kochi, Hyderabad, and Vizag.
- **Clean React & TypeScript Practices:** Strict TypeScript compilation, pure analytical utilities, custom hooks for filter separation (`useDashboardFilters`), and no `any` anti-patterns.
- **Professional Enterprise-Grade UI/UX:** Emerald design tokens, refined typography (Google Fonts API), accessible contrast, and micro-interactions.
- **Original Implementation:** No copying of another team member's code or external dashboard repositories.
- **Branch & Isolation Protocol:** Developed and verified in isolation on the `task1` branch.
- **Integrity of Shared Project Files:** No shared repository files were altered without explicit approval, and no unauthorized files or Git commits were pushed.

---

## 📋 1. Project Overview & Architecture

The application uses domain-specific modules and a structured React architecture.

```text
src/
├── App.tsx
├── theme/
│   └── theme.ts
├── types/
│   └── workforce.ts
├── data/
│   └── mockWorkforceData.ts
├── utils/
│   └── workforceAnalytics.ts
├── hooks/
│   └── useDashboardFilters.ts
├── components/
│   ├── layout/
│   │   ├── AppSidebar.tsx
│   │   ├── TopNavigation.tsx
│   │   └── DashboardLayout.tsx
│   ├── dashboard/
│   │   ├── DashboardHeader.tsx
│   │   ├── DashboardFilters.tsx
│   │   ├── KpiGrid.tsx
│   │   ├── AttendanceTrendChart.tsx
│   │   ├── DepartmentDistributionChart.tsx
│   │   ├── WorkforceCompositionChart.tsx
│   │   └── RecentActivity.tsx
│   └── common/
│       ├── MetricIcons.tsx
│       └── StateComponents.tsx
└── test/
    ├── runTests.ts
    └── workforceAnalytics.test.ts
```

## 🎨 2. Theme & Design System

The application includes a custom Emerald Green Enterprise Theme with light and dark modes.

| Element | Light Theme | Dark Theme |
|---|---|---|
| Primary Accent | `#047857` | `#34D399` |
| Accent Background | `#ECFDF5` | `#064E3B` |
| Page Background | `#F8FAFC` | `#0F172A` |
| Card Surface | `#FFFFFF` | `#1E293B` |
| Main Text | `#0F172A` | `#F8FAFC` |
| Secondary Text | `#64748B` | `#CBD5E1` |
| Border / Divider | `#E2E8F0` | `#334155` |

- **Theme Switching:** Instant light/dark mode switching with `localStorage` persistence and system theme fallback.
- **Typography:** Plus Jakarta Sans and Inter through the Google Fonts CDN.

---

## 📊 3. Implemented Features

### A. Navigation & Application Shell

- Collapsible sidebar with Overview, Employees, Attendance, Departments, Locations, Recruitment, Reports, and Settings.
- Responsive top navigation with breadcrumb navigation, search, notification alerts, user avatar initials (`MP`), and theme toggle.
- Dashboard heading with analytics icon, title, subtitle, timestamp, refresh control, and report export action.
- Interactive filter toolbar with department, location, and status dropdowns, active filter count, and Reset button.

### B. Five KPI Cards

The dashboard displays exactly five KPI cards derived from typed workforce data.

1. **Total Employees:** 1,502 — 4.2% month-over-month increase.
2. **Present Today:** 1,439 — 1.8% increase versus yesterday.
3. **Attendance Rate:** 95.8% — 0.5% above target.
4. **Employees on Leave:** 43 — 2.1% decrease versus last week.
5. **Open Positions:** 42 — 8 urgent hires.

### C. Data Visualizations

- **Attendance Trend:** Responsive Recharts line chart showing attendance percentages over 7 or 14 days, with axes, tooltips, and grid lines.
- **Department Distribution:** Horizontal bar chart comparing headcount with quarterly targets across Engineering, Sales, Operations, Customer Support, Finance, and HR.
- **Workforce Composition:** Solid pie chart with interactive sector expansion, percentage tooltips, status legend, and loading skeleton.

### D. Recent Activity Feed

Displays workforce events such as employee onboarding, attendance check-ins, medical leave applications, and role promotions, with timestamps and status indicators.

### E. Interactive Dashboard Filters

- **Date Range:** 7 Days, 14 Days, 30 Days, and Quarter.
- **Department:** Single-select dropdown that updates charts and KPIs.
- **Location:** Bengaluru, Chennai, Salem, Kochi, Hyderabad, and Vizag.
- **Status:** Active, On Leave, Absent, and Terminated.
- **Reset:** Restores the default filter configuration.

### F. Loading, Empty, and Error States

- **Loading State:** Animated skeleton layouts for KPI cards, charts, and activity feeds.
- **Empty State:** Informative illustration and Reset Filters action when no records match.
- **Error State:** User-friendly error notification with a Retry Connection action.

---

## 🚀 4. Setup & Running Instructions

### Prerequisites

- Node.js v18 or later; v24 is also suitable.
- npm or Yarn.

### Installation

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open `http://localhost:5173/` in your browser.

### Production Build and Type Checking

```bash
npm run build
```

### Run Automated Tests

```bash
npm test
```

Alternatively, if supported by the project configuration:

```bash
node --experimental-strip-types src/test/runTests.ts
```

---

## 🧪 5. Testing Results

The reported automated test run covers the following checks:

| Test Area | Validation |
|---|---|
| Workforce Metrics | Total employees, present count, attendance rate, employees on leave, and open positions |
| Department Filtering | Engineering records and department filter correctness |
| Location Filtering | Bengaluru filter correctness |
| Status Filtering | Active, On Leave, Absent, and Terminated |
| Search | Matching employee roles and handling nonexistent searches |
| Empty State | Zero matching records produce zero metrics |
| Department Distribution | Sorted by descending headcount |
| Workforce Composition | Active category verification |
| Attendance Trends | Seven-day and fourteen-day data-point counts |

**Reported result:** All 9/9 test groups passed, covering the individual assertions listed above. The actual test output should be retained as evidence when presenting these results for review.

---

## 📱 6. Responsive Viewport Verification

| Viewport | Expected Layout |
|---|---|
| Desktop — 1440 × 900 / 1280 × 800 | Persistent sidebar, five KPI cards in one row, dual-chart layout, no horizontal overflow |
| Tablet — 768 × 1024 | Collapsible sidebar, two- to three-column KPI grid, responsive charts |
| Mobile — 390 × 844 / 360 × 800 | Slide-out navigation, single-column KPI cards, vertically stacked charts, scrollable filters |

---

## 📚 7. Design References & Architecture Alignment

1. **SimpleKPI:** KPI hierarchy, prominent metrics, and clear comparisons — https://www.simplekpi.com/kpi-dashboard-examples
2. **Mobbin:** Dashboard layout and information hierarchy — https://mobbin.com/
3. **Charts Supply:** Chart layout, data density, and contextual tooltips — https://charts.supply/
4. **Dark Design:** Dark-mode surface contrast and visual hierarchy — https://dark.design/
5. **Material UI:** Theme provider, responsive layout, and accessibility — https://mui.com/material-ui/
6. **Recharts:** React-based data visualization — https://recharts.org/

---

## Final Implementation Summary

The Workforce Analytics Platform is designed as a responsive enterprise dashboard with a structured React and TypeScript architecture, five workforce KPI cards, interactive filters, attendance and department charts, workforce composition, recent activity, and light/dark themes.

The implementation emphasizes independent development, reusable components, typed mock data, responsive behavior, and maintainable analytical utilities.

**Development status:** The features and test results described above reflect the reported implementation. Final verification should be based on the actual source code, build output, and automated test execution.
