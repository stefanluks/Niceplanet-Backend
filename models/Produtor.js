const Sequelize = require("sequelize");
const banco = require("./banco");

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