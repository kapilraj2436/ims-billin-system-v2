import React, { useState, useEffect } from 'react';
import CustomerForm from './CustomerForm';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import './Customer.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllCustomers();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      setError('Failed to fetch customers. Please try again.');
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleViewCustomer = (customer) => {
    setEditingCustomer({ ...customer, viewMode: true });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCustomer(null);
  };

  const handleSaveCustomer = async () => {
    await fetchCustomers();
    handleCloseModal();
  };

  const columns = [
    {
      header: 'Customer ID',
      accessor: 'customerId',
      width: '100px'
    },
    {
      header: 'Customer Name',
      accessor: 'customerName',
      width: '200px'
    },
    {
      header: 'Mobile Number',
      accessor: 'customerMobile',
      width: '150px',
      render: (item) => (
        <a href={`tel:${item.customerMobile}`} className="mobile-link">
          {item.customerMobile}
        </a>
      )
    },
    {
      header: 'GSTIN Number',
      accessor: 'gstinNumber',
      width: '150px'
    },
    {
      header: 'City',
      accessor: 'city',
      width: '120px',
      render: (item) => (
        <span className="city-info">
          {item.customerAddress?.city?.cityName || 'N/A'}
        </span>
      )
    },
    {
      header: 'PIN Code',
      accessor: 'pinCode',
      width: '100px',
      render: (item) => (
        <span className="pin-code">
          {item.customerAddress?.city?.cityPinCode || 'N/A'}
        </span>
      )
    },
    {
      header: 'Address',
      accessor: 'address',
      width: '300px',
      render: (item) => (
        <div className="address-preview" title={`${item.customerAddress?.addressString1 || ''}, ${item.customerAddress?.addressString2 || ''}`}>
          {item.customerAddress ? 
            `${item.customerAddress.addressString1 || ''}, ${item.customerAddress.addressString2 || ''}`.replace(/^,\s*|,\s*$/g, '') || 'No address' 
            : 'No address'
          }
        </div>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading customers..." />;
  }

  return (
    <div className="customer-container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Customer Management</h1>
          <p className="page-subtitle">Manage your customer database and information</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddCustomer}>
          <i className="fas fa-user-plus me-2"></i>
          Add New Customer
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </div>
      )}

      <div className="content-card">
        <DataTable
          data={customers}
          columns={columns}
          onEdit={handleEditCustomer}
          onView={handleViewCustomer}
          searchable={true}
          sortable={true}
          pagination={true}
          pageSize={10}
        />
      </div>

      {showModal && (
        <Modal 
          title={editingCustomer?.viewMode ? 'View Customer Details' : 
                 editingCustomer ? 'Edit Customer' : 'Add New Customer'} 
          onClose={handleCloseModal}
          size="lg"
        >
          <CustomerForm
            customer={editingCustomer}
            onSave={handleSaveCustomer}
            onCancel={handleCloseModal}
            viewMode={editingCustomer?.viewMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default CustomerList;
