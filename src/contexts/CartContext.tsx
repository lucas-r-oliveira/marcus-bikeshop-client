import { createContext, useContext, useEffect, useState } from "react";
import { CharacteristicType, OptionId, PartId, ProductId, SelectedProductConfig } from "../types/product";
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

const CART_STORAGE_KEY = "bicycle-shop-cart";

type Props = {
	children?: React.ReactNode
}
export default function CartProvider({children}: Props) {
	const [items, setItems] = useState<CartItem[]>([]); //TODO: set?

	useEffect(() => {
		try {
			const savedCart = localStorage.getItem(CART_STORAGE_KEY);
			if (savedCart) {
				setItems(JSON.parse(savedCart));
			}
		} catch (error) {
			console.error("Failed to load cart from localstorage: ", error)
		}
	}, [])

	useEffect(() => {
		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			console.error("Failed to save cart to localstorage: ", error)
		}
	}, [items])

	function getCartItem(productId: ProductId, selectedOptions: Record<CharacteristicType, string>) {
		return items.find(item => {
			if (item.productId !== productId) return false;

			const itemCharacteristicsKeys = Object.keys(item.selectedOptions) as CharacteristicType[];
			const newItemCharacteristicsKeys = Object.keys(selectedOptions) as CharacteristicType[];

			if (itemCharacteristicsKeys.length !== newItemCharacteristicsKeys.length) return false;


			return itemCharacteristicsKeys.every(key => 
				selectedOptions[key] !== undefined && item.selectedOptions[key] === selectedOptions[key]
			)

		})
	}

	function addToCart(productName: string, basePrice: number, imageUrl: string, config: SelectedProductConfig) {
		//TODO: RULES!!!!!!!
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
