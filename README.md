# Workforce Pulse — Frontend

React + Vite dashboard for the Workforce Pulse analytics tool. Fetches from the Django REST
backend, renders headline metrics, breakdowns, automation rankings, week-over-week trends,
anomaly callouts, per-employee drill-downs, cross-filters, PDF export, and a floating AI chat
assistant.

## Tech Stack

- React 18 + Vite 5
- Tailwind CSS 3 (custom "calm classic" editorial theme — forest green / amber gold / cream)
- Recharts (bar & line charts)
- Framer Motion (entrance/expand animations, chat panel transitions)
- lucide-react (icon set)
- Axios
- Deployed on **Vercel**

---

## 1. Local Setup

```bash
git clone <this-repo-url>
cd frontend

npm install
```

Create `.env` in the `frontend/` root:
```
VITE_API_BASE=http://localhost:8000/api/v1
```
(Point this at your deployed Render backend URL once that's live — see section 4.)

```bash
npm run dev
```
Open `http://localhost:5173`.

---

## 2. Project Structure

```
frontend/
├── src/
│   ├── main.jsx
│   ├── App.jsx                    # top-level state, filter wiring, layout
│   ├── api.js                     # axios instance, reads VITE_API_BASE
│   └── components/
│       ├── Header.jsx
│       ├── HeadlineMetrics.jsx    # hours/rupees recoverable + methodology drawer
│       ├── DataQualityPanel.jsx   # ingestion audit (dropped/fixed/flagged/orphaned)
│       ├── DepartmentFilter.jsx   # cross-filter #1
│       ├── BreakdownChart.jsx     # dept/task/app switchable bar chart, cross-filter #2
│       ├── AutomationRanking.jsx
│       ├── TrendChart.jsx
│       ├── AnomalyCallout.jsx
│       ├── EmployeeList.jsx
│       ├── EmployeeDrilldown.jsx  # modal, opens on employee row click
│       ├── ExportButton.jsx       # opens live-filtered PDF export
│       └── ChatFAB.jsx            # floating AI chat, bottom-right
├── index.css
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── index.html
```

---

## 3. Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `VITE_API_BASE` | Yes | Backend API root, e.g. `https://your-app.onrender.com/api/v1` |

Vite only exposes env vars prefixed `VITE_` to the client — this is intentional and required.

---

## 4. Deploying to Vercel

1. Push this frontend folder to its own GitHub repo.
2. On [vercel.com](https://vercel.com), **Add New → Project**, import the repo.
3. Framework preset: **Vite** (should auto-detect).
4. Build settings (usually auto-filled, confirm they match):
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add the environment variable under **Settings → Environment Variables**:
   ```
   VITE_API_BASE = https://your-backend.onrender.com/api/v1
   ```
6. Deploy. Vercel auto-redeploys on every push to the connected branch.
7. Once live, confirm the deployed frontend can actually reach the backend — open the live URL,
   open browser dev tools → Network tab, and check API calls return 200 (not CORS errors). If
   you see CORS errors, go back to the backend's `CORS_ALLOWED_ORIGINS` env var on Render and add
   this exact Vercel URL, then redeploy the backend.

### Common gotcha
If you update `VITE_API_BASE` in Vercel's dashboard after the first deploy, you must trigger a
**new deployment** (redeploy, not just save) — Vite bakes env vars into the build at build time,
so changing the env var alone doesn't retroactively update an already-built bundle.

---

## 5. Testing Checklist Before Sharing the Live URL

- [ ] Open in an actual incognito window, not just a normal tab (catches cached-state bugs)
- [ ] Test on an actual phone browser, not just DevTools device emulation
- [ ] Click every department filter — chart, ranking, and employee list should all update
- [ ] Click a bar in the task-category chart — employee list should filter accordingly
- [ ] Click an employee row — drill-down modal should open with real data
- [ ] Open the chat FAB (bottom-right), ask a question, confirm loading state then a real answer
- [ ] Ask a follow-up in the same session — confirm it stays coherent with the prior turn
- [ ] Click Export PDF with a filter active, then again with a different filter — confirm the
      downloaded file's numbers actually change between the two
- [ ] Check browser console for red errors on every page interaction — zero is the bar
- [ ] Confirm the Data Quality panel expands and shows real ingestion counts, not zeros

---

## 6. Design System Quick Reference

| Token | Hex | Usage |
|---|---|---|
| `cream-bg` | `#faf7f2` | Page background |
| `primary` | `#183829` | Primary text on dark, buttons, hours metric |
| `primary-container` | `#2f4f3f` | Header band, hover states |
| `amber-gold` | `#c9a15a` | Rupee/money metric, highlights |
| `rust-400` | `#a85a35` | Anomalies, warnings, dropped/flagged stats |
| Font (display) | Playfair Display | Headings, big numbers |
| Font (body) | Inter | Body text, labels, table content |

Full palette lives in `tailwind.config.js` under `theme.extend.colors`.
