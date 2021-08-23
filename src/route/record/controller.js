import { success } from '../../services/response';
import {
  createdAtBetween,
  projectionForTotalCount,
  totalCountBetween
} from './model.aggregations';
// eslint-disable-next-line import/no-cycle
import { Record } from '.';

// eslint-disable-next-line import/prefer-default-export
export const query = ({ body }, res, next) => {
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
