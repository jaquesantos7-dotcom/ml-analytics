async function analisarAnuncio() {

```
const entrada = document.getElementById("itemId").value.trim();
const resultado = document.getElementById("resultado");

if (!entrada) {
    resultado.innerHTML = `
        <h2>Informe um anúncio</h2>
        <p>Digite um ID MLB ou cole um link do Mercado Livre.</p>
    `;
    return;
}

resultado.innerHTML = "<p>🔍 Analisando anúncio...</p>";

try {

    let itemId = "";

    // Procura um código MLB dentro do texto
    const matchMLB = entrada.match(/MLB[-]?\d+/i);

    if (matchMLB) {
        itemId = matchMLB[0].replace("-", "");
    }

    // Se for MLBU (catálogo)
    const matchMLBU = entrada.match(/MLBU\d+/i);

    if (matchMLBU) {

        resultado.innerHTML = `
            <h2>Produto de Catálogo Detectado</h2>

            <p>
            O código encontrado foi:
            <strong>${matchMLBU[0]}</strong>
            </p>

            <p>
            Esse código pertence ao catálogo do Mercado Livre
            e não a um anúncio específico.
            </p>

            <p>
            Para análise completa, abra uma oferta específica
            e copie o link que contenha um código MLB.
            </p>
        `;

        return;
    }

    if (!itemId) {

        resultado.innerHTML = `
            <h2>ID não encontrado</h2>

            <p>
            Cole um link de anúncio contendo MLB
            ou informe diretamente o ID.
            </p>
        `;

        return;
    }

    const response = await fetch(
        `https://api.mercadolibre.com/items/${itemId}`
    );

    if (!response.ok) {
        throw new Error("Erro ao consultar API");
    }

    const data = await response.json();

    if (data.error || data.message) {

        resultado.innerHTML = `
            <h2>Anúncio não encontrado</h2>

            <p>
            O ID informado não retornou dados válidos.
            </p>
        `;

        return;
    }

    const foto =
        data.thumbnail ||
        data.secure_thumbnail ||
        "";

    resultado.innerHTML = `
        <div style="margin-top:20px;">

            <h2>${data.title || "Sem título"}</h2>

            ${foto ?
            `<img src="${foto}" width="250">`
            : ""}

            <p>
            <strong>Preço:</strong>
            R$ ${data.price ?? "Não informado"}
            </p>

            <p>
            <strong>Categoria:</strong>
            ${data.category_id ?? "Não informado"}
            </p>

            <p>
            <strong>Quantidade vendida:</strong>
            ${data.sold_quantity ?? 0}
            </p>

            <p>
            <strong>Status:</strong>
            ${data.status ?? "Não informado"}
            </p>

            <hr>

            <h3>Score Inicial</h3>

            <p>
            Este anúncio foi carregado com sucesso.
            Em breve serão adicionadas:
            </p>

            <ul>
                <li>Comparação com concorrentes</li>
                <li>Análise de imagens</li>
                <li>Análise de preço</li>
                <li>Sugestões de SEO</li>
                <li>Score de qualidade</li>
            </ul>

        </div>
    `;

} catch (erro) {

    console.error(erro);

    resultado.innerHTML = `
        <h2>Erro</h2>

        <p>
        Não foi possível consultar o anúncio.
        </p>

        <p>
        Verifique se o ID começa com MLB.
        </p>
    `;
}
```

}

