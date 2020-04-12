import React, { Component } from 'react';

class TableHeader extends Component {
  returnSortOrder(path) {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.currentSort === path) {
      sortColumn.currentSort = path;
      sortColumn.currentOrder =
        sortColumn.currentOrder === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn.currentSort = path;
      sortColumn.currentOrder = 'asc';
    }
    this.props.onSort(sortColumn);
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (!column.path) return null;
    if (column.path !== sortColumn.currentSort)
      return <i className="fa fa-sort" aria-hidden="true"></i>;
    if (sortColumn.currentOrder === 'asc')
      return <i className="fa fa-sort-asc" aria-hidden="true"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => {
            return (
              <th
                onClick={() => {
                  this.returnSortOrder(column.path);
                }}
                scope="col"
                style={{ cursor: 'pointer' }}
                key={column.label}
              >
                {column.label} {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
