class ProductService {
  getData() {
    let promise = fetch("http://localhost:3000/api/product");
    return promise;
  }

  postData(prd) {
    let promise = fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prd)
    });
    return promise;
  }

  updateData(id, prd) {
    let promise = fetch(`http://localhost:3000/api/product/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prd)
    });
    return promise;
  }

  deleteData(id) {
    let promise = fetch(`http://localhost:3000/api/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    return promise;
  }
}

export default ProductService;
