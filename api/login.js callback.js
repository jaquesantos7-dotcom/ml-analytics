export default function handler(req, res) {

    const clientId = process.env.ML_CLIENT_ID;

    const redirectUri =
        "https://ml-analytics-amber.vercel.app/api/callback";

    const url =
        `https://auth.mercadolivre.com.br/authorization` +
        `?response_type=code` +
        `&client_id=${clientId}` +
        `&redirect_uri=${redirectUri}`;

    res.redirect(url);
}
export default async function handler(req, res) {

    const code = req.query.code;

    res.send(`
        <html>
        <body style="font-family:Arial;padding:40px;">
            <h1>Login realizado com sucesso</h1>
            <p>Código recebido:</p>
            <textarea style="width:100%;height:120px;">
${code}
            </textarea>
        </body>
        </html>
    `);
}
