import React, {Component}  from 'react';
import Pagination from './Pagination.jsx';

class DataTable extends Component{

    constructor(props){
        super(props);

        this.state = {
            currPage : 1
        };
        this.displayData = this.displayData.bind(this);
        this.exportAdvancedResult = this.exportAdvancedResult.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
    }

    
  exportAdvancedResult() {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data, csv, link;
    let fileName;
    let args = {
      data: this.props.obj
    };
    data = args.data || null;
    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = args.columnDelimiter || ",";
    lineDelimiter = args.lineDelimiter || "\n";

    keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.map(item => {
      ctr = 0;
      keys.map(key => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    if (result == null) return;

    fileName = "reports.csv";

    if (!result.match(/^data:text\/csv/i)) {
      result = "data:text/csv;charset=utf-8," + result;
    }

    csv = encodeURI(result);
    link = document.createElement("a");
    link.setAttribute("href", csv);
    link.setAttribute("download", fileName);
    link.click();
  }

    displayData(){
        const { currPage} = this.state;
        const indexOfLastResult = currPage * this.props.dataInOnePage;
        const indexOfFirstResult = indexOfLastResult - this.props.dataInOnePage;
        if (this.props.obj.length) {
             const currentResults = this.props.obj.slice(
                    indexOfFirstResult, indexOfLastResult
        );
        let headings = Object.keys(this.props.obj[0]);
         let data = currentResults.map((result, index) => {
              return( 
                <tr key={index}>
                  {headings.map((heading, ind) =>{
                return (
                
                    <td style={{
                                width: "6%",
                                fontSize: "14px",
                                verticalAlign: "middle"}}
                        key={ind}
                                >
                            {result[heading]}
                    </td>        
                );
            })}
                </tr> 
        )
         })
        return data;
    }
    }
    
    onPageChanged(changedPage){
        this.setState({
            currPage : changedPage
        });
    }


    render(){
        let headings = Object.keys(this.props.obj[0]);
        return(
            <div align="center">
                <div className="content" style={{paddingRight: "10%"}}>
                    <div style={{width:"80%", float:"left", padding: "10px"}}>
                        <div className="infoData" style={{float: "left",display: "inline-block",paddingLeft: "15%"}}>
                        {this.state.currPage}/{Math.ceil(this.props.obj.length/this.props.dataInOnePage)} Page(s) ({this.props.obj.length} Records)
                        </div>

                        <div className="exportCSV" style={{ float: "right",marginRight: "-10%"}}>
                        <button
                            onClick={this.exportAdvancedResult}>
                            Export as CSV
                        </button>
                        </div>

                    </div>

                    <div style={{width:"80%"}}>
                        <table>
                        <tbody>
                        <tr>
                            {headings.map((key, index) =>{
                                return(
                                    <th
                                        style={{
                                        width: "6%",
                                        fontWeight: "bold",
                                        fontSize: "14px",
                                        verticalAlign: "middle"                                       
                                    }}
                                    key={index}
                                >
                                    {key}
                                    </th>
                                    );
                                })
                            }               
                            </tr>

                            {this.displayData()}
                            </tbody>
                        </table>
                    </div>
         
                
            {this.props.obj.length > this.props.dataInOnePage?
            <div style={{    
                width: "80%",
                float: "left",
                paddingLeft: "35%",
                paddingTop: "10px",
                paddingBottom: "20px"}}>
                <Pagination onPageChanged = {this.onPageChanged} 
                            presentPage =  {this.state.currPage} 
                            data = {this.props.obj} 
                            dataInOnePage = {this.props.dataInOnePage} 
                            pageNeighbours = {1}
                />
            </div>
            :null}
            </div>
        </div>
        );
    }
};

export default DataTable;
