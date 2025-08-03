import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import './Address.css';

const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchAddresses();
    }, []);
  
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getAllAddresses();
        setAddresses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching addresses:', error);
        setError('Failed to fetch addresses. Please try again.');
        setAddresses([]);
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddAddress = () => {
      setEditingAddress(null);
      setShowModal(true);
    };
  
    const handleEditAddress = (address) => {
      setEditingAddress(address);
      setShowModal(true);
    };
  
    const handleViewAddress = (address) => {
      setEditingAddress({ ...address, viewMode: true });
      setShowModal(true);
    };
  
    const handleDeleteAddress = async (address) => {
      if (window.confirm('Are you sure you want to delete this address?')) {
        try {
          await apiService.deleteAddress(address);
          await fetchAddresses();
        } catch (error) {
          console.error('Error deleting address:', error);
          setError('Failed to delete address. Please try again.');
        }
      }
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
      setEditingAddress(null);
    };
  
    const handleSaveAddress = async () => {
      await fetchAddresses();
      handleCloseModal();
    };
  
    const columns = [
      {
        header: 'Address ID',
        accessor: 'addressId',
        width: '100px'
      },
      {
        header: 'Address Line 1',
        accessor: 'addressString1',
        width: '250px',
        render: (item) => (
          <div className="address-line-cell" title={item.addressString1}>
            <i className="fas fa-home me-2 text-primary"></i>
            {item.addressString1}
          </div>
        )
      },
      {
        header: 'Address Line 2',
        accessor: 'addressString2',
        width: '200px',
        render: (item) => (
          <div className="address-line-cell" title={item.addressString2}>
            {item.addressString2 || 'N/A'}
          </div>
        )
      },
      {
        header: 'City',
        accessor: 'city',
        width: '150px',
        render: (item) => (
          <div className="city-info-cell">
            <i className="fas fa-city me-2 text-info"></i>
            <div>
              <div className="city-name">{item.city?.cityName || 'N/A'}</div>
              <div className="pin-code">PIN: {item.city?.cityPinCode || 'N/A'}</div>
            </div>
          </div>
        )
      },
      {
        header: 'Complete Address',
        accessor: 'fullAddress',
        width: '350px',
        render: (item) => (
          <div className="full-address-cell">
            <div className="address-preview">
              <div className="address-line">{item.addressString1}</div>
              {item.addressString2 && (
                <div className="address-line secondary">{item.addressString2}</div>
              )}
              <div className="city-line">
                <span className="city">{item.city?.cityName}</span>
                <span className="pin">- {item.city?.cityPinCode}</span>
              </div>
            </div>
          </div>
        )
      }
    ];
  
    if (loading) {
      return <LoadingSpinner size="lg" text="Loading addresses..." />;
    }
  
    return (
      <div className="address-container fade-in">
        <div className="page-header">
          <div>
            <h1 className="page-title">Address Management</h1>
            <p className="page-subtitle">Manage shipping and billing addresses</p>
          </div>
          <button className="btn btn-primary" onClick={handleAddAddress}>
            <i className="fas fa-map-marker-alt me-2"></i>
            Add New Address
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
            data={addresses}
            columns={columns}
            onEdit={handleEditAddress}
            onView={handleViewAddress}
            onDelete={handleDeleteAddress}
            searchable={true}
            sortable={true}
            pagination={true}
            pageSize={10}
            maxVisibleRows={25}
          />
        </div>
  
        {showModal && (
          <Modal 
            title={editingAddress?.viewMode ? 'View Address Details' : 
                   editingAddress ? 'Edit Address' : 'Add New Address'} 
            onClose={handleCloseModal}
            size="lg"
          >
            <AddressForm
              address={editingAddress}
              onSave={handleSaveAddress}
              onCancel={handleCloseModal}
              viewMode={editingAddress?.viewMode}
            />
          </Modal>
        )}
      </div>
    );
  };
  
  export default AddressList;
