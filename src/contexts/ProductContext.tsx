import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Product, ProductId } from "../types/product";
import { createProductStoreApi, ProductResponse } from "../api";

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
	//const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	//const [products, setProducts] = useState<Product[]>(sampleBikes);
	//FIXME: type ProductResponse? type Product is not compatible...
	const [products, setProducts] = useState<ProductResponse[]>([]);

	//FIXME: should come from props? or env var
	const baseUrl = "http://localhost:5000"

	const api = useMemo(() => createProductStoreApi(baseUrl), [baseUrl]);
	
	const fetchBicycles = useCallback(async () => {
		//setIsLoading(true);
		setError(null);
		try {
		  const fetchedProducts = await api.fetchBicycles();
		  console.log(fetchedProducts)
		  setProducts(fetchedProducts);
		} catch (err) {
		  const errorMessage = err instanceof Error 
			? err.message 
			: 'Failed to fetch bicycles';
		  setError(new Error(errorMessage));
		}
		//} finally {
		//  setIsLoading(false);
		//}
	  }, [api]);

	useEffect(() => {
		fetchBicycles();
	}, [fetchBicycles]);
	 


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
