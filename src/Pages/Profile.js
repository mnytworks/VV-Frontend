import React, { Component } from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import ProfileComp from "../components/profileitems";
import Axios from "axios";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

class Profile extends Component {
  state = {
    address: "",
    name: "",
    mobile: "",
    orders: [],
    cart: [],
    wishlist: [],
    newmobile: "",
    newaddress: "",
  };

  componentDidMount() {
    this.fetchUserDetails();
    this.fetchCartItems();
    this.fetchWishlistItems();
    this.fetchOrderItems();
  }

  fetchUserDetails = async () => {
    try {
      const res = await Axios.get("https://vv-backend-eud6.onrender.com/user", {
        withCredentials: true,
      });
      this.setState({
        mobile: res.data.mobile,
        name: res.data.username,
        address: res.data.address,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized access! Please login again.");
        window.location.href = "/login"; // Redirect to login
      }
    }
  };

  fetchCartItems = async () => {
    try {
      const res = await Axios.get(
        "https://vv-backend-eud6.onrender.com/getcartitems",
        { withCredentials: true }
      );
      this.setState({ cart: res.data });
    } catch (error) {
      console.error("Error fetching cart items:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized access! Please login again.");
        window.location.href = "/login";
      }
    }
  };

  fetchWishlistItems = async () => {
    try {
      const res = await Axios.get(
        "https://vv-backend-eud6.onrender.com/getwishlistitems",
        { withCredentials: true }
      );
      this.setState({ wishlist: res.data });
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized access! Please login again.");
        window.location.href = "/login";
      }
    }
  };

  fetchOrderItems = async () => {
    try {
      const res = await Axios.get(
        "https://vv-backend-eud6.onrender.com/getorderitems",
        { withCredentials: true }
      );
      this.setState({ orders: res.data });
    } catch (error) {
      console.error("Error fetching order items:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized access! Please login again.");
        window.location.href = "/login";
      }
    }
  };

  logout = () => {
    Axios.get("https://vv-backend-eud6.onrender.com/logout", {
      withCredentials: true,
    })
      .then(() => {
        alert("You are logged out!");
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((error) => console.error("Error during logout:", error));
  };

  updateNum = () => {
    Axios.post(
      "https://vv-backend-eud6.onrender.com/update/number",
      { mobile: this.state.newmobile },
      { withCredentials: true }
    )
      .then(() => {
        alert("Mobile number updated successfully!");
        this.fetchUserDetails();
      })
      .catch((error) => console.error("Error updating mobile number:", error));
  };

  updateAdd = () => {
    Axios.post(
      "https://vv-backend-eud6.onrender.com/update/address",
      { address: this.state.newaddress },
      { withCredentials: true }
    )
      .then(() => {
        alert("Address updated successfully!");
        this.fetchUserDetails();
      })
      .catch((error) => console.error("Error updating address:", error));
  };

  handleNumChange = (e) => {
    this.setState({ newmobile: e.target.value });
  };

  handleAddChange = (e) => {
    this.setState({ newaddress: e.target.value });
  };

  render() {
    return (
      <div>
        <Image
          src="https://res.cloudinary.com/dzky4f4zb/image/upload/v1602847602/welcome_hhin5h.png"
          fluid
        />

        <h1 style={{ fontSize: "3rem", marginTop: "3%" }}>
          <b>Hello&nbsp;{this.state.name}</b>
        </h1>
        <h2>
          Great to see you! Here's your personal VirtualVogue dashboard, <br />
          where you can update your personal details and view the items in your
          cart, wishlist, and previous orders.
        </h2>

        <center>
          <button
            style={{ maxWidth: "10rem", padding: "0%", marginTop: "2%" }}
            onClick={this.logout}
          >
            Logout
          </button>
        </center>

        <center>
          <div className="user-info">
            <h1 style={{ fontSize: "2.5rem" }}>Your Information</h1>
            <br />
            <h3>
              <b>Registered Mobile number:</b> {this.state.mobile}
              <br />
              <b>Delivery Address:</b> {this.state.address}
            </h3>

            <h4 style={{ height: "4rem" }}>
              {" "}
              If you would like to update your number:{" "}
              <input type="text" onChange={this.handleNumChange} />
              <button onClick={this.updateNum}> Update Mobile </button>{" "}
            </h4>
            <h4>
              {" "}
              If you would like to update your address:{" "}
              <input type="text" onChange={this.handleAddChange} />
              <button onClick={this.updateAdd}> Update Address </button>{" "}
            </h4>
          </div>
        </center>

        <Container>
          <Row>
            <Col xs={12} md={8}>
              <ProfileComp products={this.state.cart} />
            </Col>

            <Col xs={6} md={4}>
              <ProfileComp products={this.state.wishlist} />
            </Col>
          </Row>
        </Container>

        <ProfileComp products={this.state.orders} />
      </div>
    );
  }
}

export default Profile;
