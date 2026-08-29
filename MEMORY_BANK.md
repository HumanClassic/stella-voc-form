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
- [BUGFIX/SECURITY] 2026-08-29: Next.js 14/15 환경에서 `layout.tsx` 렌더링 중 `cookies().set()` 호출 시 발생하는 500 SSR 충돌(ERROR 681741238) 결함을 해결하기 위해 CSRF 토큰 발급 로직을 전면 철거함. 본 설문 양식은 비회원(익명) 퍼블릭 폼이므로 CSRF 방어가 구조적으로 불필요하며, Origin 검증(`validateOrigin`) 및 Rate Limiting(`checkRateLimit`) 방어벽만으로 외부 공격을 100% 차단함.
- [ARCHITECTURE/UX] 2026-08-29: 인터넷 신문사 사이트(부모 창)와의 Seamless Iframe 통합을 위해 `ResizeObserver` 및 UTM 수집 아키텍처를 주입함. 1) 문서 높이 변화 감지 시 `postMessage`로 부모에게 즉시 통보. 2) URL 파라미터를 추출하여 `actions.ts` 서버 액션을 통해 구글 시트(GAS Payload)에 동적으로 마케팅 UTM 파라미터가 적재되도록 설계 개선 완료.

## Next Steps
- [ ] Push to GitHub/Vercel for final deployment.
- [ ] Monitor real user data in Google Sheets.
