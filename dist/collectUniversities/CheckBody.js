import InsertDB from '../db/DB.js';
class CheckBody {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.isIncluded = true;
  }
  checkFields() {
    this.fields();
    if (this.errors.length > 0) return this.errors;
  }
  fields() {
    const msg = 'não inserido ou incorreto.';
    if (!this.body.name || typeof this.body.name !== 'string') this.errors.push(`Nome ${msg}`);
    if (!this.body.country || typeof this.body.country !== 'string') this.errors.push(`País ${msg}`);
    if (!this.body['state-province'] || typeof this.body['state-province'] !== 'string') this.errors.push(`Nome do estado ${msg}`);
    if (!this.body.alpha_two_code || this.body.alpha_two_code.length < 2 || typeof this.body.alpha_two_code !== 'string') this.errors.push(`Alpha two code ${msg}`);
    if (!this.body.domains) this.errors.push(`Dominio(s) ${msg}`);
    if (!this.body.web_pages) this.errors.push(`Web page(s) ${msg}`);
  }
  async includedInDB() {
    const res = await new InsertDB().insertUniversity(this.body);
    return res;
  }
}
export default CheckBody;