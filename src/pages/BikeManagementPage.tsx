import "../styles/pages/BikeManagementPage.css";
import { useState } from "react";
import ProductGrid from "../components/ProductGrid";
import { useProduct } from "../contexts/ProductContext";
import ProductCard from "../components/ProductCard";
import { Product, ProductId } from "../types/product";
import { useNavigate } from "react-router";
import { useProductConfig } from "../contexts/ConfigurationContext";

//FIXME: hardcoded currency
export default function BikeManagementPage() {
  const navigate = useNavigate();
  const { products, deleteBicycle } = useProduct();
  const { setCurrentProduct } = useProductConfig()
  const [bikes, setBikes ] = useState(products)

	
	async function handleDeleteBike(productId: ProductId) {
		try {
			const response = await deleteBicycle(productId);
			console.log(response);
			if (response >= 200 && response < 300) {
				setBikes(bikes.filter(bike => bike.id !== productId)); 
			} else {
				alert("Failed to delete bike. Please try again.");
			}
		} catch (error) {
			console.error("Delete failed", error);
			alert("Failed to delete bike. Please try again.");
		}
	}


	function handleEditBike(product: Product) {
		setCurrentProduct(product)
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
