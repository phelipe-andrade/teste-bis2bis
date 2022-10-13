import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import UniversitySchema from './models/UniversitiesModel.js';
import CountriesSchema from './models/CountriesModel.js';
mongoose.connect(process.env.CONNECTIONSTRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
import getUniversities from '../collectUniversities/GetUniversities.js';
class DB {
  constructor() {
    this.contain = false;
  }
  async insertUniversity(body) {
    const universitiesByCountryDB = mongoose.model(body.country, UniversitySchema);
    const arrayByCountryDB = await universitiesByCountryDB.find();
    return this.compareDB(body, arrayByCountryDB);
  }
  compareDB(uniApi, arrayUniDB) {
    arrayUniDB.forEach(uniDb => {
      if (uniDb.name === uniApi.name && uniDb['state-province'] === uniApi['state-province']) this.contain = true;
    });
    return this.contain;
  }
  static async insertDB(uni) {
    const UniversityModel = mongoose.model(uni.country, UniversitySchema);
    const result = await UniversityModel.create(uni);
    return result;
  }
  static async updateDB(body, id) {
    const universityDB = await getUniversities.byId(id);
    const UniversityModel = mongoose.model(universityDB.country, UniversitySchema);
    const result = await UniversityModel.findByIdAndUpdate(id, body, {
      new: true
    });
    return result;
  }
  static async deleteDB(id) {
    const universityDB = await getUniversities.byId(id);
    const UniversityModel = mongoose.model(universityDB.country, UniversitySchema);
    const result = await UniversityModel.findByIdAndDelete(id);
    return result;
  }
  static async nameCountries() {
    const countries = mongoose.model('countries', CountriesSchema);
    const result = await countries.find();
    return result;
  }
}
export default DB;