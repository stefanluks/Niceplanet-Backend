// importando as bibliotecas
const Sequelize = require("sequelize");
const banco = require("./banco");


//Cirando o Objeto que será usado como base para a construção da tabela no banco de dados.
// Usuario:
//      -> idUsuario: número inteiro, com auto incremento, não pode ser nulo e é a chave primária
//      -> nomeUsuarioo: string que não pode ser nulo.
//      -> senhasuario: string que guarda os digitos do CPF, e não pode ser nulo
const Usuario = banco.define("usuarios",{
    idUsuario:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeUsuario:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    senhaUsuario:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Usuario.sync();

// Exportando a instância do Sequelize para os outros arquivos.
module.exports = Usuario;