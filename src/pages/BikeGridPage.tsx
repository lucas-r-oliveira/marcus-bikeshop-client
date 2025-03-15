import '../styles/pages/BikeGridPage.css';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';
import { useProduct } from '../contexts/ProductContext';

export default function BikeGridPage() {
	const { products } = useProduct();

	return (
		<ProductGrid>
			
			{products.map((product) => (
				<ProductCard 
					key={product.id}
					productId={product.id}
					name={product.name}
					description={product.description}
					price={product.basePrice}
					currency={product.currency}
					imageUrl={product.imageUrl}
					inStock={product.inStock} 
					//TODO: category={product.category}
					//TODO: parts={product.parts}
					//actions={[{text: "add to cart", action: ()=>console.log("hello"), }]}
				/>
			))}
		 </ProductGrid>
	  )
  }