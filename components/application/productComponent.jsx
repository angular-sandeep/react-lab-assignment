import React, { Component } from "react";

class ProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductId: 0,
      ProductName: "",
      Price: 0,
      Manufacturer: "",
      CategoryName: "",

      Products: [
        {
          ProductId: 101,
          ProductName: "Mobile",
          CategoryName: "Electronics",
          Manufacturer: "Apple",
          Price: 75000
        },
        {
          ProductId: 102,
          ProductName: "Pizza",
          CategoryName: "Food",
          Manufacturer: "Domino",
          Price: 750
        }
      ],
      Categories: ["Electrical", "Electronics", "Food"],
      Manufacturers: ["AB Teach", "CD Power", "EF Beverages"]
    };
  }

  // e is an event-payload raised on target element
  // we can read the paylaod data using 'e'
  onChangeProductId(e) {
    this.setState({
      ProductId: e.target.value
    });
  }
  onChangeProductName(e) {
    this.setState({
      ProductName: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      Price: e.target.value
    });
  }
  onChangeCategoryName(e) {
    this.setState({
      CategoryName: e.target.value
    });
  }
  onChangeManufacturer(e) {
    this.setState({
      Manufacturer: e.target.value
    });
  }

  onClickClear(e) {
    this.setState({
      ProductId: 0,
      ProductName: "",
      Price: 0,
      CategoryName: "",
      Manufacturer: ""
    });
  }

  getSelectedProduct(e) {
    this.setState({
      ProductId: e.ProductId,
      ProductName: e.ProductName,
      Price: e.Price,
      CategoryName: e.CategoryName,
      Manufacturer: e.Manufacturer
    });
  }

  onClickSave(e) {
    // alert(
    //   `${this.state.ProductId} ${this.state.ProductName}
    //   ${this.state.Price} ${this.state.CategoryName}  ${
    //     this.state.Manufacturer
    //   }`
    // );

    //1. get the copy of the Products array using slice()
    let tempArray = this.state.Products.slice();

    //2. push the new record into the temparray
    tempArray.push({
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    });

    // 3. copy the temparray into Products array
    this.setState({ Products: tempArray });
  }
  render() {
    return (
      <div className="container bg-light col-md-7">
        <h1 className="text-center text-info">Product Info Page</h1>
        <hr />
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductId}
            onChange={this.onChangeProductId.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductName}
            onChange={this.onChangeProductName.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            className="form-control"
            value={this.state.Price}
            onChange={this.onChangePrice.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            type="text"
            className="form-control"
            value={this.state.CategoryName}
            onChange={this.onChangeCategoryName.bind(this)}
          >
            {this.state.Categories.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Manufacture">Manufacture</label>
          <select
            type="text"
            className="form-control"
            value={this.state.Manufacturer}
            onChange={this.onChangeManufacturer.bind(this)}
          >
            {this.state.Manufacturers.map((c, i) => (
              <Options key={i} data={c} />
            ))}
          </select>
        </div>

        <div className="form-group">
          <table>
            <thead />
            <tbody>
              <tr>
                <td>
                  <input
                    type="button"
                    value="New"
                    className="btn btn-primary"
                    onClick={this.onClickClear.bind(this)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Save"
                    className="btn btn-success"
                    onClick={this.onClickSave.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="container">
          <table className="table table-bordered table-stripted">
            <thead>
              <tr>
                {Object.keys(this.state.Products[0]).map((h,i) => {
                  <th>{h}</th>
                })}
                {/* <th>Product Id</th>
                <th>Product Name</th>
                <th>Category Name</th>
                <th>Manufacture</th>
                <th>Price</th> */}
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((prd, idx) => (
                <TableRow
                  key={idx}
                  row={prd}
                  selected={this.getSelectedProduct.bind(this)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

// component that will render <option>
class Options extends Component {
  render() {
    return <option value={this.props.data}>{this.props.data}</option>;
  }
}

class TableHeader extends Component {
  render() { 
    return ( 
      <th>{this.props.header}</th>
     );
  }
}
 

class TableRow extends Component {
  constructor(props) {
    super(props);
  }
  onRowClick() {
    // a "selected" method is used to pass received data
    this.props.selected(this.props.row);
  }
  render() {
    return (
      <tr onClick={this.onRowClick.bind(this)}>
        <td>{this.props.row.ProductId}</td>
        <td>{this.props.row.ProductName}</td>
        <td>{this.props.row.CategoryName}</td>
        <td>{this.props.row.Manufacturer}</td>
        <td>{this.props.row.Price}</td>
      </tr>
    );
  }
}

export default ProductComponent;
