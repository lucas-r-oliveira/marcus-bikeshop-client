import React, { useState } from 'react';
import '../styles/pages/BikeManagementPage.css'

interface Product {
	productId: string;
	name: string;
	description: string;
	price: number;
	currency: string;
	imageUrl: string;
	inStock: boolean;
	category: string;
  }
  
  export default function BikeManagementPage() {
	// Initial bike data hardcoded directly in the component
	const initialBikes: Product[] = [
	  {
		productId: 'p1',
		name: 'Mountain Bike',
		description: 'The greatest for mountain biking',
		price: 1299,
		currency: '€',
		imageUrl: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
		inStock: true,
		category: 'mountain'
	  },
	  {
		productId: 'p2',
		name: 'Road Bike',
		description: 'Lightweight and fast for road cycling',
		price: 899,
		currency: '€',
		imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
		inStock: true,
		category: 'road'
	  },
	  {
		productId: 'p3',
		name: 'Electric Bike',
		description: 'Pedal-assist for effortless commuting',
		price: 1649,
		currency: '€',
		imageUrl: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890',
		inStock: false,
		category: 'electric'
	  }
	];
  
	const [bikes, setBikes] = useState<Product[]>(initialBikes);
	const [newBike, setNewBike] = useState<Product>({
	  productId: '',
	  name: '',
	  description: '',
	  price: 0,
	  currency: '€',
	  imageUrl: '',
	  inStock: true,
	  category: ''
	});
  
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	  const { name, value } = e.target;
	  setNewBike({
		...newBike,
		[name]: name === 'price' ? parseFloat(value) : value,
	  });
	};
  
	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	  const { name, checked } = e.target;
	  setNewBike({
		...newBike,
		[name]: checked,
	  });
	};
  
	const handleCreateBike = () => {
	  if (!newBike.name || !newBike.description) {
		alert('Please fill in at least the name and description fields');
		return;
	  }
	  
	  const createdBike = {
		...newBike,
		productId: `p${Date.now()}`,
	  };
	  
	  setBikes([...bikes, createdBike]);
	  
	  setNewBike({
		productId: '',
		name: '',
		description: '',
		price: 0,
		currency: '€',
		imageUrl: '',
		inStock: true,
		category: ''
	  });
	};
  
	const handleDeleteBike = (productId: string) => {
	  setBikes(bikes.filter(bike => bike.productId !== productId));
	};
  
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
			  onChange={handleInputChange}
			  className="form-input"
			/>
			
			<textarea
			  name="description"
			  placeholder="Description"
			  value={newBike.description}
			  onChange={handleInputChange}
			  className="form-textarea"
			/>
			
			<div className="price-container">
			  <input
				type="number"
				name="price"
				placeholder="Price"
				value={newBike.price}
				onChange={handleInputChange}
				className="price-input"
			  />
			  <input
				type="text"
				name="currency"
				placeholder="Currency"
				value={newBike.currency}
				onChange={handleInputChange}
				className="currency-input"
			  />
			</div>
			
			<input
			  type="text"
			  name="imageUrl"
			  placeholder="Image URL"
			  value={newBike.imageUrl}
			  onChange={handleInputChange}
			  className="form-input"
			/>
			
			<input
			  type="text"
			  name="category"
			  placeholder="Category"
			  value={newBike.category}
			  onChange={handleInputChange}
			  className="form-input"
			/>
			
			<label className="stock-label">
			  <input
				type="checkbox"
				name="inStock"
				checked={newBike.inStock}
				onChange={handleCheckboxChange}
			  />
			  In Stock
			</label>
			
			<button 
			  onClick={handleCreateBike} 
			  className="create-button"
			>
			  Create Bicycle
			</button>
		  </div>
		</div>
		
		<div>
		  <h2 className="section-title">All Bicycles ({bikes.length})</h2>
		  <div className="bike-grid">
			{bikes.map(bike => (
			  <div key={bike.productId} className="bike-card">
				<div className="bike-header">
				  <h3 className="bike-title">{bike.name}</h3>
				  <span className={bike.inStock ? "in-stock" : "out-of-stock"}>
					{bike.inStock ? "In Stock" : "Out of Stock"}
				  </span>
				</div>
				
				{bike.imageUrl && (
				  <img 
					src={bike.imageUrl} 
					alt={bike.name}
					className="bike-image"
				  />
				)}
				
				<p className="bike-description">{bike.description}</p>
				<p className="bike-price">Price: {bike.currency}{bike.price}</p>
				<p className="bike-category">Category: {bike.category}</p>
				
				<button 
				  onClick={() => handleDeleteBike(bike.productId)}
				  className="delete-button"
				>
				  Delete
				</button>
			  </div>
			))}
		  </div>
		</div>
	  </div>
	);
  };