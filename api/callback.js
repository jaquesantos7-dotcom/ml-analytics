export default async function handler(req, res) {

    const code = req.query.code;

    if (!code) {
        return res.status(400).json({
            erro: "Código OAuth não recebido"
        });
    }

    try {

        const response = await fetch(
            "https://api.mercadolibre.com/oauth/token",
            {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "content-type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams({
                    grant_type: "authorization_code",
                    client_id: process.env.ML_CLIENT_ID,
                    client_secret: process.env.ML_CLIENT_SECRET,
                    code: code,
                    redirect_uri: process.env.ML_REDIRECT_URI
                })
            }
        );

        const data = await response.json();

        return res.status(200).json(data);

    } catch (erro) {

        return res.status(500).json({
            erro: erro.message
        });

    }

}
