const Sequelize = require("sequelize");
const banco = require("./banco");

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

module.exports = Usuario;