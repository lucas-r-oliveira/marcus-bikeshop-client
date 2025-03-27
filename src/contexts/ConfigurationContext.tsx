import { createContext, useContext, useState } from "react";
import { OptionId, PartId, Product, ProductId, CharacteristicType, Option } from "../types/product";

interface ConfigurationState {
	currentProductId: ProductId | null;
	selectedOptions: Record<CharacteristicType, string>
}

interface ConfigurationContextType {
	currentProductId: ProductId | null;
	selectedOptions: Record<PartId, OptionId>;
	setCurrentProduct: (product: Product) => void;
	selectOption: (charType: CharacteristicType, optionName: string) => void;
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
		selectedOptions: {} as Record<CharacteristicType, string>
	})

	//TODO: review
	function setCurrentProduct(product: Product) {
		const initialOptions: Record<PartId, OptionId> = {};

		// group characteristics by type
		const characteristicMap = new Map<CharacteristicType, Option[]>();

		product.availableCharacteristics.forEach(characteristic => {
			if (!characteristicMap.has(characteristic.characteristicType)) {
				characteristicMap.set(characteristic.characteristicType, []);
			}
			characteristicMap.get(characteristic.characteristicType)!.push({ name: characteristic.name, inStock: characteristic.inStock});
		});

		characteristicMap.forEach((options, type) => {
			if (!(type in configState.selectedOptions)) {
				const selOption = options.find(opt => opt.inStock);
				if (!selOption) {
					console.warn(`No in-stock option found for type: ${type}`);
					return;
				}
				initialOptions[type] = selOption.name;
			}
		});

		setConfigState({
			currentProductId: product.id,
			selectedOptions: initialOptions
		});
	};	

	function selectOption(characteristicType: CharacteristicType, optionName: string) {
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
			selectedOptions: {} as Record<CharacteristicType, string>
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
