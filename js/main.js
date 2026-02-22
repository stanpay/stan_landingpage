(function () {
  'use strict';

  var pathname = window.location.pathname;
  var segment = pathname.split('/').filter(Boolean)[0] || 'default';

  // Notion iframe
  var frame = document.getElementById('notion-frame');
  if (frame && typeof NOTION_PAGE_URL !== 'undefined') {
    frame.src = NOTION_PAGE_URL;
  }

  // CTA 링크
  var ctaLink = document.getElementById('cta-link');
  if (ctaLink && typeof KAKAO_FRIEND_URL !== 'undefined') {
    ctaLink.href = KAKAO_FRIEND_URL;
  }

  // 퍼널별 GA4
  var gaId = typeof FUNNEL_TO_GA_ID !== 'undefined' && FUNNEL_TO_GA_ID[segment];
  if (!gaId && typeof FUNNEL_TO_GA_ID !== 'undefined') {
    gaId = FUNNEL_TO_GA_ID.default;
  }
  if (gaId) {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
    document.head.appendChild(gtagScript);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', gaId);
  }
})();
