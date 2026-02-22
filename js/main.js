(function () {
  'use strict';

  // 퍼널 = 유입 경로. UTM utm_source 로 구분 (예: ?utm_source=insta, ?utm_source=everytime)
  var params = new URLSearchParams(window.location.search);
  var funnel = params.get('utm_source') || 'direct';

  // Notion iframe
  var frame = document.getElementById('notion-frame');
  if (frame && typeof NOTION_PAGE_URL !== 'undefined') {
    frame.src = NOTION_PAGE_URL;
  }

  // 카카오 CTA 링크
  var ctaLink = document.getElementById('cta-link');
  if (ctaLink && typeof KAKAO_FRIEND_URL !== 'undefined') {
    ctaLink.href = KAKAO_FRIEND_URL;
  }

  // 인스타 링크
  var instagramLink = document.getElementById('instagram-link');
  if (instagramLink && typeof INSTAGRAM_URL !== 'undefined') {
    instagramLink.href = INSTAGRAM_URL;
  }

  // 단일 GA4 로드 + 퍼널 전송 (퍼널별 유입 분석 가능)
  var gaId = typeof GA_MEASUREMENT_ID !== 'undefined' ? GA_MEASUREMENT_ID : null;
  if (gaId) {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId, { funnel: funnel });

    // 카카오 버튼 클릭: 퍼널별 카카오 클릭 분석
    if (ctaLink) {
      ctaLink.addEventListener('click', function () {
        gtag('event', 'click_cta', { cta_type: 'kakao', funnel: funnel });
      });
    }

    // 인스타 버튼 클릭: 퍼널별 인스타 클릭 분석
    if (instagramLink) {
      instagramLink.addEventListener('click', function () {
        gtag('event', 'click_cta', { cta_type: 'instagram', funnel: funnel });
      });
    }
  }
})();
