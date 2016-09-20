/* eslint max-len: 0 */
import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { Col, Panel } from 'react-bootstrap';

const products = [];

function addProducts(quantity) {
  const startId = products.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    products.push({
      id: id,
      name: 'Item name ' + id,
      price: 2100 + i
    });
  }
}

addProducts(5);

function customTableRowWrapper(component) {
  return class extends component {
    displayName = 'TableRowWrapper';
    render() {
      return (
        super.render()
      );
    }
  };
}

class Demo extends React.Component {
  render() {
    return (
      <Col md={ 8 } mdOffset={ 1 }>
        <Panel header={ 'Row wrapper for react-bootstrap-table' }>
          <BootstrapTable data={ products } tableRowWrapper={ customTableRowWrapper }>
            <TableHeaderColumn dataField='id' isKey={ true }>Product ID</TableHeaderColumn>
            <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
          </BootstrapTable>
        </Panel>
      </Col>
    );
  }
}

export default Demo;
