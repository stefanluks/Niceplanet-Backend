//importando o Banco de dados e a biblioteca de controle.
const Sequelize = require("sequelize");
const banco = require("./banco");

//Cirando o Objeto que será usado como base para a construção da tabela no banco de dados.
// Produtor:
//      -> idProdutor: número inteiro, com auto incremento, não pode ser nulo e é a chave primária
//      -> nomeProdutor: string que não pode ser nulo.
//      -> cpfProdutor: string que guarda os digitos do CPF, e não pode ser nulo
const Produtor = banco.define("produtores",{
    idProdutor:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nomeProdutor:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    cpfProdutor:{
        type: Sequelize.STRING,
        allowNull: false,
    }
});

// Produtor.sync();


module.exports = Produtor;