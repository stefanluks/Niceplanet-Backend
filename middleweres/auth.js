const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const CHAVE = "2DNK42KCLMOPVO321J6KLNJDKG096";

module.exports = {
    eAdmin: async (request, response, next) => {
        const authHeader = request.headers.authorization;
        if(!authHeader) return response.status(400).json({
            error: true,
            mensagem: "Erro: é necessário fazer login!",
        });

        const [, token ] = authHeader.split(" ");

        if(!token) return response.status(400).json({
            error: true,
            mensagem: "Erro: é necessário fazer login!",
        })

        try{
            const decode = await promisify(jwt.verify)(token, CHAVE);
            request.userId = decode.idUsuario;
            return next();
        }catch(erro){
            return response.status(400).json({
                error: true,
                mensagem: "Erro: é necessário fazer login!",
            })
        }
    }
}