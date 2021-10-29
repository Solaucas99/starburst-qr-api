import mongoose, { Schema } from 'mongoose';
import { IUpdateVisitorLinkGen } from '../../../../entities/IUpdateVisitorLinkGen';

const addDaysToDate = (numberOfDays: number): Date => {
  const date = Date.now() + 1000 * 60 * 60 * 24 * numberOfDays;
  return new Date(date);
};

const schema = new Schema<IUpdateVisitorLinkGen>({
  token: { type: String, required: true },
  visitor: {
    type: Schema.Types.ObjectId,
    ref: 'Visitors',
    required: true,
  },
  createdAt: { type: Date, expires: addDaysToDate(4), default: new Date() },
  remember_in: { type: Date, default: addDaysToDate(2) },
  expire_at: { type: Date, default: addDaysToDate(4) },
});

export default mongoose.model<IUpdateVisitorLinkGen>(
  'UpdateVisitorsLinks',
  schema,
  'UpdateVisitorsLinks',
);
