export default async function handler(req, res) {

    const accessToken = req.query.token;

    if (!accessToken) {
        return res.status(400).json({
            erro: "Informe o token"
        });
    }

    try {

        const response = await fetch(
            "https://api.mercadolibre.com/users/me",
            {
                headers: {
                    Authorization:
                    `Bearer ${accessToken}`
                }
            }
        );

        const data = await response.json();

        res.json(data);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}
