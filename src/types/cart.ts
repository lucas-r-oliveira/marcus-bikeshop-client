import { SelectedProductConfig } from "./product";

export interface CartItem extends SelectedProductConfig {
	cartItemId: string;
	name: string;
	basePrice: number;
	imageUrl: string;
	//timestamp: number
	qty: number;
}
