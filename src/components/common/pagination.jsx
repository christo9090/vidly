import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
  render() {
    const { itemNumber, pageSize, onPageChange, currentPage } = this.props;

    const pageArr = [];
    for (let i = 0; i < Math.ceil(itemNumber / pageSize); i++) {
      pageArr.push(i + 1);
    }

    if (pageArr.length === 1) return null;

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {pageArr.map(page => {
            return (
              <li
                className={
                  page === currentPage ? 'page-item active' : 'page-item'
                }
                key={page}
              >
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
