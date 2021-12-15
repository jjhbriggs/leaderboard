const config = require('config.json');
const pgp = require('pg-promise')();
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    //const connection = await mysql.createConnection({ host, port, user, password });

    const connection = pgp(config.database);

    //await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'postgres' });

    // init models and add them to the exported db object
    db.User = require('../users/user.model')(sequelize);
    db.Match = require('../matches/match.model')(sequelize);

    // sync all models with database
    await sequelize.sync();
}