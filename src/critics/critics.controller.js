const criticsService = require('./critics.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res, next) {
    res.json({ data: await criticsService.list() });
};

module.exports = {
    list: [asyncErrorBoundary(list)],
};