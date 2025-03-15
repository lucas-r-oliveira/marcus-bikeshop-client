import '../styles/pages/ProductPage.css';

import { useParams } from 'react-router';
import { useProduct } from '../contexts/ProductContext';
import { useEffect, useState } from 'react';

import { Product } from '../types/product';
import CustomizationOption from '../components/CustomizationOption';
import { useCart } from '../contexts/CartContext';
import { useProductConfig } from '../contexts/ConfigurationContext';

//TODO: if product does not exist show 404 page


export default function ProductPage() {
	const { productId } = useParams();
	const { getProductById } = useProduct();
	const { addToCart } = useCart()
	const { setCurrentProduct, currentProductId, selectedOptions } = useProductConfig()
	const [ product, setProduct ] = useState<Product | undefined>(undefined)

	useEffect(() => {
		if (!productId) return // if product doesn't exist everything else fails TODO: error handling
		const product = getProductById(productId)
		if (!product) return;

		setProduct(product);
		setCurrentProduct(product);
		// TODO: handle 404 here
	}, [getProductById, productId, setCurrentProduct])
	
	function handleAddToCart() {
		if (!product || !productId) return;
		// FIXME: + ""
		addToCart(
			product.name, 
			product.basePrice, 
			product.imageUrl, 
			{
				productId: currentProductId + "", 
				selectedOptions: selectedOptions
			}
		)
	}

	return(
		<div className="product-detail-container">
			<div className="product-detail-left">
				<img src={product?.imageUrl}></img>
			</div>
			<div className="product-detail-right">
				<h2>{product?.name}</h2>
				<p>{product?.basePrice} {product?.currency}</p>
				<p>{product?.description}</p>
				<div className="customization-container">
					{/* {TODO: if product doesnt have customizable parts display a msg} */}
					{product?.parts?.map((part) => (
						<CustomizationOption
						  	key={part.id}
						 	id={part.id}
							name={part.name}
							options={part.options}
						/>
					))}
				</div>
				{product?
					<button onClick={handleAddToCart} className='add-to-cart-btn'>Add to Cart</button>
					:
					null
				}
			</div>
		</div>
	)

}
