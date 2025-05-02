import mongoose, { Document, Schema } from 'mongoose';
import { IInvoice } from './invoice';

export interface IItem extends Document {
  name: string;
  quantity: number;
  price: number;
  total: number;
  invoice: IInvoice['_id'];
}

const itemSchema = new Schema<IItem>({
  name:     { type: String, default: '' },
  quantity: { type: Number, default: 0 },
  price:    { type: Number, default: 0 },
  total:    { type: Number, default: 0 },
  invoice:  { type: Schema.Types.ObjectId, ref: 'Invoice', required: true }
});

export default mongoose.models.Item || mongoose.model<IItem>('Item', itemSchema);