import "../styles/pages/CartPage.css"
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";

//FIXME: hardcoded currency
export default function CartPage() {
	const { items, getCartTotal } = useCart()
	

	return (
    <>
		<div>
			{ items.length > 0?
				items.map(item => (
					<CartItem 
						key={item.productId}
						productId={item.productId}
						cartItemId={item.cartItemId}
						selectedOptions={item.selectedOptions}
						productName={item.name}
						productPrice={item.basePrice}
						productImageUrl={item.imageUrl}
						currency="EUR" //What do I do with this?
						productQty={item.qty}
					/>
				))
				: (<h4>Your cart is empty!</h4>)
			}	
      </div>
      <div className="checkout-container">
		<div className="total-container">
			<p>Subtotal</p>
			<p>EUR {getCartTotal().toFixed(2)}</p>
		</div>
		<button className="checkout-btn">Checkout</button>
	  </div>
    </>
  );
}
