/**
 * 랜딩페이지 설정
 * - Notion URL, 카카오/인스타 링크, 단일 GA4 Measurement ID (퍼널은 이벤트 파라미터로 전송)
 */

// 발행된 Notion 페이지 URL (iframe src)
const NOTION_PAGE_URL = 'https://boiling-reason-ced.notion.site/ebd//30ef7f6d92c28020b15be7e4efd10f31';

// 카카오톡 친구추가 링크
const KAKAO_FRIEND_URL = 'http://pf.kakao.com/_cxhRzX';

// 인스타그램 프로필 링크
const INSTAGRAM_URL = 'https://www.instagram.com/stan_assistant';

// GA4 Measurement ID (단일). 퍼널 = 유입경로, 이벤트 파라미터 funnel 로 전송
// 채널별 링크 예: stan.ai.kr?utm_source=insta, stan.ai.kr?utm_source=everytime
const GA_MEASUREMENT_ID = 'G-261JYCYCKD';
