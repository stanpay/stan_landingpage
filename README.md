# Stan 랜딩페이지

stan.ai.kr 경로별(퍼널별) 동일 랜딩 페이지. 본문은 Notion iframe, 하단 고정 CTA(카카오톡 친구추가), 퍼널별 GA4 분리 추적.

## 설정 (js/config.js)

배포 전 `js/config.js`에서 다음 값을 반드시 수정하세요.

| 변수 | 설명 |
|------|------|
| `NOTION_PAGE_URL` | 발행된 Notion 페이지 URL. Notion에서 페이지 → Share → Publish to web → Copy link |
| `KAKAO_FRIEND_URL` | 카카오톡 친구추가 링크. [카카오 비즈니스 채널](https://business.kakao.com/)에서 채널 생성 후 "친구추가 링크" 복사 |
| `FUNNEL_TO_GA_ID` | 퍼널(경로)별 GA4 Measurement ID. 키는 URL 첫 경로 세그먼트 (예: `stan.ai.kr/insta` → `insta`) |

- GA4 ID 발급: [Google Analytics](https://analytics.google.com/) → Admin → Data Streams → 웹 스트림 추가 → Measurement ID (G-XXXXX 형식)
- 퍼널 추가 시 `FUNNEL_TO_GA_ID`에 새 키와 ID만 추가하면 됨 (예: `tiktok: 'G-ZZZ'`).

## 로컬 확인

정적 파일이므로 로컬 서버로 열면 됩니다.

```bash
# Python
python3 -m http.server 8000

# Node (npx)
npx serve .
```

브라우저에서 `http://localhost:8000/insta`, `http://localhost:8000/everytime` 등으로 접속해 경로별 동작을 확인할 수 있습니다. (로컬에서는 SPA 리라이트가 없어 `/insta`가 404일 수 있음. 루트 `/`로 열고 GA 퍼널 분리는 배포 환경에서 확인.)

## 배포 (stan.ai.kr)

1. 이 저장소를 Netlify 또는 Vercel에 연결하고 도메인을 stan.ai.kr로 설정합니다.
2. **SPA 리라이트**가 적용되어 있어야 합니다. 그래야 `stan.ai.kr/insta`, `stan.ai.kr/everytime` 접속 시에도 같은 `index.html`이 서빙되고, URL이 유지되어 퍼널별 GA가 동작합니다.
   - **Netlify**: 프로젝트 루트의 `_redirects` 파일이 자동 적용됩니다 (`/* /index.html 200`).
   - **Vercel**: `vercel.json`의 `rewrites`가 자동 적용됩니다.

## React 랜딩 (신규) — `/app`

- **경로**: 배포 시 `https://<도메인>/app` 에서 확인.
- **로컬 개발**: `npm run dev:react` 후 `http://localhost:5173/app` (또는 루트 `/`).
- **빌드**: 루트에서 `npm run build` → `app/` 폴더 생성. Vercel 배포 시 Build Command를 `npm run build`로 두면 배포 시 자동 빌드됨.

### 임시 API (Vercel Serverless)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/health` | 헬스체크 (ok, service, timestamp) |
| POST | `/api/notify` | 출시 알림 수집 (body: `{ email?, source? }`) — 임시로 저장 없이 200만 반환 |

## 구조

```
├── index.html      # 기존 단일 랜딩 페이지
├── css/style.css
├── js/
│   ├── config.js
│   └── main.js
├── landing-react/  # React 랜딩 (Vite)
│   ├── src/
│   └── package.json
├── api/            # 임시 서버리스 API (Vercel)
│   ├── health.js
│   └── notify.js
├── app/            # React 빌드 결과 (npm run build 시 생성, .gitignore)
├── _redirects
├── vercel.json
├── package.json    # 루트 빌드 스크립트
└── README.md
```
