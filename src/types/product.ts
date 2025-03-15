export type ProductId = string;
export type PartId = string;
export type OptionId = string;

type StockStatus = "IN_STOCK" | "OUT_OF_STOCK"

export interface PartOption {
	id: OptionId;
	name: string;
	stockStatus: StockStatus;
}

export interface ProductPart {
	id: PartId;
	name: string;
	options: PartOption[];
}

export interface Product {
	id: ProductId;
	name: string; // can also be title
	description: string;
	basePrice: number;
	//discountedPrice
	currency: string;
	imageUrl: string;
	inStock: boolean; //TODO: review: if one of the parts is out of stock, then so is the product
	category?: string;
	parts?:  ProductPart[]
	// do we differentiate between selected parts, default parts, customizable parts?
}


export interface SelectedProductConfig {
	productId: ProductId;
	selectedOptions: Record<PartId, OptionId>;
}