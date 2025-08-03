import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';

const AddressForm = ({ address, onSave, onCancel, viewMode = false }) => {
  const [formData, setFormData] = useState({
    addressString1: address?.addressString1 || '',
    addressString2: address?.addressString2 || '',
    // City selection
    selectedCityId: address?.city?.cityId || '',
    // City details for new city
    cityName: address?.city?.cityName || '',
    cityPinCode: address?.city?.cityPinCode || '',
    cityDescription: address?.city?.cityDescription || '',
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCities, setLoadingCities] = useState(true);
  const [errors, setErrors] = useState({});
  const [isNewCity, setIsNewCity] = useState(false);

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

  const handleCitySelection = (e) => {
    const cityId = e.target.value;
    
    if (cityId === 'new') {
      setIsNewCity(true);
      setFormData(prev => ({
        ...prev,
        selectedCityId: '',
        cityName: '',
        cityPinCode: '',
        cityDescription: ''
      }));
    } else if (cityId) {
      const selectedCity = availableCities.find(city => city.cityId === parseInt(cityId));
      setIsNewCity(false);
      setFormData(prev => ({
        ...prev,
        selectedCityId: cityId,
        cityName: selectedCity?.cityName || '',
        cityPinCode: selectedCity?.cityPinCode || '',
        cityDescription: selectedCity?.cityDescription || ''
      }));
    } else {
      setIsNewCity(false);
      setFormData(prev => ({
        ...prev,
        selectedCityId: '',
        cityName: '',
        cityPinCode: '',
        cityDescription: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.addressString1.trim()) {
      newErrors.addressString1 = 'Address line 1 is required';
    }

    if (!formData.selectedCityId && !isNewCity) {
      newErrors.city = 'Please select a city or choose to add new city';
    }

    if (isNewCity) {
      if (!formData.cityName.trim()) {
        newErrors.cityName = 'City name is required';
      }
      if (!formData.cityPinCode.trim()) {
        newErrors.cityPinCode = 'PIN code is required';
      } else if (!/^\d{6}$/.test(formData.cityPinCode)) {
        newErrors.cityPinCode = 'PIN code must be 6 digits';
      }
      if (!formData.cityDescription.trim()) {
        newErrors.cityDescription = 'City description is required';
      }
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
      let cityData;

      if (isNewCity) {
        // Create new city first
        cityData = {
          cityName: formData.cityName.trim(),
          cityPinCode: formData.cityPinCode.trim(),
          cityDescription: formData.cityDescription.trim()
        };
        const newCity = await apiService.addCity(cityData);
        cityData = newCity;
      } else {
        // Use existing city
        cityData = availableCities.find(city => city.cityId === parseInt(formData.selectedCityId));
      }

      const submitData = {
        addressString1: formData.addressString1.trim(),
        addressString2: formData.addressString2.trim(),
        city: cityData
      };

      if (address && !viewMode) {
        submitData.addressId = address.addressId;
        await apiService.updateAddress(submitData);
      } else if (!viewMode) {
        await apiService.addAddress(submitData);
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving address:', error);
      setErrors({ submit: 'Failed to save address. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (viewMode) {
    return (
      <div className="address-view">
        <div className="view-field">
          <label>Address ID</label>
          <div className="view-value address-id">{address?.addressId || 'N/A'}</div>
        </div>

        <div className="address-section">
          <h5 className="section-title">
            <i className="fas fa-home me-2"></i>
            Address Information
          </h5>
          
          <div className="view-field">
            <label>Address Line 1</label>
            <div className="view-value address-line">
              <i className="fas fa-map-marker-alt me-2"></i>
              {address?.addressString1 || 'N/A'}
            </div>
          </div>

          {address?.addressString2 && (
            <div className="view-field">
              <label>Address Line 2</label>
              <div className="view-value address-line">
                <i className="fas fa-location-arrow me-2"></i>
                {address.addressString2}
              </div>
            </div>
          )}
        </div>

        <div className="city-section">
          <h5 className="section-title">
            <i className="fas fa-city me-2"></i>
            City Information
          </h5>

          <div className="row">
            <div className="col-md-6">
              <div className="view-field">
                <label>City ID</label>
                <div className="view-value city-id">{address?.city?.cityId || 'N/A'}</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="view-field">
                <label>City Name</label>
                <div className="view-value city-name">
                  <i className="fas fa-city me-2"></i>
                  {address?.city?.cityName || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="view-field">
                <label>PIN Code</label>
                <div className="view-value pin-code">
                  <i className="fas fa-map-pin me-2"></i>
                  {address?.city?.cityPinCode || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          <div className="view-field">
            <label>City Description</label>
            <div className="view-value city-description">
              <i className="fas fa-info-circle me-2"></i>
              {address?.city?.cityDescription || 'No description available'}
            </div>
          </div>
        </div>

        <div className="view-field">
          <label>Complete Address</label>
          <div className="view-value complete-address">
            <div className="complete-address-card">
              <div className="address-header">
                <i className="fas fa-location-dot me-2"></i>
                Complete Address
              </div>
              <div className="address-body">
                <div className="address-line-item">{address?.addressString1}</div>
                {address?.addressString2 && (
                  <div className="address-line-item secondary">{address.addressString2}</div>
                )}
                <div className="city-line-item">
                  <span className="city-part">{address?.city?.cityName}</span>
                  <span className="pin-part">- {address?.city?.cityPinCode}</span>
                </div>
              </div>
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
    <form onSubmit={handleSubmit} className="address-form">
      {errors.submit && (
        <div className="alert alert-danger" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {errors.submit}
        </div>
      )}

      {/* Address Information */}
      <div className="form-section">
        <h5 className="section-title">
          <i className="fas fa-home me-2"></i>
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
      </div>

      {/* City Information */}
      <div className="form-section">
        <h5 className="section-title">
          <i className="fas fa-city me-2"></i>
          City Information
        </h5>

        <div className="mb-3">
          <label htmlFor="citySelection" className="form-label">
            Select City <span className="text-danger">*</span>
          </label>
          {loadingCities ? (
            <div className="form-control d-flex align-items-center">
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Loading cities...
            </div>
          ) : (
            <select
              className={`form-select ${errors.city ? 'is-invalid' : ''}`}
              id="citySelection"
              value={isNewCity ? 'new' : formData.selectedCityId}
              onChange={handleCitySelection}
            >
              <option value="">Select a city</option>
              {availableCities.map(city => (
                <option key={city.cityId} value={city.cityId}>
                  {city.cityName} - {city.cityPinCode}
                </option>
              ))}
              <option value="new">+ Add New City</option>
            </select>
          )}
          {errors.city && (
            <div className="invalid-feedback">{errors.city}</div>
          )}
        </div>

        {isNewCity && (
          <div className="new-city-section">
            <h6 className="new-city-title">
              <i className="fas fa-plus-circle me-2"></i>
              New City Details
            </h6>
            
            <div className="row">
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="cityName" className="form-label">
                    City Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cityName ? 'is-invalid' : ''}`}
                    id="cityName"
                    name="cityName"
                    value={formData.cityName}
                    onChange={handleChange}
                    placeholder="Enter city name"
                  />
                  {errors.cityName && (
                    <div className="invalid-feedback">{errors.cityName}</div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label htmlFor="cityPinCode" className="form-label">
                    PIN Code <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.cityPinCode ? 'is-invalid' : ''}`}
                    id="cityPinCode"
                    name="cityPinCode"
                    value={formData.cityPinCode}
                    onChange={handleChange}
                    placeholder="Enter PIN code"
                    maxLength="6"
                  />
                  {errors.cityPinCode && (
                    <div className="invalid-feedback">{errors.cityPinCode}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="cityDescription" className="form-label">
                City Description <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.cityDescription ? 'is-invalid' : ''}`}
                id="cityDescription"
                name="cityDescription"
                value={formData.cityDescription}
                onChange={handleChange}
                rows="2"
                placeholder="Enter city description"
              />
              {errors.cityDescription && (
                <div className="invalid-feedback">{errors.cityDescription}</div>
              )}
            </div>
          </div>
        )}

        {/* Display selected city info */}
        {!isNewCity && formData.selectedCityId && (
          <div className="selected-city-info">
            <h6 className="selected-city-title">
              <i className="fas fa-check-circle me-2"></i>
              Selected City
            </h6>
            <div className="city-info-card">
              <div className="city-info-header">
                <i className="fas fa-city me-2"></i>
                {formData.cityName}
              </div>
              <div className="city-info-body">
                <div className="city-detail">
                  <span className="label">PIN Code:</span>
                  <span className="value">{formData.cityPinCode}</span>
                </div>
                <div className="city-detail">
                  <span className="label">Description:</span>
                  <span className="value description">{formData.cityDescription}</span>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Saving...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              {address ? 'Update Address' : 'Create Address'}
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
