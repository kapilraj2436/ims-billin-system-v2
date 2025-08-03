import React, { useState, useEffect } from 'react';
import CityForm from './CityForm';
import Modal from '../../common/Modal';
import LoadingSpinner from '../../common/LoadingSpinner';
import DataTable from '../../common/DataTable';
import apiService from '../../services/api';
import './City.css';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCity, setEditingCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllCities();
      setCities(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setError('Failed to fetch cities. Please try again.');
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = () => {
    setEditingCity(null);
    setShowModal(true);
  };

  const handleEditCity = (city) => {
    setEditingCity(city);
    setShowModal(true);
  };

  const handleViewCity = (city) => {
    setEditingCity({ ...city, viewMode: true });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCity(null);
  };

  const handleSaveCity = async () => {
    await fetchCities();
    handleCloseModal();
  };

  const columns = [
    {
      header: 'City ID',
      accessor: 'cityId',
      width: '100px'
    },
    {
      header: 'City Name',
      accessor: 'cityName',
      width: '200px',
      render: (item) => (
        <div className="city-name-cell">
          <i className="fas fa-city me-2 text-primary"></i>
          <strong>{item.cityName}</strong>
        </div>
      )
    },
    {
      header: 'PIN Code',
      accessor: 'cityPinCode',
      width: '150px',
      render: (item) => (
        <span className="pin-code-badge">
          <i className="fas fa-map-pin me-1"></i>
          {item.cityPinCode}
        </span>
      )
    },
    {
      header: 'Description',
      accessor: 'cityDescription',
      width: '400px',
      render: (item) => (
        <div className="description-cell" title={item.cityDescription}>
          {item.cityDescription?.substring(0, 100)}
          {item.cityDescription?.length > 100 && '...'}
        </div>
      )
    },
    {
      header: 'Location Info',
      accessor: 'locationInfo',
      width: '200px',
      render: (item) => (
        <div className="location-summary">
          <div className="city-pin-combo">
            <span className="city-text">{item.cityName}</span>
            <span className="pin-text">PIN: {item.cityPinCode}</span>
          </div>
        </div>
      )
    }
  ];

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading cities..." />;
  }

  return (
    <div className="city-container fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">City Management</h1>
          <p className="page-subtitle">Manage cities with PIN codes and descriptions</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddCity}>
          <i className="fas fa-city me-2"></i>
          Add New City
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
          data={cities}
          columns={columns}
          onEdit={handleEditCity}
          onView={handleViewCity}
          searchable={true}
          sortable={true}
          pagination={true}
          pageSize={10}
        />
      </div>

      {showModal && (
        <Modal 
          title={editingCity?.viewMode ? 'View City Details' : 
                 editingCity ? 'Edit City' : 'Add New City'} 
          onClose={handleCloseModal}
          size="md"
        >
          <CityForm
            city={editingCity}
            onSave={handleSaveCity}
            onCancel={handleCloseModal}
            viewMode={editingCity?.viewMode}
          />
        </Modal>
      )}
    </div>
  );
};

export default CityList;
