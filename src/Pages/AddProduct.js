import React, { useState } from "react";
import Axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("");
  const [gender, setGender] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [category, setCategory] = useState("");
  const [lensId, setLensId] = useState(""); // New state for lensId
  const [lensGroupId, setLensGroupId] = useState(""); // New state for lensGroupId

  const addItem = () => {
    Axios({
      method: "POST",
      data: {
        name: name,
        description: desc,
        imageurl: url,
        category: category,
        price: price,
        rating: rating,
        color: color,
        gender: gender,
        lensId: lensId, // Send lensId in the request
        lensGroupId: lensGroupId, // Send lensGroupId in the request
      },
      withCredentials: true,
      url: "https://vv-backend-eud6.onrender.com/addproduct",
    })
      .then((res) => {
        console.log(res);
        alert("Product successfully added!"); // Display success alert
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Failed to add product. Please try again."); // Display error alert if the request fails
      });
  };

  return (
    <div className="cart">
      <h1>Add new products here</h1>
      <br />

      <input
        placeholder="Product name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <input
        placeholder="Add a description"
        onChange={(e) => setDesc(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter categories separated by a single space"
        onChange={(e) => setCategory(e.target.value.split(" "))}
      />
      <br />
      <input
        placeholder="Enter color"
        onChange={(e) => setColor(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter gender"
        onChange={(e) => setGender(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter price"
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter rating"
        onChange={(e) => setRating(e.target.value.split(" "))}
      />
      <br />
      <input
        placeholder="Enter image URL"
        onChange={(e) => setUrl(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Lens ID"
        onChange={(e) => setLensId(e.target.value)}
      />
      <br />
      <input
        placeholder="Enter Lens Group ID"
        onChange={(e) => setLensGroupId(e.target.value)}
      />
      <br />

      <button onClick={() => addItem()}>Add Product to DB</button>
    </div>
  );
}
