// Sample bike products that implement the given interfaces
import { Product } from "../types/product";

// Sample bike products that implement the given interfaces
export const sampleBikes: Product[] = [
	{
	  id: "bike-001",
	  name: "Mountain Explorer X1",
	  description: "A versatile mountain bike designed for all terrains. Perfect for trail riding and casual off-road adventures.",
	  basePrice: 1299.99,
	  currency: "EUR",
	  imageUrl: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
	  inStock: true,
	  category: "Mountain",
	  parts: [
		{
		  id: "frame-type",
		  name: "Frame Type",
		  options: [
			{ id: "full-suspension", name: "Full Suspension", stockStatus: "IN_STOCK" },
			{ id: "hardtail", name: "Hardtail", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "frame-finish",
		  name: "Frame Finish",
		  options: [
			{ id: "matte", name: "Matte", stockStatus: "IN_STOCK" },
			{ id: "shiny", name: "Shiny", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "wheels",
		  name: "Wheels",
		  options: [
			{ id: "mountain-wheels", name: "Mountain Wheels", stockStatus: "IN_STOCK" },
			{ id: "hybrid-wheels", name: "Hybrid Wheels", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "rim-color",
		  name: "Rim Color",
		  options: [
			{ id: "black", name: "Black", stockStatus: "IN_STOCK" },
			{ id: "blue", name: "Blue", stockStatus: "IN_STOCK" },
			{ id: "red", name: "Red", stockStatus: "OUT_OF_STOCK" }
		  ]
		}
	  ]
	},
	{
	  id: "bike-002",
	  name: "Urban Commuter Pro",
	  description: "Sleek city bike designed for daily commuting. Features a lightweight frame and comfortable riding position.",
	  basePrice: 899.99,
	  currency: "EUR",
	  imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
	  inStock: true,
	  category: "City",
	  parts: [
		{
		  id: "frame-type",
		  name: "Frame Type",
		  options: [
			{ id: "step-through", name: "Step-Through", stockStatus: "IN_STOCK" },
			{ id: "diamond", name: "Diamond", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "frame-finish",
		  name: "Frame Finish",
		  options: [
			{ id: "matte", name: "Matte", stockStatus: "IN_STOCK" },
			{ id: "shiny", name: "Shiny", stockStatus: "OUT_OF_STOCK" }
		  ]
		},
		{
		  id: "wheels",
		  name: "Wheels",
		  options: [
			{ id: "road-wheels", name: "Road Wheels", stockStatus: "IN_STOCK" },
			{ id: "hybrid-wheels", name: "Hybrid Wheels", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "rim-color",
		  name: "Rim Color",
		  options: [
			{ id: "black", name: "Black", stockStatus: "IN_STOCK" },
			{ id: "silver", name: "Silver", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "chain",
		  name: "Chain",
		  options: [
			{ id: "single-speed", name: "Single-Speed Chain", stockStatus: "IN_STOCK" },
			{ id: "8-speed", name: "8-Speed Chain", stockStatus: "IN_STOCK" }
		  ]
		}
	  ]
	},
	{
	  id: "bike-003",
	  name: "Fat Tire Cruiser",
	  description: "All-terrain fat tire bike built for adventure. Dominate sand, snow, and rough trails with ease.",
	  basePrice: 1499.99,
	  currency: "EUR",
	  imageUrl: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
	  inStock: true,
	  category: "Fat Bike",
	  parts: [
		{
		  id: "frame-type",
		  name: "Frame Type",
		  options: [
			{ id: "full-suspension", name: "Full Suspension", stockStatus: "IN_STOCK" },
			{ id: "diamond", name: "Diamond", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "frame-finish",
		  name: "Frame Finish",
		  options: [
			{ id: "matte", name: "Matte", stockStatus: "IN_STOCK" },
			{ id: "shiny", name: "Shiny", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "wheels",
		  name: "Wheels",
		  options: [
			{ id: "fat-bike-wheels", name: "Fat Bike Wheels", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "rim-color",
		  name: "Rim Color",
		  options: [
			{ id: "black", name: "Black", stockStatus: "IN_STOCK" },
			{ id: "blue", name: "Blue", stockStatus: "IN_STOCK" }
			// Note: Red rim color is unavailable for fat bike wheels per constraints
		  ]
		}
	  ]
	},
	{
	  id: "bike-004",
	  name: "Road Racer SL",
	  description: "Lightweight carbon frame racing bike designed for speed and performance. Perfect for competitive cycling.",
	  basePrice: 2199.99,
	  currency: "EUR",
	  imageUrl: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
	  inStock: false,  // Currently out of stock
	  category: "Road",
	  parts: [
		{
		  id: "frame-type",
		  name: "Frame Type",
		  options: [
			{ id: "diamond", name: "Diamond", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "frame-finish",
		  name: "Frame Finish",
		  options: [
			{ id: "matte", name: "Matte", stockStatus: "IN_STOCK" },
			{ id: "shiny", name: "Shiny", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "wheels",
		  name: "Wheels",
		  options: [
			{ id: "road-wheels", name: "Road Wheels", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "rim-color",
		  name: "Rim Color",
		  options: [
			{ id: "black", name: "Black", stockStatus: "IN_STOCK" },
			{ id: "red", name: "Red", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "chain",
		  name: "Chain",
		  options: [
			{ id: "8-speed", name: "8-Speed Chain", stockStatus: "IN_STOCK" },
			{ id: "11-speed", name: "11-Speed Chain", stockStatus: "IN_STOCK" }
		  ]
		}
	  ]
	},
	{
	  id: "bike-005",
	  name: "Hybrid Traveler",
	  description: "Versatile hybrid bike suitable for both city commuting and weekend trails. Offers comfort and reliability.",
	  basePrice: 749.99,
	  currency: "EUR",
	  imageUrl: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
	  inStock: true,
	  category: "Hybrid",
	  parts: [
		{
		  id: "frame-type",
		  name: "Frame Type",
		  options: [
			{ id: "step-through", name: "Step-Through", stockStatus: "IN_STOCK" },
			{ id: "diamond", name: "Diamond", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "frame-finish",
		  name: "Frame Finish",
		  options: [
			{ id: "matte", name: "Matte", stockStatus: "OUT_OF_STOCK" },
			{ id: "shiny", name: "Shiny", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "wheels",
		  name: "Wheels",
		  options: [
			{ id: "hybrid-wheels", name: "Hybrid Wheels", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "rim-color",
		  name: "Rim Color",
		  options: [
			{ id: "black", name: "Black", stockStatus: "IN_STOCK" },
			{ id: "blue", name: "Blue", stockStatus: "IN_STOCK" },
			{ id: "red", name: "Red", stockStatus: "IN_STOCK" }
		  ]
		},
		{
		  id: "chain",
		  name: "Chain",
		  options: [
			{ id: "7-speed", name: "7-Speed Chain", stockStatus: "IN_STOCK" },
			{ id: "8-speed", name: "8-Speed Chain", stockStatus: "OUT_OF_STOCK" }
		  ]
		}
	  ]
	}
  ];