import '../styles/components/CartItem.css';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ProductId } from '../types/product';

interface CartItemProps {
	productId: ProductId;
	cartItemId: string //TODO: CartItemId;
	productImageUrl: string;
	productName: string;
	//productModel: string;
	// TODO: customization options?
	currency: string;
	productPrice: number;
	productQty: number;
}

export default function CartItem(props: CartItemProps) {
	const [qty, setQty] = useState(props.productQty)
	const { updateItemQty, removeFromCart } = useCart()

	function handleChangeQty(e: React.ChangeEvent<HTMLInputElement>) {
		setQty(+e.target.value)	
		updateItemQty(props.cartItemId, +e.target.value);
	}

	function handleRemoveFromCart() {
		removeFromCart(props.cartItemId);
	}

	return(
		<div className="cart-item-container">
			<div className="cart-item-detail">
				<img src={props.productImageUrl} alt={props.productName} width={200}/>
				<div className='cart-item-text-info'>
					<h4>{props.productName}</h4>
					{/* <p>{props.productModel}</p> */}
				</div>
				{/* TODO: customization options here? it makes sense ... But how do I represent it  */}
			</div>
			<div className='cart-item-detail'>
				<label htmlFor="qty">
					{/* FIXME: bug: when I delete the number, the item disappears (gets removed from cart) */}
					<input 
						type="number" 
						id="qty" 
						name="qty" 
						min={1} 
						max={99} 
						value={qty} 
						onChange={(e)=>handleChangeQty(e)}
					/>
				</label>
				<p>{props.currency} {(qty * props.productPrice).toFixed(2)} </p>
				<button onClick={handleRemoveFromCart}>X</button>
			</div>

		</div>
	)
}