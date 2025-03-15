import { createContext, useState } from "react";
import { Product, ProductId } from "../types/product";

interface ProductContextType {
	products: Product[];
	getProductById: (productId: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextType | null>(null);

type Props = {
	children?: React.ReactNode
}
export default function ProductProvider({children}: Props) {
	const [products, setProducts] = useState<Product[]>([]);

	function getProductById(productId: ProductId): Product | undefined {
		return products.find(product => product.id === productId)
	}

	const value: ProductContextType = {
		products,
		getProductById
	}

	return (
		<ProductContext.Provider value={value}>
			{children}
		</ProductContext.Provider>
	)
}