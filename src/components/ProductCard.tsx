import { Link } from 'react-router';
import './ProductCard.css';

interface ProductCardProps {
	productId: string;
	name: string; // can also be title
	price: number;
	currency: string;
	imageUrl: string;
	description: string;
	inStock: boolean;
}


export default function ProductCard(props: ProductCardProps) {
	return(
		<Link to={`/products/${props.productId}`}>
			<div className='card-container'>
				<img alt='' src={props.imageUrl}></img>
				<div className='text-info-container'>
					<h4> {props.name} </h4>
					<p> {props.price} {props.currency} </p>
					<p> {props.description} </p>
				</div>
			</div>
		</Link>
	)
}
