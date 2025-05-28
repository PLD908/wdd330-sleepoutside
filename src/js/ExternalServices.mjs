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

  async checkout(payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  };
  
  try {
    const response = await fetch(`${baseURL}checkout`, options);
    const data = await convertToJson(response);
    return data;
  } catch (err) {
    console.error('Checkout API error:', err);
    throw err; // Re-throw for handling in CheckoutProcess
  }
}
  

}

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { 
      name: 'servicesError', 
      message: jsonResponse.message || 'Service request failed',
      details: jsonResponse
    };
  }
}

