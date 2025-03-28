import { useEffect, useState } from "react";
import "../styles/components/BikeForm.css";
import { CharacteristicType, Product } from "../types/product";
import { useLocation } from "react-router";
import { useProductConfig } from "../contexts/ConfigurationContext";
import { useProduct } from "../contexts/ProductContext";


export default function BikeForm() {

	const { state } = useLocation();
	const { 
		defaultCharacteristicsMap, 
		availCharacteristicsMap, 
		setCurrentProduct 
	} = useProductConfig() 
	const { getProductById } = useProduct()
	const [isEdit, setIsEdit] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product>({} as Product) // FIXME: will I use this? unsure
	const [characteristicConfig, setCharacteristicConfig] = useState<Map<CharacteristicType, string[]>>(new Map());

	useEffect(() => {
		const productId = state?.id
		if(productId && productId !== "") {
			setIsEdit(true)
			const product = getProductById(productId)

			if(product) {
				setSelectedProduct(product)
				setCurrentProduct(product)
			}
		}
	}, [state?.id, getProductById])

	useEffect(() => {
		if(!selectedProduct) return
		const initialConfig = new Map<CharacteristicType, string[]>();

		selectedProduct.availableCharacteristics?.forEach(char => {
			if (!initialConfig.has(char.characteristicType)) {
				initialConfig.set(char.characteristicType, []);
			}
		
			initialConfig.get(char.characteristicType)!.push(char.name);
		});

		setCharacteristicConfig(initialConfig)

	
	}, [selectedProduct])


	function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setSelectedProduct({
		...selectedProduct,
		[name]: name === "basePrice" ? parseFloat(value) : value,
		});
	}

	

	function handleCharacteristicChange(
		characteristicType: CharacteristicType,
		optionName: string
	  ) {
		setCharacteristicConfig((prevConfig) => {
		  const newConfig = new Map(prevConfig); 
		  const currentOptions = newConfig.get(characteristicType) || [];
	  
		  let updatedOptions;
		  if (currentOptions.includes(optionName)) {
			updatedOptions = currentOptions.filter((option) => option !== optionName);
		  } else {
			updatedOptions = [...currentOptions, optionName];
		  }
	  
		  if (updatedOptions.length > 0) {
			newConfig.set(characteristicType, updatedOptions);
		  } else {
			newConfig.delete(characteristicType);
		  }
	  
		  return new Map(newConfig); 
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
					</div>
				</div>
				<div className="characteristics-form-container">
					<h2 className="section-title">Product Characteristics Configuration</h2>
					{
						defaultCharacteristicsMap.size === 0?
						<p>No characteristics available for this product</p>
						:
						Array.from(defaultCharacteristicsMap.entries()).map(([characteristicType, options]) => (
							<div key={characteristicType} className="characteristic-container">
								<label className="characteristic-label">{characteristicType}:</label>
								<div className="characteristic-options">
									{options.map(opt => (
									<label key={opt.name} className="characteristic-option-label">
										<input 
											type="checkbox" 
											value={opt.name} 
											disabled={!opt.inStock}
											
											checked={
												characteristicConfig.get(characteristicType)?.includes(opt.name)	
											}
											onChange={() => handleCharacteristicChange(characteristicType, opt.name)}
										/>
										{opt.name} {!opt.inStock && '(Out of Stock)'}
									</label>
									))}
								</div>
							</div>
						))
					}
				</div>
			</div>
			<button className="action-btn">{isEdit? "Edit Bicycle" : "Create Bicycle"}</button>
		</div>
	)
}



    