import mongoose, { Schema } from 'mongoose';

const recordSchema = new Schema({
  key: {
    type: String
  },
  createdAt: {
    type: Date
  },
  counts: {
    type: [Number]
  }
});

recordSchema.methods = {
  view() {
    const view = {
      // eslint-disable-next-line no-underscore-dangle
      _id: this._id,
      key: this.key,
      createdAt: this.createdAt,
      counts: this.counts
    };

    return view;
  }
};

const model = mongoose.model('Record', recordSchema);

export const { schema } = model;
export default model;
