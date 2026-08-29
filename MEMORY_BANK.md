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
- Survey content managed via `src/constants/survey.ts` (Examples updated with Stella-specific terminology).
- Build verification successful (`npm build` passed).
- [ARCHITECTURE/UX] 2026-08-29: 인터넷 신문사 사이트(부모 창)와의 Seamless Iframe 통합을 위해 `ResizeObserver` 및 UTM 수집 아키텍처를 주입함. 1) 문서 높이 변화 감지 시 `postMessage`로 부모에게 즉시 통보. 2) URL 파라미터를 추출하여 `actions.ts` 서버 액션을 통해 구글 시트(GAS Payload)에 동적으로 마케팅 UTM 파라미터가 적재되도록 설계 개선 완료.

## Next Steps
- [ ] Push to GitHub/Vercel for final deployment.
- [ ] Monitor real user data in Google Sheets.
