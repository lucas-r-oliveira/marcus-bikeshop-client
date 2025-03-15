import { createContext, useContext, useState } from "react";
import { Product, ProductId } from "../types/product";
import { sampleBikes } from "../utils/bikedataset";

interface ProductContextType {
	products: Product[];
	getProductById: (productId: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useProduct(): ProductContextType {
	const context = useContext(ProductContext);
	if (context === null) {
		throw new Error('useProduct must be used within a ProductProvider');
	}
	return context;
}

type Props = {
	children?: React.ReactNode
}
export default function ProductProvider({children}: Props) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [products, setProducts] = useState<Product[]>(sampleBikes);

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
