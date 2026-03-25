# Memory Bank - VOC Form Project

## Project Overview
A high-performance, premium VOC (Voice of Customer) survey application built for **Stella Ssaem's Lecture Review**. The goal is to collect strategic feedback from students and map it to a Google Sheets backend.

## Tech Stack
- **Frontend**: Next.js 16.2.1 (App Router), React 19.2.4
- **Styling**: Tailwind CSS 4 (Beta/Recent), Vanilla CSS
- **Deployment**: Vercel
- **Backend**: Google Apps Script (GAS) Webhook
- **Data Format**: JSON sent via `text/plain` to bypass CORS preflight (`no-cors` mode)

## Architecture Decisions
- **Custom Form vs. Google Forms**: Chosen for premium UI/UX, brand consistency, and advanced logic handling.
- **Brand Identity**: Integrated Final Refined Logo (`logo_vibrant_amber.png`).
  - [x] **Based on User Modification**: Strictly preserved the manual layout provided by the user in `logo.png`.
  - [x] **Technical Finish**: Applied Cyber Yellow (#FFD300) and removed all outer margins (Absolute Transparency) for a clean digital look.
- **Google Sheets Integration**: Utilizes GAS as a serverless backend to store responses directly in a spreadsheet.
- **UI Design**: Uses a clean, modern aesthetic with indigo-based color palette, 3D-like buttons, and smooth transitions.

## Current State
- `src/app/page.tsx` uses the refined `logo_vibrant_amber.png`.
- Project assets are optimized for Vercel deployment.

## Implementation Details
- **Submission**: `fetch` with `mode: 'no-cors'`.
- **Branding**: Assets stored in `/public`.

## Next Steps
- [ ] Monitor Vercel deployment for any loading issues.
- [ ] Finalize unit testing for multi-select logic.
