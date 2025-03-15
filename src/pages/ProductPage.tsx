import '../styles/pages/ProductPage.css';

import { useParams } from 'react-router';
import { useProduct } from '../contexts/ProductContext';
import { useEffect, useState } from 'react';

import { Product } from '../types/product';
import CustomizationOption from '../components/CustomizationOption';

//TODO: if product does not exist show 404 page

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleAddToCart() {}

export default function ProductPage() {
	const { productId } = useParams();
	const { getProductById } = useProduct();
	// TODO: const { cart }  = useCart();
	const [ product, setProduct ] = useState<Product | undefined>(undefined)

	useEffect(() => {
		if (!productId) return
		setProduct(getProductById(productId))
		// TODO: handle 404 here
	}, [getProductById, productId])

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
				<button onClick={handleAddToCart} className='add-to-cart-btn'>Add to Cart</button>
			</div>
		</div>
	)

}
