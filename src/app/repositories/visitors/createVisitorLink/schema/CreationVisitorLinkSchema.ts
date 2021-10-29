import mongoose, { Schema } from 'mongoose';
import { IVisitorLinkGen } from '../../../../entities/IVisitorLinkGen';

const addDaysToDate = (numberOfDays: number): Date => {
  const date = Date.now() + 1000 * 60 * 60 * 24 * numberOfDays;
  return new Date(date);
};

const schema = new Schema<IVisitorLinkGen>({
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  bie: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: addDaysToDate(4), default: new Date() },
  remember_in: { type: Date, default: addDaysToDate(2) },
  expire_at: { type: Date, default: addDaysToDate(4) },
});

export default mongoose.model<IVisitorLinkGen>(
  'VisitorsLinks',
  schema,
  'VisitorsLinks',
);
