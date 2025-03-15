import { createContext, useContext, useState } from "react";
import { OptionId, PartId, ProductId, SelectedProductConfig } from "../types/product";
import { CartItem } from "../types/cart";

interface CartContextType {
	items: CartItem[];
	addToCart: (productName: string, basePrice: number, imageUrl: string, config: SelectedProductConfig) => void 
	removeFromCart: (cartItemId: string) => void
	updateItemQty: (cartItemId: string, qty: number) => void
	clearCart: () => void
	getCartTotal: () => number;
	getItemCount: () => number;
	getCartItem: (productId: ProductId, selectedOptions: Record<PartId, OptionId>) => CartItem | undefined;

}
const CartContext = createContext<CartContextType | null>(null);
//TODO: api calls

// eslint-disable-next-line react-refresh/only-export-components
export function useCart(): CartContextType {
	const context = useContext(CartContext);
	if (context === null) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
}

type Props = {
	children?: React.ReactNode
}
export default function CartProvider({children}: Props) {
	const [items, setItems] = useState<CartItem[]>([]); //TODO: set?

	function getCartItem(productId: ProductId, selectedOptions: Record<PartId, OptionId>) {
		return items.find(item => {
			if (item.productId !== productId) return false;

			const itemOptionsKeys = Object.keys(item.selectedOptions);
			const newOptionsKeys = Object.keys(selectedOptions)

			if (itemOptionsKeys.length !== newOptionsKeys.length) return false;

			return itemOptionsKeys.every(key => 
				item.selectedOptions[key] === selectedOptions[key]
			)
		})
	}

	function addToCart(productName: string, basePrice: number, imageUrl: string, config: SelectedProductConfig) {
		const { productId, selectedOptions } = config

		const existingItem = getCartItem(productId, selectedOptions)

		if (existingItem) {
			setItems(items.map(item => 
				item.cartItemId === existingItem.cartItemId ?
				{ ...item, qty: item.qty + 1 }
				: item
			))
		} else {
			const newItem: CartItem = {
				cartItemId: Math.random() + "",//generateId(), //TODO: util
				productId,
				name: productName,
				basePrice,
				imageUrl,
				selectedOptions,
				qty: 1
			}
			
			setItems([...items, newItem])
		}
	}

	function removeFromCart(itemId: string) {
		setItems(items.filter(cartItem => cartItem.cartItemId !== itemId))
	}

	function updateItemQty(cartItemId: string, qty: number) {
		if (qty <= 0) {
			removeFromCart(cartItemId);
			return;
		}

		setItems(items.map(item => 
			item.cartItemId === cartItemId ?
			{ ...item, qty }
			: item
		))
	}

	function clearCart() {
		setItems([])
	}

	function getCartTotal() {
		return items.reduce((total, item) => total + (item.basePrice * item.qty), 0)
	}

	function getItemCount() {
		return items.reduce((count, item) => count + item.qty, 0)
	}


	const value: CartContextType = {
		items,
		getCartItem,
		addToCart,
		removeFromCart,
		updateItemQty,
		clearCart,
		getCartTotal,
		getItemCount
	}

	return (
		<CartContext.Provider value={value}>
			{children}
		</CartContext.Provider>
	)
}
