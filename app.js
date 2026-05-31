async function analisarAnuncio() {

const entrada = document.getElementById("itemId").value.trim();
const resultado = document.getElementById("resultado");

if (!entrada) {
    resultado.innerHTML = "<h2>Digite um ID ou link.</h2>";
    return;
}

resultado.innerHTML = "<p>🔍 Analisando...</p>";

const matchMLBU = entrada.match(/MLBU\d+/i);

if (matchMLBU) {
    resultado.innerHTML = `
        <h2>Produto de Catálogo Detectado</h2>
        <p>Código encontrado: <strong>${matchMLBU[0]}</strong></p>
        <p>Esse código é de catálogo (MLBU) e não de anúncio (MLB).</p>
    `;
    return;
}

const matchMLB = entrada.match(/MLB[-]?\d+/i);

if (!matchMLB) {
    resultado.innerHTML = `
        <h2>ID não encontrado</h2>
        <p>Informe um anúncio contendo um código MLB.</p>
    `;
    return;
}

const itemId = matchMLB[0].replace("-", "");

try {

    const response = await fetch(
        `https://api.mercadolibre.com/items/${itemId}`
    );

    const data = await response.json();

    if (data.error) {
        resultado.innerHTML = `
            <h2>Anúncio não encontrado</h2>
        `;
        return;
    }

    resultado.innerHTML = `
        <h2>${data.title}</h2>

        <img src="${data.thumbnail}" width="250">

        <p><strong>Preço:</strong> R$ ${data.price}</p>

        <p><strong>Categoria:</strong> ${data.category_id}</p>

        <p><strong>Vendidos:</strong> ${data.sold_quantity}</p>

        <p><strong>Status:</strong> ${data.status}</p>
    `;

} catch (erro) {

    console.error(erro);

    resultado.innerHTML = `
        <h2>Erro ao consultar API</h2>
    `;
}

}
