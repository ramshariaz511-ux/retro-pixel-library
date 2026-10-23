module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const isConfigured = !!(
    process.env.GEMINI_API_KEY &&
    process.env.GEMINI_API_KEY.trim() !== '' &&
    process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  );
  const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

  res.status(200).json({
    status: 'online',
    service: 'retrozen-pixel-library',
    platform: 'vercel-serverless',
    geminiConfigured: isConfigured,
    model: model
  });
};
