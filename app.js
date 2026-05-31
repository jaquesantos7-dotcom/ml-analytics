async function analisarAnuncio(){

const itemId =
document.getElementById("itemId").value;

const resultado =
document.getElementById("resultado");

resultado.innerHTML =
"Analisando...";

try{

const response =
await fetch(
`https://api.mercadolibre.com/items/${itemId}`
);

const data =
await response.json();

resultado.innerHTML = `

<h2>${data.title}</h2>

<p>
Preço:
R$ ${data.price}
</p>

<p>
Categoria:
${data.category_id}
</p>

<p>
Quantidade vendida:
${data.sold_quantity}
</p>
`;

}catch(error){

resultado.innerHTML =
"Erro ao analisar anúncio.";

}

}
