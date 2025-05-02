import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress extends Document {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

const addressSchema = new Schema<IAddress>({
  street:   { type: String, default: '' },
  city:     { type: String, default: '' },
  postCode: { type: String, default: '' },
  country:  { type: String, default: '' }
});

export default mongoose.models.Address || mongoose.model<IAddress>('Address', addressSchema);