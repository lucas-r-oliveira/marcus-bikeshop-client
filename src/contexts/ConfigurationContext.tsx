import { createContext, useContext, useState } from "react";
import { OptionId, PartId, Product, ProductId } from "../types/product";

interface ConfigurationState {
	currentProductId: ProductId | null;
	selectedOptions: Record<PartId, OptionId>;
}

interface ConfigurationContextType {
	currentProductId: ProductId | null;
	selectedOptions: Record<PartId, OptionId>;
	setCurrentProduct: (product: Product) => void;
	selectOption: (partId: PartId, optionId: OptionId) => void;
	resetConfiguration: () => void;
	isConfigurationValid: () => boolean;
}
const ConfigurationContext = createContext<ConfigurationContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useProductConfig(): ConfigurationContextType  {
	const context = useContext(ConfigurationContext);
	if (context === null) {
		throw new Error('useProductConfig must be used within a ConfifgurationProvider');
	}
	return context;
}

type Props = {
	children?: React.ReactNode
}
export default function ConfifgurationProvider({children}: Props) {
	//const { constraints } = useConstraints();
	const [configState, setConfigState] = useState<ConfigurationState>({
		currentProductId: null,
		selectedOptions: {}
	})

	//TODO: review
	function setCurrentProduct(product: Product) {
		const initialOptions: Record<PartId, OptionId> = {};
		
		//FIXME:
		//product.parts?.forEach(part => {
		//	const inStockOption = part.options.find(option => option.stockStatus === "IN_STOCK");
		//	if (part.options.length === 1 || inStockOption) {
		//		initialOptions[part.id] = inStockOption?.id || part.options[0].id;
		//	}
		//});
		//product.availableCharacteristics.forEach(characteristic => {
		//	const inStockOptions = characteristic
		//})
		
		setConfigState({
			currentProductId: product.id,
			selectedOptions: initialOptions
		});
	};	

	function selectOption(characteristicType: string, optionName: string) {
		setConfigState(prevState => ({
			...prevState,
			selectedOptions: {
				...prevState.selectedOptions,
				[characteristicType]: optionName
			}
		}))
	}

	function resetConfiguration() {
		setConfigState({
			currentProductId: null,
			selectedOptions: {}
		});
	};

	function isConfigurationValid(): boolean {
		//TODO:
		return true;
	}


	const value: ConfigurationContextType = {
		currentProductId: configState.currentProductId,
		selectedOptions: configState.selectedOptions,
		setCurrentProduct,
		selectOption,
		resetConfiguration,
		isConfigurationValid,
	}

	return (
		<ConfigurationContext.Provider value={value}>
			{children}
		</ConfigurationContext.Provider>
	)
}
