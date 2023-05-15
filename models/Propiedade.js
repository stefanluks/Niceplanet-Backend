const Sequelize = require("sequelize");
const banco = require("./banco");

const Propiedade = banco.define("propiedades",{
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

module.exports = Propiedade;