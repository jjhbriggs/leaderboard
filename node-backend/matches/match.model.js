const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        user_from: { type: DataTypes.STRING, allowNull: false },
        user_to: { type: DataTypes.STRING, allowNull: false },
        approved: { type: DataTypes.STRING, allowNull: false },
        executed: { type: DataTypes.STRING, allowNull: false },
        result: { type: DataTypes.STRING, allowNull: false }
    };

    
    const options = {
        
    };

    return sequelize.define('Match', attributes, options);
}