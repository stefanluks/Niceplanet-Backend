const Sequelize = require("sequelize");
const banco = require("./banco");

//Cirando o Objeto que será usado como base para a construção da tabela no banco de dados.
// Propiedade:
//      -> idPropiedade: número inteiro, com auto incremento, não pode ser nulo e é a chave primária
//      -> nomePropiedade: string que não pode ser nulo.
//      -> cadastroRural: string que guarda os digitos do CPF, e não pode ser nulo
const Propriedade = banco.define("propiedades",{
    idPropriedade:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomePropriedade:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    cadastroRural:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Propiedade.sync();

// Exportando a instância do Sequelize para os outros arquivos.
module.exports = Propriedade;