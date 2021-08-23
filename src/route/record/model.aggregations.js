export const createdAtBetween = ({ lowerBound, upperBound }) => ({
  $match: {
    createdAt: { $gte: lowerBound, $lt: upperBound }
  }
});

export const projectionForTotalCount = () => ({
  $project: {
    _id: false,
    key: true,
    createdAt: true,
    totalCount: {
      $reduce: {
        input: '$counts',
        initialValue: 0,
        in: {
          $sum: ['$$value', '$$this']
        }
      }
    }
  }
});

export const totalCountBetween = ({ lowerBound, upperBound }) => ({
  $match: {
    totalCount: { $gte: lowerBound, $lt: upperBound }
  }
});
