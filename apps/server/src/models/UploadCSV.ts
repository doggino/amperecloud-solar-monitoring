import { model, Schema, Document, Types } from 'mongoose';

export interface IFacilityData {
  time: string;
  activePower: number;
  energy: number;
}

export interface IUploadCSV extends Document {
  fileName: string;
  data: IFacilityData[];
}

const uploadCsvSchema = new Schema<IUploadCSV>({
  fileName: { type: String, required: true },
  data: [
    {
      activePower: { type: Number, required: true },
      energy: { type: Number, required: true },
      time: { type: String, required: true },
    },
  ],
});

const UploadCSV = model<IUploadCSV>('UploadCSV', uploadCsvSchema);

export default UploadCSV;
