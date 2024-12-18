import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

export default function EditProduct() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    color: "",
    gender: "",
    imageurl: "",
    price: "",
    rating: "",
    lensId: "",
    lensGroupId: "",
  });
  const history = useHistory();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    setLoading(true);
    try {
      const res = await Axios.get("https://vv-backend-eud6.onrender.com/check-admin", {
        withCredentials: true,
      });
      if (res.data.isAdmin) {
        setIsAdmin(true);
        fetchProducts();
      } else {
        history.push("/login");
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
      history.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = () => {
    Axios.get("https://vv-backend-eud6.onrender.com/getproducts", { withCredentials: true })
      .then((res) => setProducts(res.data))
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);
    const selectedProduct = products.find((prod) => prod._id === productId);
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name,
        description: selectedProduct.description,
        category: selectedProduct.category.join(", "),
        color: selectedProduct.color,
        gender: selectedProduct.gender,
        imageurl: selectedProduct.imageurl,
        price: selectedProduct.price,
        rating: selectedProduct.rating.join(", "),
        lensId: selectedProduct.lensId,
        lensGroupId: selectedProduct.lensGroupId,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const removeProductById = () => {
    if (!selectedProductId) {
      alert("Please select a product to delete.");
      return;
    }

    Axios.delete(`https://vv-backend-eud6.onrender.com/deleteproduct/${selectedProductId}`, {
      withCredentials: true,
    })
      .then(() => {
        alert("Product successfully removed!");
        setSelectedProductId("");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error removing product:", error);
        alert("Failed to remove product. Please try again.");
      });
  };

  const updateProductById = () => {
    if (!selectedProductId) {
      alert("Please select a product to edit.");
      return;
    }

    const updatedProductData = {
      ...productData,
      category: productData.category.split(",").map((cat) => cat.trim()),
      rating: productData.rating.split(",").map((rate) => rate.trim()),
    };

    Axios.put(
      `https://vv-backend-eud6.onrender.com/updateproduct/${selectedProductId}`,
      updatedProductData,
      { withCredentials: true }
    )
      .then(() => {
        alert("Product successfully updated!");
        fetchProducts();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Failed to update product. Please try again.");
      });
  };

  if (!isAdmin || loading) return null;

  return (
    <div className="product-management">
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Manage Products</h1>
      <label style={{ fontSize: "18px" }}>
        Select Product:&nbsp;
        <select
          value={selectedProductId}
          onChange={handleProductSelect}
          style={{ padding: "8px", width: "100%", marginBottom: "20px" }}
        >
          <option value="">-- Select a product --</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name} (ID: {product._id})
            </option>
          ))}
        </select>
      </label>

      {selectedProductId && (
        <div
          className="product-card"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            maxWidth: "700px",
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <div style={{ flex: "1" }}>
            <img
              src={productData.imageurl || "https://via.placeholder.com/150"}
              alt="Product"
              style={{
                width: "200px",
                height: "510px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </div>

          <div style={{ flex: "2" }}>
            <div style={{ display: "grid", gap: "10px" }}>
              <input
                name="name"
                placeholder="Product Name"
                value={productData.name}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={productData.description}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="category"
                placeholder="Category (comma-separated)"
                value={productData.category}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="color"
                placeholder="Color"
                value={productData.color}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="gender"
                placeholder="Gender"
                value={productData.gender}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="imageurl"
                placeholder="Image URL"
                value={productData.imageurl}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="price"
                placeholder="Price"
                value={productData.price}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="rating"
                placeholder="Rating (comma-separated)"
                value={productData.rating}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="lensId"
                placeholder="Lens ID"
                value={productData.lensId}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
              <input
                name="lensGroupId"
                placeholder="Lens Group ID"
                value={productData.lensGroupId}
                onChange={handleInputChange}
                style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={updateProductById}
                style={{
                  backgroundColor: "green",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  flex: "1",
                }}
                disabled={!selectedProductId}
              >
                Update 
              </button>
              <button
                onClick={removeProductById}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  flex: "1",
                }}
                disabled={!selectedProductId}
              >
                Delete 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
