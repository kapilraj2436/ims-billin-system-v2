import React, { useState } from 'react';
import './DataTable.css';

const DataTable = ({ 
  data = [], 
  columns = [], 
  onEdit, 
  onDelete, 
  onView,
  searchable = true,
  sortable = true,
  pagination = true,
  pageSize = 10,
  maxVisibleRows = 25 // New prop to control visible rows before scrolling
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search term
  const filteredData = data.filter(item =>
    columns.some(column => {
      const value = column.accessor ? 
        item[column.accessor] : 
        column.render ? column.render(item) : '';
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    })
  );

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = pagination ? 
    sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize) : 
    sortedData;

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    if (!sortable) return;
    
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (!sortConfig.key || sortConfig.key !== key) {
      return <i className="fas fa-sort text-muted"></i>;
    }
    return sortConfig.direction === 'asc' ? 
      <i className="fas fa-sort-up text-primary"></i> : 
      <i className="fas fa-sort-down text-primary"></i>;
  };

  // Calculate dynamic table height based on number of visible rows
  const calculateTableHeight = () => {
    const rowHeight = 60; // Approximate height per row including padding
    const headerHeight = 80; // Header height
    const currentDataLength = paginatedData.length;
    
    // If current data is less than maxVisibleRows, don't set height constraint
    if (currentDataLength <= maxVisibleRows) {
      return 'auto';
    }
    
    // Calculate height for maxVisibleRows + header
    const calculatedHeight = (maxVisibleRows * rowHeight) + headerHeight;
    return `${calculatedHeight}px`;
  };

  const tableContainerStyle = {
    maxHeight: calculateTableHeight(),
    overflowY: calculateTableHeight() === 'auto' ? 'visible' : 'auto'
  };

  if (data.length === 0) {
    return (
      <div className="empty-state">
        <i className="fas fa-inbox"></i>
        <h3>No Data Available</h3>
        <p>There are no records to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      {searchable && (
        <div className="table-controls mb-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6 text-end">
              <span className="text-muted">
                Showing {paginatedData.length} of {sortedData.length} records
                {paginatedData.length > maxVisibleRows && (
                  <span className="ms-2">
                    <i className="fas fa-info-circle"></i> Scroll to see more
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive" style={tableContainerStyle}>
        <table className="table table-hover">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  onClick={() => column.accessor && handleSort(column.accessor)}
                  className={sortable && column.accessor ? 'sortable' : ''}
                  style={{ width: column.width }}
                >
                  <div className="th-content">
                    {column.header}
                    {sortable && column.accessor && (
                      <span className="sort-icon ms-2">
                        {getSortIcon(column.accessor)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="text-center" style={{ width: '120px' }}>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>
                    {column.render ? 
                      column.render(item, rowIndex) : 
                      item[column.accessor]
                    }
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="text-center">
                    <div className="action-buttons">
                      {onView && (
                        <button
                          className="btn btn-sm btn-outline-info me-1"
                          onClick={() => onView(item)}
                          title="View"
                        >
                          <i className="fas fa-eye"></i>
                        </button>
                      )}
                      {onEdit && (
                        <button
                          className="btn btn-sm btn-outline-primary me-1"
                          onClick={() => onEdit(item)}
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => onDelete(item)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <nav className="table-pagination">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            </li>
            
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <li key={page} className="page-item disabled">
                    <span className="page-link">...</span>
                  </li>
                );
              }
              return null;
            })}
            
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default DataTable;
