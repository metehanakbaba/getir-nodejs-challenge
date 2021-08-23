import { Router } from 'express';
// eslint-disable-next-line import/no-cycle
import { query } from './controller';

export { default as Record } from './model';
export { schema } from './model';

const Joi = require('joi').extend(require('@joi/date'));

const router = new Router();

/**
 * @api {post} /records Query on record
 * @apiName Query
 * @apiGroup Record
 * @apiParam startDate Minimum value (inclusive) for 'createdAt' field of Record
 * @apiParam endDate Maximum value (exclusive) for 'createdAt' field of Record
 * @apiParam minCount Minimum value (inclusive) for sum of 'counts' field of Record
 * @apiParam maxCount Maximum value (exclusive) for sum of 'counts' field of Record
 * @apiSuccess {Object} record Record's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

// routes
// eslint-disable-next-line no-use-before-define
router.post('/', listRecords, query);

function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
  };
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    const message = error.details.map((x) => x.message);
    req.errorBody = {
      error: { message }
    };
    res.status(400);
    next(
      message.join(',')
    );
  }
  else {
    req.body = value;
    next();
  }
}

function listRecords(req, res, next) {
  const schema = Joi.object({
    startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    endDate: Joi.date().format('YYYY-MM-DD').utc().required(),
    minCount: Joi.number().min(0).required(),
    maxCount: Joi.number().min(0).required()
  });
  validateRequest(req, res, next, schema);
}

// helper functions

export default router;
