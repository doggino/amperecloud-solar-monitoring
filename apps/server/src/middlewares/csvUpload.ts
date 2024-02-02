import { RequestHandler } from 'express';
import multer from 'multer';
import Facility from '../models/Facility';
import { readFileSync, unlinkSync } from 'fs';
import { parse } from 'csv-parse/sync';
import UploadCSV from '../models/UploadCSV';

const upload = multer({ dest: 'uploads/' });

const headerMap = {
  timestamp: 'time',
  active_power_kW: 'activePower',
  energy_kWh: 'energy',
};

const processUpload: RequestHandler = async (req, res) => {
  const fileInfo = req.file;

  const data = parse(readFileSync(fileInfo.path), {
    columns: (header) => header.map((column: string) => headerMap[column]),
    skip_empty_lines: true,
  });
  unlinkSync(fileInfo.path);

  const payload = {
    fileName: fileInfo.originalname,
    data,
  };
  const uploadCSV = await UploadCSV.create(payload);
  const facility = await Facility.findById(req.body.facility_id);
  facility.uploadCSV = uploadCSV._id;
  await facility.save();

  res.json({ ...payload, id: uploadCSV._id });
};

const csvMiddlewares = [upload.single('csv_file'), processUpload];

export default csvMiddlewares;
