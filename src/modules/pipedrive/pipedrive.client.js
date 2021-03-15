import axios from 'axios';

class PipedriveClient {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://teste3.pipedrive.com/api/v1',
      params: { api_token: '49651e413966468d5f811a6cf4e12af83091d8e4' },
    });
  }

  async getDealDetails(id) {
    return this.instance
      .get(`/deals/${id}`)
      .then(res => ({ ...res.data }))
      .catch(err => console.log(err));
  }

  async getDealProducts(deal_id, start = 0) {
    return this.instance
      .get(`/deals/${deal_id}/products`, {
        params: {
          start: start,
        },
      })
      .then(res => ({ ...res.data }))
      .catch(err => console.log(err));
  }

  async getDeals(start = 0) {
    return this.instance
      .get(`/deals`, {
        params: {
          start: start,
        },
      })
      .then(res => ({ ...res.data }))
      .catch(err => console.log(err));
  }
}

export default new PipedriveClient();
