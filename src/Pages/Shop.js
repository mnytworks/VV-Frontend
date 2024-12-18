// This is the Shop Page / All Products Page - users can view, search for, and filter products here.

import React, { Component } from "react";
import "../App.css";
import { Container } from "react-bootstrap";
import ProductsComp from "../components/products";
import Axios from "axios";

class Shop extends Component {
  state = {
    products: [],
    searchterm: '',
    gender: "A",
    color: "A",
  };

  editSearchTerm = async (e) => {
    await this.setState({ searchterm: e.target.value });
    console.log(this.state.searchterm);

    Axios({
      method: "GET",
      withCredentials: true,
      url: `https://vv-backend-eud6.onrender.com/productsearch/${this.state.searchterm}`,
    }).then((res) => {
      this.setState({ products: res.data });
      console.log(res.data);
    });
  };

  handleGenderChange = async (e) => {
    await this.setState({ gender: e.target.value });
    console.log(this.state.gender);

    if (this.state.gender === "A") {
      // Fetch all products if 'All' is selected
      this.fetchAllProducts();
    } else {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `https://vv-backend-eud6.onrender.com/productsearchbygender/${this.state.gender}`,
      }).then((res) => {
        this.setState({ products: res.data });
        console.log(res.data);
      });
    }
  };

  handleColorChange = async (e) => {
    await this.setState({ color: e.target.value });
    console.log(this.state.color);

    if (this.state.color === "A") {
      // Fetch all products if 'All' is selected
      this.fetchAllProducts();
    } else {
      Axios({
        method: "GET",
        withCredentials: true,
        url: `https://vv-backend-eud6.onrender.com/productsearchbycolor/${this.state.color}`,
      }).then((res) => {
        this.setState({ products: res.data });
        console.log(res.data);
      });
    }
  };

  fetchAllProducts = () => {
    // Fetch all products from the server
    fetch("https://vv-backend-eud6.onrender.com/getproducts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ products: data });
        console.log(data);
      })
      .catch(console.log);
  };

  componentDidMount() {
    this.fetchAllProducts();
  }

  render() {
    return (
      <div>
        <center>
          <div className="search-bar">
            <input
              type="text"
              className="search"
              value={this.state.searchterm}
              onChange={this.editSearchTerm}
              placeholder="Search for a product..."
            />
            <img
              className="search-icon"
              src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
              alt="search"
            />
          </div>

          <h1 style={{ fontSize: "3rem", marginTop: "3%" }}>View Products</h1>

          <label>
            Gender: &nbsp;
            <select value={this.state.gender} onChange={this.handleGenderChange}>
              <option value="A">All</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="U">Unisex</option>
            </select>
          </label>

          <label>
            Color: &nbsp;
            <select value={this.state.color} onChange={this.handleColorChange}>
              <option value="A">All</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Orange">Orange</option>
              <option value="Grey">Grey</option>
              <option valuue="Brown">Brown</option>
              <option value="Blue">Blue</option>
            </select>
          </label>
        </center>

        <div className="container" style={{ marginBottom: "5%" }}>
          <Container id="content">
            <ProductsComp products={this.state.products} />
          </Container>
        </div>
      </div>
    );
  }
}

export default Shop;
