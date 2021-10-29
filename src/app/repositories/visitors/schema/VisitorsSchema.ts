import mongoose, { Schema } from 'mongoose';
import { IVisitor } from '../../../entities/IVisitor';

const schema = new Schema<IVisitor>({
  email: { type: String, required: true, unique: true },
  bie: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  bic: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  phone: { type: String },
  generated_pass: { type: String },
  confirmed_email: { type: Boolean, default: false },
  accept_promotions: { type: Boolean, default: false },
});

export default mongoose.model<IVisitor>('Visitors', schema, 'Visitors');
