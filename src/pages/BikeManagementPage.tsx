import '../styles/pages/BikeManagementPage.css'
import { useState } from "react";
import ProductGrid from "../components/ProductGrid";

export default function BikeManagementPage() {
  const [newBike, setNewBike] = useState({
    productId: "",
    name: "",
    description: "",
    price: 0,
    currency: "€",
    imageUrl: "",
    inStock: true,
    category: "",
  });
  return (
    <div className="bike-management-container">
      <h1 className="section-title">Bicycle Management</h1>
      <div className="create-form-container">
        <h2 className="section-title">Create New Bicycle</h2>
        <div className="form-fields">
          <input
            type="text"
            name="name"
            placeholder="Bicycle Name"
            value={newBike.name}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={newBike.description}
            className="form-textarea"
          />

          <div className="price-container">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newBike.price}
              className="price-input"
            />
            <input
              type="text"
              name="currency"
              placeholder="Currency"
              value={newBike.currency}
              className="currency-input"
            />
          </div>

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={newBike.imageUrl}
            className="form-input"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newBike.category}
            className="form-input"
          />

          <label className="stock-label">
            <input type="checkbox" name="inStock" checked={newBike.inStock} />
            In Stock
          </label>

          <button className="create-button">Create Bicycle</button>
        </div>
      </div>

      <ProductGrid></ProductGrid>
    </div>
  );
}
