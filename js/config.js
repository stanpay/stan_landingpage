/**
 * 랜딩페이지 설정
 * - Notion URL, 카카오 친구추가 링크, 퍼널별 GA4 Measurement ID
 */

// 발행된 Notion 페이지 URL (iframe src)
const NOTION_PAGE_URL = 'https://boiling-reason-ced.notion.site/ebd//30ef7f6d92c28020b15be7e4efd10f31';

// 카카오톡 친구추가 링크 (카카오 비즈니스 채널에서 발급)
const KAKAO_FRIEND_URL = 'http://pf.kakao.com/_cxhRzX';

// 인스타그램 프로필 링크
const INSTAGRAM_URL = 'https://www.instagram.com/stan_assistant';

// 퍼널(첫 번째 경로 세그먼트) → GA4 Measurement ID
// stan.ai.kr/insta → "insta", stan.ai.kr/everytime → "everytime"
const FUNNEL_TO_GA_ID = {
  insta: 'G-XXXXXXXXXX',
  everytime: 'G-YYYYYYYYYY',
  default: null  // 로컬/미설정 시 GA 미로드. 개발용 ID 넣으면 로컬에서도 추적
};
