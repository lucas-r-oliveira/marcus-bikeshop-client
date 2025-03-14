import { useState } from 'react';
import '../styles/components/CartItem.css';

interface CartItemProps {
	productId: string;
	productImageUrl: string;
	productName: string;
	productModel: string;
	// TODO: customization options?
	currency: string;
	productPrice: number;
	productQty: number;
}


//TODO:
function handleRemoveFromCart() {}


export default function CartItem(props: CartItemProps) {
	const [qty, setQty] = useState(props.productQty)
	return(
		<div className="cart-item-container">
			<div className="cart-item-detail">
				<img src={props.productImageUrl} alt={props.productName}></img>
				<div className='cart-item-text-info'>
					<h4>{props.productName}</h4>
					<p>{props.productModel}</p>
				</div>
				{/* TODO: customization options here? it makes sense ... But how do I represent it  */}
			</div>
			<div className='cart-item-detail'>
				<label htmlFor="qty">
					<input type="number" id="qty" name="qty" min={1} max={99} value={qty} onChange={(e) => setQty(+e.target.value)}/>
				</label>
				<p>{props.currency} {(qty * props.productPrice).toFixed(2)} </p>
				<button onClick={handleRemoveFromCart}>X</button>
			</div>

		</div>
	)
}