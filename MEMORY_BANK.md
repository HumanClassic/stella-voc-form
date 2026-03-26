# Memory Bank - VOC Form Project

## Project Overview
A high-performance, premium VOC survey application for **Stella Ssaem's Lecture Review**.

## Tech Stack
- **Frontend**: Next.js 16.2.1 (App Router)
- **Deployment**: Vercel (Automatic from GitHub `main` branch)
- **Backend Architecture**: Next.js Server Actions (Bypasses CORS, handles redirects, provides deterministic feedback)
- **Data Store**: Google Sheets (via GAS Webhook)

## Branding Asset (Master)
- **File**: `public/logo.png`
- **Origin**: Original User-Provided.
- **Decision**: Fixed path `/logo.png` in `page.tsx` for easy asset swapping.

## Architectural Decisions
- **Data Decoupling**: Survey questions, options, and GAS URL are centralized in `src/constants/survey.ts`.
- **Server-Side Proxy**: Implemented `src/app/actions.ts` to handle GAS POST requests. This ensures we can detect submission failures and removes the need for `mode: 'no-cors'`.
- **Error Handling**: Added visible error states in the UI for failed submissions.

## Current State
- `src/app/page.tsx` uses Server Actions for submission.
- Survey content managed via `src/constants/survey.ts`.
- Build verification successful (`npm build` passed).

## Next Steps
- [ ] Push to GitHub/Vercel for final deployment.
- [ ] Monitor real user data in Google Sheets.
