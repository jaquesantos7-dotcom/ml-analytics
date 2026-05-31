export default async function handler(req, res) {

    const code = req.query.code;

    res.send(`
        <html>
        <body style="font-family:Arial;padding:40px;">
            <h1>Login realizado com sucesso</h1>
            <p>Código recebido:</p>
            <textarea style="width:100%;height:120px;">
${code}
            </textarea>
        </body>
        </html>
    `);
}
