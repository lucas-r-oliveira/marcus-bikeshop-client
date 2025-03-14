import CustomizationOption from '../components/CustomizationOption';
import '../styles/pages/ProductPage.css';

// FIXME: this should be in a separate types file
interface ProductProps {
	productId: string;
	name: string; // can also be title
	price: number;
	currency: string;
	imageUrl: string;
	description: string;
	inStock: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleAddToCart() {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductPage(props: ProductProps) {
	return(
		<div className="product-detail-container">
			<div className="product-detail-left">
				<img></img>
				<p>Place Image here</p>
			</div>
			<div className="product-detail-right">
				<h1>{props.name}/ Title</h1>
				<p>{props.price} {props.currency} / 42 EUR</p>
				<p>{props.description} / short description</p>
				<div className="customization-container">
					{[...Array(5)].map(() => (
						<CustomizationOption/>
					))}
				</div>
				<button onClick={handleAddToCart}>Add to Cart</button>
			</div>
		</div>
	)

}
