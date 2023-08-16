const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.NUMBER, allowNull: false },
        totalPoint: { type: DataTypes.NUMBER, allowNull: false },
        totalTime: { type: DataTypes.NUMBER, allowNull: false },
        answer: { type: DataTypes.STRING, allowNull: false },
        examId: { type: DataTypes.NUMBER, allowNull: false },
        examName: { type: DataTypes.STRING, allowNull: true },
        totalRecords: { type: DataTypes.NUMBER, allowNull: true },
        numberOfCorrect: { type: DataTypes.NUMBER, allowNull: true },
    };

    return sequelize.define('Result', attributes);
}