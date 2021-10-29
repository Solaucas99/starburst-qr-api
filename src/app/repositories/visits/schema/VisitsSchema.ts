import mongoose, { Schema } from 'mongoose';
import { IVisit } from '../../../entities/IVisit';

const schema = new Schema<IVisit>({
  date: { type: Date, default: new Date(), required: true },
  visitor: {
    type: Schema.Types.ObjectId,
    ref: 'Visitors',
    required: true,
  },
  finished: { type: Boolean, default: false },
  qrcode: { type: String, default: null },
});

export default mongoose.model<IVisit>('Visits', schema, 'Visits');
