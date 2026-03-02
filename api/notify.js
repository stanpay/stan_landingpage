/**
 * 임시 출시 알림 수집 엔드포인트
 * POST /api/notify
 * body: { email?: string, source?: string }
 */
module.exports = function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const { email, source = 'landing' } = body;

  // 임시: 실제 저장 없이 로그만 (배포 환경에서는 콘솔에 찍힘)
  console.log('[notify]', { email, source });

  return res.status(200).json({
    ok: true,
    message: '등록되었습니다.',
  });
};
