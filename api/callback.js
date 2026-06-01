export default function handler(req, res) {
  res.json({
    clientId: process.env.ML_CLIENT_ID || null,
    secretExists: !!process.env.ML_CLIENT_SECRET,
    redirectUri: process.env.ML_REDIRECT_URI || null
  });
}
