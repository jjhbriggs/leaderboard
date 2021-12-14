const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    return await db.Match.findAll();
}

async function getById(id) {
    return await getMatch(id);
}

async function create(params) {
    await db.Match.create(params);
}

async function update(id, params) {
    const match = await getMatch(id);

    // copy params to user and save
    Object.assign(match, params);
    await match.save();

    return match.get();
}

async function _delete(id) {
    const match = await getMatch(id);
    await match.destroy();
}

// helper functions

async function getMatch(id) {
    const match = await db.Match.findByPk(id);
    if (!match) throw 'Match not found';
    return match;
}