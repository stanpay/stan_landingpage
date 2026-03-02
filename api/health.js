/**
 * 임시 헬스체크 엔드포인트
 * GET /api/health
 */
module.exports = function handler(req, res) {
  res.status(200).json({
    ok: true,
    service: 'stan-landing',
    timestamp: new Date().toISOString(),
  });
};
