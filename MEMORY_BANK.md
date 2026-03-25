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
- **Brand Identity**: Integrated a centered company logo ("EASY ENGLISH") using `next/image` with hover micro-animations.
- **Google Sheets Integration**: Utilizes GAS as a serverless backend to store responses directly in a spreadsheet.
- **Client-Side Validation**: React state-managed form with interactive feedback.
- **UI Design**: Uses a clean, modern aesthetic with indigo-based color palette, 3D-like buttons, and smooth transitions.

## Current State
- `src/app/page.tsx` contains the main form logic and UI.
- `src/app/layout.tsx` handles fonts and metadata.
- `src/app/globals.css` uses Tailwind 4 imports.
- Submission logic points to a specific GAS executable URL.

## Implementation Details
- **Submission**: `fetch` with `mode: 'no-cors'` and `headers: { 'Content-Type': 'text/plain' }`.
- **Form Data**: Includes skill improvement scores, learning limitations (multi-select), 서술형 (descriptive) answers, and demographic data.

## Next Steps
- [ ] Implement advanced analytics if needed.
- [ ] Add server-side verification if `no-cors` visibility is an issue.
- [ ] Finalize deployment and test with real data.
