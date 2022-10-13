class ShowUniversities {
  allUniversities(result) {
    return {
      quantidade: result.length,
      universities: result.map(uni => {
        return {
          _id: uni._id,
          name: uni.name,
          country: uni.country,
          'state-province': uni['state-province']
        };
      })
    };
  }
  universitiesByPage(result, page, limit) {
    const arrayPage = [];
    if (!page) page = 1;
    let maxItems = limit || 20;
    let total = page * maxItems;
    if (total > result.length) {
      maxItems -= total - result.length;
      total = result.length;
    }
    if (maxItems <= 0) return {
      error: `Página inválida. Selecione uma página entre 1 e ${Math.ceil(result.length / (limit || 20))}`
    };
    if (result.length < maxItems) return this.allUniversities(result);
    for (let i = total - maxItems; i < total; i++) {
      arrayPage.push(result[i]);
    }
    return {
      currentPage: Number(page),
      totalPage: Math.ceil(result.length / (limit || 20)),
      totalByPage: arrayPage.length,
      totalUniversities: result.length,
      universities: arrayPage.map(uni => {
        return {
          _id: uni._id,
          name: uni.name,
          country: uni.country,
          'state-province': uni['state-province']
        };
      })
    };
  }
}
export default new ShowUniversities();