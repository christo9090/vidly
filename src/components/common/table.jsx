import React, { Component } from 'react';
import TableHeader from './tableHeader';
import TableBody from './tableBody';

class Table extends Component {
  render() {
    const { data, addLike, onDelete, sortColumn, onSort, columns } = this.props;

    return (
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          columns={columns}
          data={data}
          addLike={addLike}
          onDelete={onDelete}
        />
      </table>
    );
  }
}

export default Table;
