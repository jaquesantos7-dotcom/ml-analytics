export default async function handler(req, res) {

    const token = req.query.token;

    try {

        const userResponse = await fetch(
            "https://api.mercadolibre.com/users/me",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const user = await userResponse.json();

        const itemsResponse = await fetch(
            `https://api.mercadolibre.com/users/${user.id}/items/search`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const items = await itemsResponse.json();

        res.status(200).json(items);

    } catch (erro) {

        res.status(500).json({
            erro: erro.message
        });

    }

}
