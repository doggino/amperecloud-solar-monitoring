import { model, Schema, Document, Types, ObjectId } from 'mongoose';

export interface IFacility extends Document {
  name: string;
  owner: ObjectId;
  uploadCSV?: ObjectId;
}

const facilitySchema = new Schema<IFacility>({
  name: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User', required: true },
  uploadCSV: { type: Types.ObjectId, ref: 'UploadCSV' },
});

const Facility = model<IFacility>('Facility', facilitySchema);

export default Facility;
