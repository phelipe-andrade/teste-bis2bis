import CollectUniversities from '../collectUniversities/CollectUniversities.js';
import UniversitySchema from '../db/models/UniversitiesModel.js';
import mongoose from 'mongoose';
import DB from '../db/DB.js';
class StartCollect {
  async nameCountries() {
    const arrayCountries = await DB.nameCountries();
    const arrayNames = [];
    for (const country of arrayCountries) {
      arrayNames.push(country.name);
    }
    return arrayNames;
  }
  async getUniversitiesByCountry() {
    const listCountry = await this.nameCountries();
    for (const country of listCountry) {
      const universitiesByCountryDB = mongoose.model(country, UniversitySchema);
      this.arrayByCountryDB = await universitiesByCountryDB.find();
      const univer = new CollectUniversities();
      this.arrayBycountryApi = await univer.getUniversities(country);
      await this.startInsert();
    }
  }
  async startInsert() {
    for (const universityApi of this.arrayBycountryApi) {
      const insert = new DB();
      const isIncluded = insert.compareDB(universityApi, this.arrayByCountryDB);
      if (!isIncluded) await DB.insertDB(universityApi);
    }
  }
  async init() {
    console.log('Começo da captura');
    await this.getUniversitiesByCountry();
    console.log('Fim da captura');
  }
}
export default StartCollect;