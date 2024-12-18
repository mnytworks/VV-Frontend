import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Axios from "axios";
import CartComp from "../components/cart";
import WishComp from "../components/wishlist";

class Cart extends Component {
  state = {
    products: [],
    wishlist: [],
  };

  componentDidMount() {
    this.fetchCartItems();
    this.fetchWishlistItems();
  }

  fetchCartItems = async () => {
    try {
      const res = await Axios.get("https://vv-backend-eud6.onrender.com/getcartitems", {
        withCredentials: true,
      });
      this.setState({ products: res.data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      alert("Failed to fetch cart items.");
    }
  };

  fetchWishlistItems = async () => {
    try {
      const res = await Axios.get("https://vv-backend-eud6.onrender.com/getwishlistitems", {
        withCredentials: true,
      });
      this.setState({ wishlist: res.data });
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      alert("Failed to fetch wishlist items.");
    }
  };

  moveToWishlist = async (productId) => {
    try {
      await Axios.post(
        "https://vv-backend-eud6.onrender.com/movetowishlist",
        { productId },
        { withCredentials: true }
      );
      this.fetchCartItems();
    } catch (error) {
      console.error("Error moving product to wishlist:", error);
    }
  };

  removeFromCart = async (productId) => {
    try {
      await Axios.post(
        "https://vv-backend-eud6.onrender.com/removefromcart",
        { productId },
        { withCredentials: true }
      );
      this.fetchCartItems();
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  moveToCart = async (productId) => {
    try {
      await Axios.post(
        "https://vv-backend-eud6.onrender.com/movetocart",
        { productId },
        { withCredentials: true }
      );
      this.fetchWishlistItems();
      this.fetchCartItems();
    } catch (error) {
      console.error("Error moving product to cart:", error);
    }
  };

  removeFromWishlist = async (productId) => {
    try {
      await Axios.post(
        "https://vv-backend-eud6.onrender.com/removefromwishlist",
        { productId },
        { withCredentials: true }
      );
      this.fetchWishlistItems();
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };

  // Single Product Purchase
  buyProduct = async (productId) => {
    const product = this.state.products.find((p) => p._id === productId);
    if (!product) return;

    try {
      const response = await Axios.post("https://vv-backend-eud6.onrender.com/create-checkout-session", {
        items: [{ name: product.name, price: product.price }],
      });

      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Failed to initiate payment.");
    }
  };

  // Buy All Products
  buyAllProducts = async () => {
    const lineItems = this.state.products.map((product) => ({
      name: product.name,
      price: product.price,
      quantity: 1,
    }));

    try {
      const response = await Axios.post("https://vv-backend-eud6.onrender.com/create-checkout-session", {
        items: lineItems,
      });

      window.location.href = response.data.url; // Redirect to Stripe Checkout
    } catch (error) {
      console.error("Error initiating payment for all products:", error);
      alert("Failed to process payment for all products.");
    }
  };

  render() {
    return (
      <div>
        <center>
          <h1 style={{ fontSize: "4rem", marginTop: "20px" }}>SHOPPING CART</h1>
        </center>

        <div className="container" style={{ marginTop: "20px" }}>
          <Container id="content">
            <CartComp
              products={this.state.products}
              moveToWishlist={this.moveToWishlist}
              removeFromCart={this.removeFromCart}
              buyProduct={this.buyProduct}
              buyAllProducts={this.buyAllProducts}
            />
          </Container>
        </div>

        <div className="container" style={{ marginTop: "40px" }}>
          <Container id="content">
            <WishComp
              products={this.state.wishlist}
              moveToCart={this.moveToCart}
              removeFromWishlist={this.removeFromWishlist}
            />
          </Container>
        </div>
      </div>
    );
  }
}

export default Cart;