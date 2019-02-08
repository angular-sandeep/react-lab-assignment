import React, { Component } from "react";
import ProductService from "./../../services/service.js";

class ProductUIComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductId: 0,
      ProductName: "",
      Price: 0,
      Manufacturer: "",
      CategoryName: "",
      sortFlag: true,
      reverseFlag: false,

      Products: [
        {
          ProductId: 0,
          ProductName: "",
          CategoryName: "",
          Manufacturer: "",
          Price: 0
        }
      ],
      Categories: ["Electrical", "Electronics", "Food"],
      Manufacturers: ["AB Teach", "CD Power", "EF Beverages"],
      SortBy: [
        "ProductId",
        "ProductName",
        "CategoryName",
        "Manufacturer",
        "Price"
      ]
    };

    this.serv = new ProductService();
  }

  // e is an event-payload raised on target element
  // we can read the paylaod data using 'e'
  onChangeProduct(e) {
    this.setState({
      [e.target.name]: e.target.value
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

  onClickDelete(e) {
    let id = e.ProductId;

    this.serv
      .deleteData(id)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp.data));
      })
      .catch(err => console.log(err.status));
  }

  onClickSave(e) {
    let prd = {
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: this.state.Price,
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    };

    this.serv
      .postData(prd)
      .then(res => res.json())
      .then(resp => {
        //console.log(JSON.stringify(resp.data));
        let temparray = this.state.Products.slice();
        temparray.push(resp.data);
        this.setState({ Products: temparray });
      })
      .catch(err => console.log(err.status));
  }

  onClickUpdate(e) {
    let prd = {
      ProductId: this.state.ProductId,
      ProductName: this.state.ProductName,
      Price: parseInt(this.state.Price),
      CategoryName: this.state.CategoryName,
      Manufacturer: this.state.Manufacturer
    };

    this.serv
      .updateData(this.state.ProductId, prd)
      .then(res => res.json())
      .then(resp => {
        console.log(JSON.stringify(resp.data));
        // let temparray = this.state.Products.slice();
        // temparray.push(resp.data);
        // this.setState({Products : temparray});
      })
      .catch(err => console.log(err.status));
  }

  // method will be executed immediately after the render() completes its job
  componentDidMount() {
    this.serv
      .getData()
      .then(data => data.json())
      .then(value => {
        //console.log(JSON.stringify(value.data));
        this.setState({ Products: value.data });
      })
      .catch(err => console.log(`error appeared ${err}`));
  }

  // reverse
  onReverse(e){
    let temp = this.state.Products;
    temp.reverse();
    this.setState({ Products: temp });
  }
  
  // sorting
  sortByType(e) {
    let type = e.target.value;
    let temp = this.state.Products;

    temp.sort(function(a,b)  {
      if(typeof a[type] == 'string' && a[type] != undefined){
         return a[type].toLowerCase().localeCompare(b[type].toLowerCase());
      }
      else{
        return a[type] - b[type];
      }
    })
    this.setState({ Products: temp });
  }

  render() {
    return (
      <div className="container bg-light">
        <h1 className="text-center text-info">Product Info Page</h1>
        <hr />
        <div className="form-group">
          <label htmlFor="ProductId">ProductId</label>
          <input
            type="text"
            className="form-control"
            value={this.state.ProductId}
            name="ProductId"
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ProductName">ProductName</label>
          <input
            type="text"
            className="form-control"
            name="ProductName"
            value={this.state.ProductName}
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Price">Price</label>
          <input
            type="text"
            className="form-control"
            name="Price"
            value={this.state.Price}
            onChange={this.onChangeProduct.bind(this)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="CategoryName">CategoryName</label>
          <select
            type="text"
            className="form-control"
            name="CategoryName"
            value={this.state.CategoryName}
            onChange={this.onChangeProduct.bind(this)}
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
            name="Manufacturer"
            value={this.state.Manufacturer}
            onChange={this.onChangeProduct.bind(this)}
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
                <td>
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-warning"
                    onClick={this.onClickUpdate.bind(this)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <hr />

        {/* sorting code */}
        <div className="container">
          <div className="form-group">
            <label htmlFor="SortBy">Sort By</label>
            <select
              type="text"
              className="form-control"
              name="sortBy"
              value={this.state.sortBy}
              onClick={this.sortByType.bind(this)}
            >
              {this.state.SortBy.map((c, i) => (
                <Options key={i} data={c} />
              ))}
            </select>
          </div>
          <div className="form-group">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="sort"
                value="sort"
                onClick={this.sortByType.bind(this)}
              />
              <label className="form-check-label" htmlFor="sort">
                Sort
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                id="reverse"
                value="reverse"
                onClick={this.onReverse.bind(this)}
              />
              <label className="form-check-label" htmlFor="reverse">
                Reverse
              </label>
            </div>
          </div>
          <hr />
        </div>

        <div className="container">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                {
                  Object.keys(this.state.Products[0]).map((header, idx) => (
                  <TableHeader key={idx} header={header} />
                ))}
              </tr>
            </thead>
            <tbody>
              {this.state.Products.map((prd, idx) => (
                <TableRow
                  key={idx}
                  row={prd}
                  selected={this.getSelectedProduct.bind(this)}
                  deleted={this.onClickDelete.bind(this)}
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

// component that will render table heading
class TableHeader extends Component {
  render() {
    if(this.props.header != "_id"){
        return <th>{this.props.header}</th>;
    }
    else {
      return null;
    }
  }
}

// component that will render row selected info into form
class TableRow extends Component {
  constructor(props) {
    super(props);
  }
  onRowClick() {
    // a "selected" method is used to pass received data
    this.props.selected(this.props.row);
  }
  onRowDelete() {
    // a "selected" method is used to pass received data
    this.props.deleted(this.props.row);
  }
  render() {
    return (
      <tr onClick={this.onRowClick.bind(this)}>
        <td>{this.props.row.ProductId}</td>
        <td>{this.props.row.ProductName}</td>
        <td>{this.props.row.CategoryName}</td>
        <td>{this.props.row.Manufacturer}</td>
        <td>{this.props.row.Price}</td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.onRowDelete.bind(this)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductUIComponent;
