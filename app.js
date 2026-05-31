async function analisarAnuncio() {

    const entrada = document.getElementById("itemId").value;
    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "Analisando...";

    let itemId = entrada;

    // Extrair ID caso seja URL
    const match = entrada.match(/ML[A-Z0-9]+/);

    if (match) {
        itemId = match[0];
    }

    try {

        const response = await fetch(
            `https://api.mercadolibre.com/items/${itemId}`
        );

        const data = await response.json();

        resultado.innerHTML = `
            <h2>${data.title}</h2>

            <p><strong>Preço:</strong>
            R$ ${data.price}</p>

            <p><strong>Categoria:</strong>
            ${data.category_id}</p>

            <p><strong>Vendidos:</strong>
            ${data.sold_quantity}</p>

            <img
            src="${data.thumbnail}"
            width="250">
        `;

    } catch (erro) {

        resultado.innerHTML =
        "Erro ao consultar anúncio.";

        console.log(erro);
    }
}
