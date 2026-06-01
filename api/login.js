export default function handler(req, res) {

const url =
    "https://auth.mercadolivre.com.br/authorization" +
    "?response_type=code" +
    "&client_id=4849212245586572" +
    "&redirect_uri=https://ml-analytics-amber.vercel.app/api/callback";

res.redirect(url);

}
