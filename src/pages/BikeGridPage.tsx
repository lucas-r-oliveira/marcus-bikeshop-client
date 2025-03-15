import '../styles/pages/BikeGridPage.css';
import ProductCard from '../components/ProductCard';
import ProductGrid from '../components/ProductGrid';

export default function BikeGridPage() {

	return (
		<ProductGrid>
		  <ProductCard 
			productId='p1'
			name='Mountain Bike'
			description='The greatest for mountain biking'
			price={42}
			currency='€'
			imageUrl='/path/to/p1-bike'
			inStock={true}
			actions={[{text: "add to cart", action: ()=>console.log("hello"), }]}
		  />
		  <ProductCard 
			productId='p2'
			name='Road Bike'
			description='Lightweight and fast for road cycling'
			price={899}
			currency='€'
			imageUrl='/path/to/p2-bike'
			inStock={true}
		  />
		  <ProductCard 
			productId='p3'
			name='Gravel Bike'
			description='Versatile for both road and off-road adventures'
			price={749}
			currency='€'
			imageUrl='/path/to/p3-bike'
			inStock={false}
		  />
		  <ProductCard 
			productId='p4'
			name='Electric Bike'
			description='Pedal-assist for effortless commuting'
			price={1299}
			currency='€'
			imageUrl='/path/to/p4-bike'
			inStock={true}
		  />
		  <ProductCard 
			productId='p5'
			name='BMX Bike'
			description='Perfect for tricks and stunts'
			price={349}
			currency='€'
			imageUrl='/path/to/p5-bike'
			inStock={true}
		  />
		 </ProductGrid>
	  )
  }