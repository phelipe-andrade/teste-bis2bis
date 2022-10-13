import mongoose from 'mongoose';

const CountrySchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default CountrySchema;
