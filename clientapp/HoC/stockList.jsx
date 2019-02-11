import React, { Component } from "react";
import TableRowComponent from "./tableRowComponent.jsx";
import TableHeaderComponent from "./tableHeaderComponent.jsx";

class StockListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <table className="table table-border table-striped">
        {/* <tr>
            <td>Id</td>
            <td>Name</td>
          </tr> */}
        <tr>
          {Object.keys(this.props.data[0]).map((header, idx) => (
            <TableHeaderComponent header={header} key={idx} />
          ))}
        </tr>
        <tbody>
          {this.props.data.map((v, i) => (
            <TableRowComponent key={i} rec={v} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default StockListComponent;
