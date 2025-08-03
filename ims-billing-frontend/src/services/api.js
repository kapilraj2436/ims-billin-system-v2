const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData}`);
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return await response.text();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Product APIs
  async getAllProducts() {
    return this.request('/product/search');
  }

  async getProductById(id) {
    return this.request(`/product/search/${id}`);
  }

  async addProduct(product) {
    return this.request('/product/add', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id, product) {
    return this.request(`/product/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  // Customer APIs
  async getAllCustomers() {
    return this.request('/customer/search');
  }

  async getCustomerById(id) {
    return this.request(`/customer/search/${id}`);
  }

  async addCustomer(customer) {
    return this.request('/customer/add', {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  async updateCustomer(id, customer) {
    return this.request(`/customer/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(customer),
    });
  }

  // Order APIs
  async getAllOrders() {
    return this.request('/order/search');
  }

  async getOrderById(id) {
    return this.request(`/order/search/${id}`);
  }

  async getOrdersByCustomerId(customerId) {
    return this.request(`/order/customerOrders/${customerId}`);
  }

  async addOrder(order) {
    return this.request('/order/add', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrder(id, order) {
    return this.request(`/order/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  // Payments APIs

  async getAllPaymentStatus() {
    return this.request('/paymentStatus/search');
  }

  async getAllPaymentMethods() {
    return this.request('/paymentMethod/search');
  }

  async getAllPayments() {
    return this.request('/payments/search');
  }

  async getPaymentById(id) {
    return this.request(`/payments/search/${id}`);
  }

  async addPayment(payment) {
    return this.request('/payments/add', {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  async addAllPayments(payments) {
    return this.request('/payments/addAll', {
      method: 'POST',
      body: JSON.stringify(payments),
    });
  }

  async updatePayment(id, payment) {
    return this.request(`/payments/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(payment),
    });
  }

  // Address APIs
  async getAllAddresses() {
    return this.request('/address/search');
  }

  async getAddressById(id) {
    return this.request(`/address/search/${id}`);
  }

  async addAddress(address) {
    return this.request('/address/add', {
      method: 'POST',
      body: JSON.stringify(address),
    });
  }

  async updateAddress(address) {
    return this.request('/address/update', {
      method: 'POST',
      body: JSON.stringify(address),
    });
  }

  async deleteAddress(address) {
    return this.request('/address/delete', {
      method: 'POST',
      body: JSON.stringify(address),
    });
  }

  // City APIs
  async getAllCities() {
    return this.request('/city/search');
  }

  async getCityById(id) {
    return this.request(`/city/search/${id}`);
  }

  async addCity(city) {
    return this.request('/city/add', {
      method: 'POST',
      body: JSON.stringify(city),
    });
  }

  async updateCity(id, city) {
    return this.request(`/city/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(city),
    });
  }

  // Discount APIs
  async getAllDiscounts() {
    return this.request('/discount/search');
  }

  async getDiscountById(id) {
    return this.request(`/discount/search/${id}`);
  }

  async addDiscount(discount) {
    return this.request('/discount/add', {
      method: 'POST',
      body: JSON.stringify(discount),
    });
  }

  async updateDiscount(id, discount) {
    return this.request(`/discount/update/${id}`, {
      method: 'POST',
      body: JSON.stringify(discount),
    });
  }

  // Bank Details APIs
  async getAllBankDetails() {
    return this.request('/bankDetails/search');
  }

  async getBankDetailsById(id) {
    return this.request(`/bankDetails/search/${id}`, {
      method: 'POST',
    });
  }

  async addBankDetails(bankDetails) {
    return this.request('/bankDetails/add', {
      method: 'POST',
      body: JSON.stringify(bankDetails),
    });
  }

  async updateBankDetails(bankDetails) {
    return this.request('/bankDetails/update', {
      method: 'POST',
      body: JSON.stringify(bankDetails),
    });
  }

  async deleteBankDetails(bankDetails) {
    return this.request('/bankDetails/delete', {
      method: 'POST',
      body: JSON.stringify(bankDetails),
    });
  }
}

export default new ApiService();
