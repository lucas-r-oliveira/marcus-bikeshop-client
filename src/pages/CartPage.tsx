import "../styles/pages/CartPage.css"
import CartItem from "../components/CartItem";

// remember to show an empty cart if it is empty
// TODO: calc total price
export default function CartPage() {
  return (
    <>
      <div>
        <CartItem
          productId="BIKE-001"
          productImageUrl="/path/to/image/url"
          productModel="Touring"
          productName="Mountain Bike"
          productPrice={42.42}
          currency="EUR"
          productQty={1}
        />
        <CartItem
          productId="BIKE-002"
          productImageUrl="/path/to/image/url"
          productModel="Touring"
          productName="Racing Bike"
          productPrice={100.23}
          currency="EUR"
          productQty={2}
        />
        <CartItem
          productId="BIKE-003"
          productImageUrl="/path/to/image/url"
          productModel="Touring"
          productName="Casual Bike"
          productPrice={99.99}
          currency="EUR"
          productQty={1}
        />
      </div>
      <div className="checkout-container">
		<div className="total-container">
			<p>Subtotal</p>
			<p>EUR Total Price</p>
		</div>
		<button className="checkout-btn">Checkout</button>
	  </div>
    </>
  );
}
