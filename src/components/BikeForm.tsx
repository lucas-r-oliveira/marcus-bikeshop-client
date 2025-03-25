import { useEffect, useState } from "react";
import "../styles/components/BikeForm.css";
import { Product } from "../types/product";
import { useLocation } from "react-router";


export default function BikeForm() {
	// In the create part we need to display all possible parts
	// In the edit part we might display only the options that product allows
	const { state } = useLocation();
	const [isEdit, setIsEdit] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product>({...state}) // FIXME:

	useEffect(() => {
		//if(selectedProduct.id && selectedProduct.id !== "") {
		if(state?.id && state?.id !== ""){
			setIsEdit(true);
		}
	}, [isEdit, state])
	
	//TODO: do I need a context to propagate this upwards?
	// or useReduce?
	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;

		setSelectedProduct({
		...selectedProduct,
		[name]: name === "basePrice" ? parseFloat(value) : value,
		});
	}

	return(
		<div className="management-container">
			<h1 className="section-title">Bicycle Management</h1>
			<div className="forms-container">
				<div className="main-form-container">
					<h2 className="section-title">{isEdit? "Edit Bicycle" : "Create Bicycle"}</h2>
					<div className="form-fields">
						<input
							type="text"
							name="name"
							placeholder="Bicycle Name"
							value={selectedProduct.name}
							onChange={handleInputChange}
							className="form-input"
						/>

						<textarea
							name="description"
							placeholder="Description"
							value={selectedProduct.description}
							className="form-textarea"
							onChange={handleInputChange}
						/>

						<div className="price-container">
							<input
							type="number"
							name="price"
							placeholder="Price"
							value={selectedProduct.basePrice}
							className="price-input"
							onChange={handleInputChange}
							/>
							{/* <input
							type="text"
							name="currency"
							placeholder="Currency"
							value={newBike.currency}
							className="currency-input"
								onChange={handleInputChange}
							/> */}
							<p>{selectedProduct.currency}</p>
						</div>

						<input
							type="text"
							name="imageUrl"
							placeholder="Image URL"
							value={selectedProduct.imageUrl}
							className="form-input"
							onChange={handleInputChange}
						/>

						<input
							type="text"
							name="category"
							placeholder="Category"
							value={selectedProduct.category}
							className="form-input"
							onChange={handleInputChange}
						/>

						<label className="stock-label">
							<input type="checkbox" name="inStock" checked={selectedProduct.inStock} />
							In Stock
						</label>

					</div>
				</div>
				<div className="parts-form-container">
					<h2 className="section-title">Part Configuration</h2>
					{/* {TODO: if product doesnt have customizable parts display a msg} */}
					<div className="product-parts-container">
						{selectedProduct?.parts?.map((part) => (
							<div key={part.name} className="product-part">
								<label className="product-part-label">{part.name}:</label>
								<div className="product-part-options">
									{part.options.map((opt) => (
									<label key={opt.id} className="product-option-label">
										<input type="checkbox" value={opt.id} />
										{opt.name}
									</label>
									))}
								</div>
							</div>
						))}
					</div>
					{/* <div className="part-badges-container">
						{selectedProduct?.parts?.map((part) =>(<span className="part-badge">{part.name}</span>))}
					</div> */}
				</div>
			</div>
			<button className="action-btn">{isEdit? "Edit Bicycle" : "Create Bicycle"}</button>
		</div>
	)
}



    