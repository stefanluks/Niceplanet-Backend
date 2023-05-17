//Importando a biblioteca responsavel por fazer essa conexão com o banco de dados
const Sequelize = require("sequelize");

// Objeto com as informações do banco de dados
const UserBanco = {
    nome: "niceplanet",
    usuario: "root",
    senha: "sLas@crp2023"
}

//Criando a instância do Sequelize que recebe as informações do banco para realizar a conexão
const banco = new Sequelize(UserBanco.nome, UserBanco.usuario, UserBanco.senha, {
    host: "localhost",
    dialect: "mysql"
});

//Conectando-se ao banco
banco.authenticate()
.then(()=>{
    //Caso conectado com êxito, a mensagem é exibida.
    console.log("Conexão bem Sucedida!!");
}).catch(()=>{
    //Caso haja algum problema na conexão, a mensagem é exibida.
    console.log("Conexão mal sucedida!!");
});

// Exportando a instância do Sequelize para os outros arquivos.
module.exports = banco;