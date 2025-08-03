import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import ProductList from './components/product/ProductList';
import './App.css';
import './styles/global.css';
import CustomerList from './components/customer/CustomerList';
import PaymentsList from './components/payments/PaymentsList';
import AddressList from './components/address/AddressList';
import CityList from './components/city/CistyList';
import OrderList from './components/order/OrderList';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/payments" element={<PaymentsList />} />
            <Route path="/addresses" element={<AddressList />} />
            <Route path="/cities" element={<CityList />} />
            <Route path="/orders" element={<OrderList />} />
            {/* <Route path="/discounts" element={<DiscountList />} />
            <Route path="/bank-details" element={<BankDetailsList />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
