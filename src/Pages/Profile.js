// This is the Profile Page - users can view their account details and update their information here.

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
    modal: false,
    newmobile: "", // Ensure these are strings for input fields
    newaddress: "",
  };

  componentDidMount() {
    // Fetch user details
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/user",
    })
      .then((res) => {
        if (res.data === "Please login first") {
          alert(res.data);
        } else {
          this.setState({
            mobile: res.data.mobile,
            name: res.data.username,
            address: res.data.address,
          });
        }
      })
      .catch((err) => console.error("Error fetching user data:", err));

    // Fetch cart items
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/getcartitems",
    })
      .then((res) => {
        if (res.data !== "Please log in to proceed!") {
          this.setState({ cart: res.data });
        }
      })
      .catch((err) => console.error("Error fetching cart items:", err));

    // Fetch wishlist items
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/getwishlistitems",
    })
      .then((res) => {
        if (res.data !== "Please log in to proceed!") {
          this.setState({ wishlist: res.data });
        }
      })
      .catch((err) => console.error("Error fetching wishlist items:", err));

    // Fetch order items
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/getorderitems",
    })
      .then((res) => {
        if (res.data !== "Please log in to proceed!") {
          this.setState({ orders: res.data });
        }
      })
      .catch((err) => console.error("Error fetching order items:", err));
  }

  logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/logout",
    })
      .then(() => {
        alert("You are logged out!");
        window.location.href = "/login"; // Redirect to login page
      })
      .catch((err) => console.error("Error during logout:", err));
  };

  updateNum = () => {
    Axios({
      method: "POST",
      data: { mobile: this.state.newmobile },
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/update/number",
    })
      .then(() => {
        alert("Mobile number updated successfully!");
        window.location.reload();
      })
      .catch((err) => console.error("Error updating mobile number:", err));
  };

  updateAdd = () => {
    Axios({
      method: "POST",
      data: { address: this.state.newaddress },
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/update/address", // Corrected endpoint
    })
      .then(() => {
        alert("Address updated successfully!");
        window.location.reload();
      })
      .catch((err) => console.error("Error updating address:", err));
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
              <Image
                src="https://res.cloudinary.com/dzky4f4zb/image/upload/v1602847816/yourcart_hb4g2u.png"
                fluid
              />
              <h2 style={{ marginTop: "5%" }}>
                You're almost there! Want to <Link to="/cart">Checkout</Link>?
              </h2>
              <ProfileComp products={this.state.cart} />
            </Col>

            <Col xs={6} md={4}>
              <Image
                src="https://res.cloudinary.com/dzky4f4zb/image/upload/v1602847974/wishlist_x6cv29.png"
                fluid
              />
              <ProfileComp products={this.state.wishlist} />
            </Col>
          </Row>
        </Container>

        <Image
          src="https://res.cloudinary.com/dzky4f4zb/image/upload/v1602848155/previousorders_i2wtru.png"
          fluid
        />
        <ProfileComp products={this.state.orders} />
      </div>
    );
  }
}

export default Profile;
