const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:abc@localhost:5432/magicbricks'); // Update with your DB credentials

const Item = sequelize.define('Item', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  picture: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
}, {
  timestamps: true, 
});

module.exports = Item;
