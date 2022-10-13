import mongoose from 'mongoose';
import UniversitySchema from '../db/models/UniversitiesModel.js';
import DB from '../db/DB.js';

class GetUniversities {
  async byCountry(req) {
    const country = req.query['country'];
    try {
      const universitiesByCountry = mongoose.model(country, UniversitySchema);
      return await universitiesByCountry.find();
    } catch (err) {
      console.log(err);
    }
  }

  async byId(id) {
    let equal;
    try {
      const universitiesDb = await this.allUniversities();
      for (const key in universitiesDb) {
        const idDb = universitiesDb[key]._id.valueOf();
        if (idDb !== id) continue;
        equal = universitiesDb[key];
        break;
      }
      return equal;
    } catch (err) {
      console.log(err);
    }
  }

  async allUniversities() {
    const allUniversities = [];
    const countries = await DB.nameCountries();

    for (const country of countries) {
      const universitiesByCountry = mongoose.model(country.name, UniversitySchema);
      const arrayByCountry = await universitiesByCountry.find();

      arrayByCountry.forEach((uni) => allUniversities.push(uni));
    }
    return allUniversities;
  }
}

export default new GetUniversities();
