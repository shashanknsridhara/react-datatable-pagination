import React, { Component } from 'react';
import DataTable from './DataTable.jsx';

class App extends Component {
  render() {
    return (
        <DataTable  obj = {this.props.arrayOfObjects} dataInOnePage = {this.props.dataInOnePage} />
    );
  }
}

export default App;
