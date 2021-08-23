import { success } from '../../services/response';
import {
  createdAtBetween,
  projectionForTotalCount,
  totalCountBetween
} from './record.model.aggregations';
import { Record } from '.';

const recordController = {};

// List records
recordController.list = async ({ body }, res, next) => {
  Record.aggregate([
    createdAtBetween({
      lowerBound: new Date(body.startDate),
      upperBound: new Date(body.endDate)
    }),
    projectionForTotalCount(),
    totalCountBetween({ lowerBound: body.minCount, upperBound: body.maxCount })
  ])
    .exec()
    .then((records) => ({ records }))
    .then(success(res))
    .catch(next);
};

export default recordController;
