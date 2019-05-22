import React from 'react';
import App from './App.jsx';

const ReactDataTablePagination = props=>{
    const {arrayOfObjects, dataInOnePage} =props;
    return(
        <App arrayOfObjects={arrayOfObjects} dataInOnePage={dataInOnePage}/>
    );
};
export default ReactDataTablePagination;