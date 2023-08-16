const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {

    const attributes = {
        questionName: { type: DataTypes.STRING, allowNull: false },
        questionType: { type: DataTypes.NUMBER, allowNull: false },
        questionTitle: { type: DataTypes.STRING, allowNull: false },
        questionContent: { type: DataTypes.STRING, allowNull: true },
        questionDescription: { type: DataTypes.STRING, allowNull: true },
        questionLevel: { type: DataTypes.NUMBER, allowNull: false },
        questionCategory: { type: DataTypes.NUMBER, allowNull: true },
        questionAnswer: { type: DataTypes.STRING, allowNull: false },
        questionPoint: { type: DataTypes.NUMBER, allowNull: false },
        questionExam: { type: DataTypes.NUMBER, allowNull: true },
        createdBy: { type: DataTypes.NUMBER, allowNull: false },
    };

    return sequelize.define('Question', attributes);
}