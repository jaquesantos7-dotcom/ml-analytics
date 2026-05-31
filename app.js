async function analisarAnuncio() {

    const entrada = document.getElementById("itemId").value.trim();
    const resultado = document.getElementById("resultado");

    resultado.innerHTML =

    try {

        let itemId = entrada;

        // Se colar URL
        if (entrada.includes("mercadolivre")) {

            const respostaBusca = await fetch(
                `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(entrada)}`
            );

            const busca = await respostaBusca.json();

            if (!busca.results || busca.results.length === 0) {
                throw new Error("Anúncio não encontrado");
            }

            itemId = busca.results[0].id;
        }

        const response = await fetch(
            `https://api.mercadolibre.com/items/${itemId}`
        );

        const data = await response.json();

        resultado.innerHTML = `
            <h2>${data.title}</h2>

            <img src="${data.thumbnail}"
                 width="250">

            <p><strong>Preço:</strong>
            R$ ${data.price}</p>

            <p><strong>Categoria:</strong>
            ${data.category_id}</p>

            <p><strong>Vendidos:</strong>
            ${data.sold_quantity}</p>

            <p><strong>Status:</strong>
            ${data.status}</p>
        `;

    } catch (erro) {

        resultado.innerHTML =
        "Erro ao consultar anúncio.";

        console.error(erro);
    }
}
