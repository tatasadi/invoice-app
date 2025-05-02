import mongoose, { Document, Schema } from 'mongoose';
import { IAddress } from './address';
import { IItem } from './item';

export interface IInvoice extends Document {
  paymentDue?: Date;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: string;
  senderAddress: IAddress['_id'];
  clientAddress: IAddress['_id'];
  items: IItem['_id'][];
  total: number;
  invoiceDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<IInvoice>({
  paymentDue:    { type: Date },
  description:   { type: String, default: '' },
  paymentTerms:  { type: Number, default: 0 },
  clientName:    { type: String, default: '' },
  clientEmail:   { type: String, default: '' },
  status:        { type: String, required: true },

  senderAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },
  clientAddress: { type: Schema.Types.ObjectId, ref: 'Address', required: true },

  items:         [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  total:         { type: Number, default: 0 },
  invoiceDate:   { type: Date, default: () => new Date() }
}, { timestamps: true });

export default mongoose.models.Invoice || mongoose.model<IInvoice>('Invoice', invoiceSchema);