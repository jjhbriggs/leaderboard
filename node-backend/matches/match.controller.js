const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const matchService = require('./match.service');

// routes

router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;


function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_from: Joi.string().required(),
        user_to: Joi.string().required(),
        approved: Joi.string().required(),
        executed: Joi.string().required(),
        result: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    matchService.create(req.body)
        .then(() => res.json({ message: 'Request successful' }))
        .catch(next);
}

function approve(req, res, next) {
    matchService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Approval successful' }))
        .catch(next);
}
function updateSchema(req, res, next) {
    const schema = Joi.object({
        user_from: Joi.string().required().empty(''),
        user_to: Joi.string().required().empty(''),
        approved: Joi.string().required().empty(''),
        executed: Joi.string().required().empty(''),
        result: Joi.string().required().empty('')
    });
    validateRequest(req, next, schema);
}
function update(req, res, next) {
    matchService.update(req.params.id, req.body)
        .then(user => res.json(user))
        .catch(next);
}


function getAll(req, res, next) {
    matchService.getAll()
        .then(matches => res.json(matches))
        .catch(next);
}

function getById(req, res, next) {
    matchService.getById(req.params.id)
        .then(match => res.json(match))
        .catch(next);
}

function _delete(req, res, next) {
    matchService.delete(req.params.id)
        .then(() => res.json({ message: 'Request deleted successfully' }))
        .catch(next);
}