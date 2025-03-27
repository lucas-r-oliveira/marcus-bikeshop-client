import '../styles/pages/ProductPage.css';

import { useParams } from 'react-router';
import { useProduct } from '../contexts/ProductContext';
import { useEffect, useRef, useState } from 'react';

import { CharacteristicType, Product } from '../types/product';
import CustomizationOption from '../components/CustomizationOption';
import { useCart } from '../contexts/CartContext';
import { useProductConfig } from '../contexts/ConfigurationContext';

//TODO: if product does not exist show 404 page

interface Option {
	inStock: boolean;
	name: string;
}
type AvailableCharacteristics = {
	[K in CharacteristicType]: Option[];
};

export default function ProductPage() {
	const { productId } = useParams();
	const { getProductById } = useProduct();
	const { addToCart } = useCart()
	const { setCurrentProduct, currentProductId, selectedOptions, selectOption } = useProductConfig()
	const [ product, setProduct ] = useState<Product | undefined>(undefined)
	const [availableCharacteristics, setAvailableCharacteristics] = useState<Partial<AvailableCharacteristics>>({})

	const hasSetProduct = useRef<boolean>(false);

	useEffect(() => {
		if (!productId) return // if product doesn't exist everything else fails TODO: error handling
		
		const fetchedProduct = getProductById(productId)
		if (!fetchedProduct) return;

		if(product?.id !== fetchedProduct.id) {
			setProduct(fetchedProduct)
			hasSetProduct.current = false;
		}

		if (!hasSetProduct.current) {
			setCurrentProduct(fetchedProduct);
			hasSetProduct.current= true;
		}

		//TODO: this can actually come from the context
		if (fetchedProduct.availableCharacteristics) {
			const characteristics:{[name: string]: Option[]} = {}
			fetchedProduct.availableCharacteristics.map(characteristic => {
				if(!(characteristic.characteristicType in characteristics)) {
					characteristics[characteristic.characteristicType] = [{...characteristic}]
				} else {
					characteristics[characteristic.characteristicType].push(characteristic)
				}
			})
			setAvailableCharacteristics(characteristics)
		}
	}, [getProductById, productId])

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

					{
						Object.entries(availableCharacteristics).map(([type, options]) => (
							<CustomizationOption 
								key={type}
								characteristicType={type as CharacteristicType}
								options={options}
								selectOption={selectOption}
							/>
						))
					}
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
