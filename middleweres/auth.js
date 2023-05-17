//importando as bibliotecas utéis para a autenticação
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//Chave "---" para decodificar a hash a senha
const CHAVE = "2DNK42KCLMOPVO321J6KLNJDKG096";

//Criando e exportando as funções utéis
module.exports = {
    //função que irá controlar essa autenticação decodificando o token e verificando se ele é valido
    eAdmin: async (request, response, next) => {
        //recebendo as informações do cabeçalho da requisição
        const authHeader = request.headers.authorization;
        //Caso não exista o sistema retorna o json de erro, como a mensagem de que é necessario fazer login.
        if(!authHeader) return response.status(400).json({
            error: true,
            mensagem: "Erro: é necessário fazer login!",
        });

        //recebendo token do cabeçalho
        const [, token ] = authHeader.split(" ");

        //caso o token não exista o sistema retorna o json de erro novamente.
        if(!token) return response.status(400).json({
            error: true,
            mensagem: "Erro: é necessário fazer login!",
        })

        //tentando decodificar o token e verificar sua validade
        try{
            //Decodificando o token utilizando a chave como parâmetro.
            const decode = await promisify(jwt.verify)(token, CHAVE);
            //Passando o ID do usuário logado para a request, quando as informações do mesmo
            request.userId = decode.idUsuario;
            //Ao concluir a validação o sistema retorna para a próxima função da aplicação.
            return next();
        }catch(erro){
            //caso o sistema não decodifique token é retornado o json de erro novamente.
            return response.status(400).json({
                error: true,
                mensagem: "Erro: é necessário fazer login!",
            })
        }
    }
}