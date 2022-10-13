import getUniversities from '../collectUniversities/GetUniversities.js';
import showUniversities from '../collectUniversities/ShowUniversities.js';
import CheckBody from '../collectUniversities/CheckBody.js';
import DB from '../db/DB.js';
class UniversitiesControllers {
  async getUniversities(req, res) {
    const country = req.query['country'];
    const page = req.query['page'];
    const limit = req.query['limit'];
    try {
      let result;
      if (country) result = await getUniversities.byCountry(req);else result = await getUniversities.allUniversities();
      const response = showUniversities.universitiesByPage(result, page, limit);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        error: 'error'
      });
    }
  }
  async getUniversitiesById(req, res) {
    const id = req.params.id;
    if (!typeof id === 'string') return res.status(400).send('Id inexistente');
    try {
      const result = await getUniversities.byId(id);
      if (!result) return res.status(400).send({
        error: 'Id inexistente no banco de dados'
      });
      const response = {
        university: {
          _id: result._id,
          name: result.name,
          domains: result.domains,
          web_pages: result.web_pages,
          country: result.country,
          'state-province': result['state-province'],
          alpha_two_code: result.alpha_two_code
        }
      };
      return res.status(200).send(response);
    } catch (error) {
      return res.status(500).send({
        error: 'Id inexistente no banco de dados'
      });
    }
  }
  async postUniversity(req, res) {
    const body = req.body;
    if (!body) return res.render('404');
    try {
      const response = new CheckBody(body);
      const result = response.checkFields();
      if (result) return res.status(200).send({
        error: result
      });
      const isIncluded = await response.includedInDB();
      if (isIncluded) return res.status(200).send({
        error: 'Universidade já existente.'
      });
      const insert = await DB.insertDB(body);
      const send = {
        message: 'Universidade adicionada com sucesso!',
        insert
      };
      return res.status(200).send(send);
    } catch (error) {
      return res.status(500).send({
        error: 'error'
      });
    }
  }
  async putUniversity(req, res) {
    const id = req.params.id;
    const body = req.body;
    if (!body || !id) return res.status('404').send({
      error: 'Não possui body ou id.'
    });
    try {
      const update = await DB.updateDB(body, id);
      const send = {
        message: 'Universidade atualizada com sucesso!',
        update
      };
      return res.status(200).send(send);
    } catch (error) {
      return res.status(500).send({
        error: 'error'
      });
    }
  }
  async deleteUniversity(req, res) {
    const id = req.params.id;
    if (typeof id !== 'string') return res.render('404');
    try {
      const uniDel = await DB.deleteDB(id);
      const send = {
        message: 'Universidade deletada com sucesso!',
        uniDel
      };
      return res.status(200).send(send);
    } catch (error) {
      return res.status(500).send({
        error: 'error'
      });
    }
  }
}
export default new UniversitiesControllers();