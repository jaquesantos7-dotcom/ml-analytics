export default async function handler(req, res) {

    const code = req.query.code;

    if (!code) {
        return res.status(400).send("Código não recebido.");
    }

    try {

        const response = await fetch(
            "https://api.mercadolibre.com/oauth/token",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.ML_CLIENT_ID,
                    client_secret: process.env.ML_CLIENT_SECRET,
                    code: code,
                    redirect_uri:
                    "https://ml-analytics-amber.vercel.app/api/callback"
                })
            }
        );

        const data = await response.json();

        res.send(`
            <html>
            <body style="font-family:Arial;padding:40px">
                <h1>Token Obtido com Sucesso</h1>

                <pre>
${JSON.stringify(data, null, 2)}
                </pre>
            </body>
            </html>
        `);

    } catch (erro) {

        console.error(erro);

        res.status(500).send(
            "Erro ao obter token."
        );
    }
}
