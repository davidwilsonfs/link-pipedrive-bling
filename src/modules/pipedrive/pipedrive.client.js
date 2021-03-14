import axios from 'axios';

class PiperiveClient {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://teste3.pipedrive.com/api/v1',
      params: { api_token: '49651e413966468d5f811a6cf4e12af83091d8e4' },
    });
  }

  async getDealDetails(id) {
    this.instance
      .get(`/deals/${id}`)
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => console.log(err));
  }

  async getDealProducts(id) {
    this.instance
      .get(`/deals/${id}/products`)
      .then(data => {
        console.log(data);
        return data;
      })
      .catch(err => console.log(err));
  }
}

export default new PiperiveClient();