const baseURL = import.meta.env.VITE_SERVER_URL;

export default class ExternalServices {
  constructor() {
    
  }

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await response.json();
    return data.Result || [];
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await response.json();
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    
    const response = await fetch(`${baseURL}checkout`, options);
    return await response.json();
  }
}