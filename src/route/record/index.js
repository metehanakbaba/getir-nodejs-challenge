import { Router } from 'express';
import recordController from './record.controller';
import { asyncWrapper } from '../../utils/asyncWrapper';

export { default as Record } from './record.model';
export { schema } from './record.model';

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
 * @apiSuccess {Array} records Record's data.
 * @apiSuccess {String} msg Conditional message
 * @apiSuccess {Number} code Success code [0]
 * @apiError {String} msg Some parameters may contain invalid values.
 * @apiError {Number} code Error code of Validation[3]
 */

// routes
// eslint-disable-next-line no-use-before-define
router.post('/', asyncWrapper(listRecords), asyncWrapper(recordController.list));

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
