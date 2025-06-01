// Pagination.tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`dt-paging-button page-item ${currentPage === i ? 'active' : ''}`}>
          <button
            className="page-link"
            role="link"
            type="button"
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="row mx-3 justify-content-between">
      <div className="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto px-3 pe-md-0 mt-0">
        <div className="dt-info" aria-live="polite" role="status">
          Showing {startItem} to {endItem} of {totalItems} entries
        </div>
      </div>
      <div className="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto justify-content-md-between justify-content-center d-flex flex-wrap gap-sm-4 mb-sm-0 mb-6 mt-0 pe-md-3 ps-0">
        <div className="dt-paging">
          <nav aria-label="pagination">
            <ul className="pagination">
              <li className={`dt-paging-button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link previous"
                  role="link"
                  type="button"
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <i className="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>
                </button>
              </li>
              {renderPageNumbers()}
              <li className={`dt-paging-button page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link next"
                  role="link"
                  type="button"
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <i className="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;