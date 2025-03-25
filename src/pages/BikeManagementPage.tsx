import "../styles/pages/BikeManagementPage.css";
import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { Product, ProductId } from "../types/product";
import { useNavigate } from "react-router";

//FIXME: hardcoded currency
export default function BikeManagementPage() {
  const navigate = useNavigate();
  const { products } = useProduct();
  const [bikes, setBikes ] = useState(products)
  /*const [newBike, setNewBike] = useState<Product>({
    id: "",
    name: "",
    description: "",
    basePrice: 0,
    currency: "€",
    imageUrl: "",
    inStock: true,
    category: "",
  });*/

	/*function handleInputChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		const { name, value } = e.target;

		setNewBike({
		...newBike,
		[name]: name === "basePrice" ? parseFloat(value) : value,
		});
	}*/


	// this goes to a context probably
	//FIXME:
	function handleDeleteBike(productId: ProductId) {
		setBikes(bikes.filter(bike => bike.id !== productId));
	}

	function handleEditBike(product: Product) {
		navigate(`/admin/products/${product.id}` , {state: product}) //TODO: /bicycles or not?
	}
	function handleCreateBike() {
		navigate(`/admin/products/create` , {state: {
			id: "",
			name: "",
			description: "",
			basePrice: 0,
			currency: "€",
			imageUrl: "",
			inStock: true,
			category: "",
		}})
	}


  return (
	<>
	<button className="create-bike-btn" onClick={() => handleCreateBike()}>Create bicycle</button>
	<ProductGrid>
		{products.map(product => (
			<ProductCard
				productId={product.id}
				key={product.id}
				name={product.name}
				description={product.description}
				imageUrl={product.imageUrl}
				inStock={product.inStock}
				price={product.basePrice}
				currency={product.currency}
				actions={[
					{
						text: "Delete",
						action: () => handleDeleteBike(product.id),
						btnColor: "red"
					},
					{
						text: "Edit",
						action: () => handleEditBike(product),
					},


				]}
			/>
		))}
	  </ProductGrid>
	 </>
  );
}
