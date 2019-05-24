# react-datatable-pagination

**A ReactJS component to render a Data-table with Pagination.**

By installing this component you can render a customized data-table just by passing an array of objects. The component is complemented with additional features - Pagination and Export as CSV. 

![datatable](https://github.allstate.com/storage/user/6583/files/dd74c400-7e3e-11e9-859b-8dcdd06f0295)

## Installation

Install `react-datatable-pagination` with [npm](https://www.npmjs.com/):

```
$ npm install react-datatable-pagination --save
```
## Usage

Very easy to use. Just provide props with an array of objects by adding the content to be displayed in the data-table and a number which tells how many records needs to be displayed in one page.

**Note: Construct the array such that the key in each object should be the column name and value should be the corresponding data of that column.**

```js
import React, {Component} from 'react';
import ReactDOM from "react-dom";
import ReactDataTablePagination from 'react-datatable-pagination'


class App extends Component() {
    
    render(){
        const arrayOfObjects =  [
           {
                "Name": 'Jon Snow',
                "Position": 'Lord Commander',
                "Office": 'Castle Black',
                "Age": '28',
                "Date": '2011/04/25',
                "Skill": 'Knows Nothing'
                },
                {
                "Name": 'Bran, The Broken',
                "Position": 'King of 6 kingdoms',
                "Office": 'Capital',
                "Age": '18',
                "Date": '2011/07/25',
                "Skill": 'Knows Everything'
                }
        ];
    return (
            <div>     
                <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
```


## Props

Name | Type  | Description
--- | --- |  --- |
`arrayOfObjects` | array | **Required.** Content to be displayed in the data-table
`dataInOnePage` | Number | **Required.** The number of records displayed in one page
                     

## Contribute

1. [Submit an issue]()
2. Fork the repository
3. Create a dedicated branch (never ever work in `master`)
4. The first time, run command: `webpack` into the directory
5. Run `npm start`
6. Fix bugs or implement features