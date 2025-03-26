import axios from 'axios';


export interface PartOptionSelection {[key: string]: string}

export interface AddToCartRequest {
  productId: string;
  selections: PartOptionSelection[];
}

export interface CartItemResponse {
  id: string;
  productId: string;
  qty: number;
  selections: PartOptionSelection[];
  unitPrice: number;
}

export interface CartResponse {
  id: string;
  items: CartItemResponse[];
}

export interface CreateProductRequest {
  basePrice: number;
  category: string;
  currency: string;
  description: string;
  imageUrl: string;
  name: string;
  parts: PartOptionSelection[];
}

export interface PartConfigurationResponse {
  availableOptions: PartOptionResponse[];
  id: string;
  partId: string;
}

export interface PartOptionResponse {
  id: string;
  inStock: boolean;
  name: string;
}


export interface ProductPartResponse {
  id: string;
  name: string;
  options: PartOptionResponse[];
}

export interface ProductResponse {
  basePrice: number;
  category: string;
  currency: string;
  description: string;
  id: string;
  imageUrl: string;
  name: string;
  partConfigs: PartConfigurationResponse[];
  parts: ProductPartResponse[];
}

export interface UpdateCartItemQtyRequest {
  qty: number;
}

function toCamelCase(obj: object): object {
    if (Array.isArray(obj)) {
        return obj.map((v) => toCamelCase(v));
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/_([a-z])/g, (_, char) => char.toUpperCase()), 
                toCamelCase(value),
            ])
        );
    }
    return obj;
};

const toSnakeCase = (obj: object): object => {
    if (Array.isArray(obj)) {
        return obj.map((v) => toSnakeCase(v));
    } else if (obj !== null && typeof obj === "object") {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [
                key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`), 
                toSnakeCase(value),
            ])
        );
    }
    return obj;
};

axios.interceptors.response.use((response) => {
    response.data = toCamelCase(response.data);
    return response;
});

axios.interceptors.request.use((config) => {
    if (config.data) {
        config.data = toSnakeCase(config.data);
    }
    return config;
});

export class ProductStoreApi {
  private baseUrl: string;

  constructor(baseUrl: string = '/') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
  }

  async fetchBicycles(): Promise<ProductResponse[]> {
    const response = await axios.get<ProductResponse[]>(`${this.baseUrl}/products/bicycles`);
    return response.data;
  }

  async createBicycle(product: CreateProductRequest): Promise<ProductResponse> {
    const response = await axios.post<ProductResponse>(`${this.baseUrl}/products/bicycles`, product);
    return response.data;
  }

  async fetchCart(cartId: string): Promise<CartResponse> {
    const response = await axios.get<CartResponse>(`${this.baseUrl}/cart/${cartId}`);
    return response.data;
  }

  async addToCart(cartId: string, item: AddToCartRequest): Promise<CartResponse> {
    const response = await axios.post<CartResponse>(`${this.baseUrl}/cart/${cartId}/items`, item);
    return response.data;
  }

  async removeFromCart(cartId: string, itemId: string): Promise<CartResponse> {
    const response = await axios.delete<CartResponse>(`${this.baseUrl}/cart/${cartId}/items/${itemId}`);
    return response.data;
  }

  async updateCartItemQuantity(
    cartId: string, 
    itemId: string, 
    update: UpdateCartItemQtyRequest
  ): Promise<CartResponse> {
    const response = await axios.patch<CartResponse>(
      `${this.baseUrl}/cart/${cartId}/items/${itemId}`, 
      update
    );
    return response.data;
  }
}
export const createProductStoreApi = (baseUrl?: string) => new ProductStoreApi(baseUrl);