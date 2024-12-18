// src/Pages/Product.js

import React, { Component } from "react";
import "../App.css";
import { Container } from "react-bootstrap";
import Axios from "axios";
import ProductComp from "../components/product";
import ReviewsComp from "../components/reviews";
import ARViewer from "../components/ARViewer"; // Import ARViewer component

class Product extends Component {
     state = {
          products: [],           // Product details
          newreview: "",          // New review content
          showARViewer: false,    // Control AR viewer visibility
          apiToken: "",           // API token from backend
     };

     componentDidMount() {
          this.fetchApiToken(); // Fetch API token on mount
          this.fetchProductData(); // Fetch product details on mount
     }

     // Fetch the API token from the backend
     fetchApiToken = async () => {
          try {
               const response = await fetch("https://vv-backend-eud6.onrender.com/api/token"); // Adjust URL as needed
               const data = await response.json();
               this.setState({ apiToken: data.apiToken });
               console.log("Fetched API Token:", data.apiToken); // For debugging
          } catch (error) {
               console.error("Error fetching API token:", error);
          }
     };

     // Fetch product details from backend
     fetchProductData = () => {
          let url = window.location.pathname;
          let prod_id = url.split("/")[2];

          fetch(`https://vv-backend-eud6.onrender.com/getproductbyid/${prod_id}`)
               .then((res) => res.json())
               .then((data) => {
                    console.log("Fetched Data:", data); // Log the API response
                    if (Array.isArray(data)) {
                         this.setState({ products: data }); // If it's an array, set it directly
                    } else if (data && typeof data === "object") {
                         this.setState({ products: [data] }); // Wrap single object in an array
                    } else {
                         console.error("Unexpected data format:", data);
                         this.setState({ products: [] }); // Set an empty array as fallback
                    }
               })
               .catch((error) => {
                    console.error("Error fetching product data:", error);
                    this.setState({ products: [] }); // Handle errors and set empty array
               });
     };


     handleSubmit = async (e) => {
          e.preventDefault();
          let url = window.location.pathname;
          let productId = url.split("/")[2];

          Axios({
               method: "POST",
               data: {
                    review: this.state.newreview,
                    productId: productId,
               },
               withCredentials: true,
               url: "https://vv-backend-eud6.onrender.com/addreview",
          }).then((res) => {
               console.log(res);
               window.location.reload(false);
               alert(res.data);
          });

          await this.fetchProductData(); // Refresh product details to include new review
     };

     handleARTryOn = () => {
          this.setState({ showARViewer: true }); // Show the AR viewer inline
     };

     render() {
          const addToCart = (cartProduct) => {
               Axios({
                    method: "POST",
                    data: {
                         productId: cartProduct,
                    },
                    withCredentials: true,
                    url: "https://vv-backend-eud6.onrender.com/addtocart",
               }).then((res) => {
                    console.log(res);
                    alert(res.data);
               });
          };

          const addToWishlist = (cartProduct) => {
               Axios({
                    method: "POST",
                    data: {
                         productId: cartProduct,
                    },
                    withCredentials: true,
                    url: "https://vv-backend-eud6.onrender.com/addtowishlist",
               }).then((res) => {
                    console.log(res);
                    alert(res.data);
               });
          };

          return (
               <div style={{ paddingBottom: "5%" }}>
                    <div className="product-container">
                         <div className="item-a">
                              <Container id="content">
                                   <ProductComp products={this.state.products} />
                              </Container>
                         </div>

                         <div className="item-b">
                              <Container id="content">
                                   {Array.isArray(this.state.products) && this.state.products.map((product) => (
                                        <li key={product._id}>
                                             <div className="product-name" style={{ fontSize: "4rem" }}>
                                                  {product.name}
                                             </div>
                                             <br />
                                             <div className="product-price" style={{ fontSize: "3rem" }}>
                                                  <p>₹{product.price}</p>
                                             </div>
                                             <br />
                                             <div
                                                  className="product-rating"
                                                  style={{ fontSize: "1.75rem", textAlign: "left" }}
                                             >
                                                  <p style={{ fontWeight: "600" }}>Product Description:</p>
                                                  {product.description}
                                             </div>
                                             <br />
                                             <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                                             <button onClick={() => addToWishlist(product._id)}>
                                                  Save for Later ({product.wishers ? product.wishers.length : 0})
                                             </button>
                                             <button onClick={this.handleARTryOn}>AR Try-On</button>
                                        </li>
                                   ))}

                              </Container>
                         </div>
                    </div>

                    {
                         this.state.showARViewer && Array.isArray(this.state.products) && this.state.products.map((product) => (

                              <div key={product._id} style={{ marginTop: "20px", textAlign: "center" }}>
                                   <h2>AR Try-On Viewer</h2>
                                   <ARViewer
                                        apiToken={this.state.apiToken}
                                        lensId={product.lensId}       // Use each product’s unique lens ID
                                        lensGroupId={product.lensGroupId} // Optional, if you use lens groups
                                   />
                              </div>
                         ))}

                    <div style={{ marginTop: "3%", width: "100%", padding: "0%" }}>
                         <h1>Product Reviews</h1>
                         <center>
                              <ReviewsComp products={this.state.products} />
                         </center>

                         <h1 style={{ marginTop: "3%" }}>Want to review this product?</h1>
                         <form onSubmit={this.handleSubmit}>
                              <label style={{ width: "50%" }}>
                                   <textarea
                                        value={this.state.newreview}
                                        onChange={this.handleChange}
                                        placeholder="Add your review here!"
                                   />
                                   <input className="review-btn" type="submit" value="Submit" />
                              </label>
                         </form>
                    </div>
               </div>
          );
     }
}

export default Product;
