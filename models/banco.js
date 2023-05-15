const Sequelize = require("sequelize");

const UserBanco = {
    nome: "niceplanet",
    usuario: "root",
    senha: "sLas@crp2023"
}

const banco = new Sequelize(UserBanco.nome, UserBanco.usuario, UserBanco.senha, {
    host: "localhost",
    dialect: "mysql"
});

banco.authenticate()
.then(()=>{
    console.log("Conexão bem Sucedida!!");
}).catch(()=>{
    console.log("Conexão mal sucedida!!");
});

module.exports = banco;