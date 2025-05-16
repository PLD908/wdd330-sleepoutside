function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} - ${res.statusText}`);
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    console.log('Fetching data from:', this.path);
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => {
        console.log('Data fetched:', data);
        return data;
      })
      .catch(error => {
        console.error('Fetch error:', error);
        return [];
      });
  }
  async findProductById(id) {
    const products = await this.getData();
    const product = products.find((item) => item.Id === id);
    console.log('Found product by ID:', id, product);
    return product || null;
  }
}