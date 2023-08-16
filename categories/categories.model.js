const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        categoryName: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('Category', attributes);
}