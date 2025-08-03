import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

const CustomerForm = ({ customer, onSave, onCancel, viewMode = false }) => {
  const [formData, setFormData] = useState({
    customerName: customer?.customerName || '',
    customerMobile: customer?.customerMobile || '',
    gstinNumber: customer?.gstinNumber || '',
    // Address fields
    addressString1: customer?.customerAddress?.addressString1 || '',
    addressString2: customer?.customerAddress?.addressString2 || '',
    // City selection
    cityId: customer?.customerAddress?.city?.cityId || '',
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      setLoadingCities(true);
      const cities = await apiService.getAllCities();
      setAvailableCities(Array.isArray(cities) ? cities : []);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setAvailableCities([]);
      setErrors({ cities: 'Failed to load cities. Please try again.' });
    } finally {
      setLoadingCities(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData.customerMobile.trim()) {
      newErrors.customerMobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.customerMobile)) {
      newErrors.customerMobile = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.gstinNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstinNumber)) {
      newErrors.gstinNumber = 'Please enter a valid GSTIN number';
    }

    if (!formData.addressString1.trim()) {
      newErrors.addressString1 = 'Address line 1 is required';
    }

    if (!formData.cityId) {
      newErrors.cityId = 'Please select a city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Structure the data according to your API format
      const submitData = {
        customerName: formData.customerName,
        customerMobile: formData.customerMobile,
        gstinNumber: formData.gstinNumber,
        customerAddress: {
          addressString1: formData.addressString1,
          addressString2: formData.addressString2,
          city: {
            cityId: parseInt(formData.cityId) // Send only cityId
          }
        }
      };

      if (customer && !viewMode) {
        // Include IDs for update
        submitData.customerId = customer.customerId;
        if (customer.customerAddress) {
          submitData.customerAddress.addressId = customer.customerAddress.addressId;
        }
        await apiService.updateCustomer(customer.customerId, submitData);
      } else if (!viewMode) {
        await apiService.addCustomer(submitData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving customer:', error);
      setErrors({ submit: 'Failed to save customer. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Get selected city details for display
  const getSelectedCityDetails = () => {
    if (!formData.cityId) return null;
    return availableCities.find(city => city.cityId === parseInt(formData.cityId));
  };

  const selectedCity = getSelectedCityDetails();

  if (viewMode) {
    return (
      <div className="customer-view">
        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Customer ID</label>
              <div className="view-value">{customer?.customerId || 'N/A'}</div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>Customer Name</label>
              <div className="view-value customer-name">{customer?.customerName || 'N/A'}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="view-field">
              <label>Mobile Number</label>
              <div className="view-value phone">
                <a href={`tel:${customer?.customerMobile}`}>
                  <i className="fas fa-phone me-2"></i>
                  {customer?.customerMobile || 'N/A'}
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="view-field">
              <label>GSTIN Number</label>
              <div className="view-value gstin">
                {customer?.gstinNumber || 'Not provided'}
              </div>
            </div>
          </div>
        </div>

        <div className="address-section">
          <h5 className="section-title">
            <i className="fas fa-map-marker-alt me-2"></i>
            Address Information
          </h5>
          
          <div className="view-field">
            <label>Address Line 1</label>
            <div className="view-value">
              {customer?.customerAddress?.addressString1 || 'Not provided'}
            </div>
          </div>

          {customer?.customerAddress?.addressString2 && (
            <div className="view-field">
              <label>Address Line 2</label>
              <div className="view-value">
                {customer.customerAddress.addressString2}
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-md-8">
              <div className="view-field">
                <label>City</label>
                <div className="view-value city-info">
                  <i className="fas fa-city me-2"></i>
                  {customer?.customerAddress?.city?.cityName || 'Not provided'}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="view-field">
                <label>PIN Code</label>
                <div className="view-value pin-code">
                  {customer?.customerAddress?.city?.cityPinCode || 'Not provided'}
                </div>
              </div>
            </div>
          </div>

          {customer?.customerAddress?.city?.cityDescription && (
            <div className="view-field">
              <label>City Description</label>
              <div className="view-value city-description">
                {customer.customerAddress.city.cityDescription}
              </div>
            </div>
          )}

          <div className="view-field">
            <label>Complete Address</label>
            <div className="view-value complete-address">
              <i className="fas fa-location-arrow me-2"></i>
              {customer?.customerAddress ? 
                `${customer.customerAddress.addressString1 || ''}, ${customer.customerAddress.addressString2 || ''}, ${customer.customerAddress.city?.cityName || ''} - ${customer.customerAddress.city?.cityPinCode || ''}`.replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '') 
                : 'No address provided'
              }
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="customer-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.submit}
        </div>
      )}

      {errors.cities && (
        <div className="alert alert-warning" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.cities}
        </div>
      )}

      {/* Customer Basic Information */}
      <div className="form-section">
        <h5 className="section-title">
          <i className="fas fa-user me-2"></i>
          Customer Information
        </h5>

        <div className="row">
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Customer Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.customerName ? 'is-invalid' : ''}`}
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
              />
              {errors.customerName && (
                <div className="invalid-feedback">{errors.customerName}</div>
              )}
            </div>
          </div>
          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="customerMobile" className="form-label">
                Mobile Number <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                className={`form-control ${errors.customerMobile ? 'is-invalid' : ''}`}
                id="customerMobile"
                name="customerMobile"
                value={formData.customerMobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="10"
              />
              {errors.customerMobile && (
                <div className="invalid-feedback">{errors.customerMobile}</div>
              )}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="gstinNumber" className="form-label">
            GSTIN Number
          </label>
          <input
            type="text"
            className={`form-control ${errors.gstinNumber ? 'is-invalid' : ''}`}
            id="gstinNumber"
            name="gstinNumber"
            value={formData.gstinNumber}
            onChange={handleChange}
            placeholder="Enter GSTIN number (optional)"
            maxLength="15"
            style={{ textTransform: 'uppercase' }}
          />
          {errors.gstinNumber && (
            <div className="invalid-feedback">{errors.gstinNumber}</div>
          )}
          <div className="form-text">
            Format: 22AAAAA0000A1Z5 (15 characters)
          </div>
        </div>
      </div>

      {/* Address Information */}
      <div className="form-section">
        <h5 className="section-title">
          <i className="fas fa-map-marker-alt me-2"></i>
          Address Information
        </h5>

        <div className="mb-3">
          <label htmlFor="addressString1" className="form-label">
            Address Line 1 <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.addressString1 ? 'is-invalid' : ''}`}
            id="addressString1"
            name="addressString1"
            value={formData.addressString1}
            onChange={handleChange}
            placeholder="House/Flat no., Building name, Street"
          />
          {errors.addressString1 && (
            <div className="invalid-feedback">{errors.addressString1}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="addressString2" className="form-label">
            Address Line 2
          </label>
          <input
            type="text"
            className="form-control"
            id="addressString2"
            name="addressString2"
            value={formData.addressString2}
            onChange={handleChange}
            placeholder="Area, Landmark (optional)"
          />
        </div>

        {/* City Selection */}
        <div className="mb-3">
          <label htmlFor="cityId" className="form-label">
            Select City <span className="text-danger">*</span>
          </label>
          {loadingCities ? (
            <div className="form-control d-flex align-items-center">
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Loading cities...
            </div>
          ) : (
            <select
              className={`form-select ${errors.cityId ? 'is-invalid' : ''}`}
              id="cityId"
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
            >
              <option value="">Choose a city...</option>
              {availableCities.map(city => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName} - {city.cityPinCode}
                </option>
              ))}
            </select>
          )}
          {errors.cityId && (
            <div className="invalid-feedback">{errors.cityId}</div>
          )}
          <div className="form-text">
            Select the city from the available options
          </div>
        </div>

        {/* Selected City Preview */}
        {selectedCity && (
          <div className="selected-city-preview">
            <h6 className="preview-title">
              <i className="fas fa-eye me-2"></i>
              Selected City Details
            </h6>
            <div className="city-preview-card">
              <div className="city-preview-header">
                <i className="fas fa-city me-2"></i>
                {selectedCity.cityName}
              </div>
              <div className="city-preview-body">
                <div className="city-detail-row">
                  <span className="label">PIN Code:</span>
                  <span className="value">{selectedCity.cityPinCode}</span>
                </div>
                <div className="city-detail-row">
                  <span className="label">Description:</span>
                  <span className="value description">{selectedCity.cityDescription}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={loading || loadingCities}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              {customer ? 'Update Customer' : 'Create Customer'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
