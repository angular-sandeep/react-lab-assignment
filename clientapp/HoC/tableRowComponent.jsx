import React, { Component } from "react";

class TableRowComponent extends Component {
  render() {
    let key = Object.keys(this.props.rec);

    return (
      /* static */
      // <tr>
      //   <td>{this.props.rec.Id}</td>
      //   <td>{this.props.rec.Name}</td>
      //   <td>{this.props.rec.Location}</td>
      // </tr>

      /* Dynamic */
      <tr>
        {  key.map((v, i) => (
          <td key={i}>{this.props.rec[v]}</td>
        ))}
      </tr>
    );
  }
}

export default TableRowComponent;
