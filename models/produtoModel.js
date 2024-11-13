const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Produto = sequelize.define(
  'Produto',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'produtos',
    timestamps: false,
  },
);

module.exports = Produto;
