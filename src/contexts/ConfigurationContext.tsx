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
	defaultCharacteristicsMap: Map<CharacteristicType, Option[]>;
	availCharacteristicsMap: Map<CharacteristicType, Option[]>;
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
type CharacteristicsMapType = Map<CharacteristicType, Option[]>

export default function ConfifgurationProvider({children}: Props) {
	//const { constraints } = useConstraints();
	const [configState, setConfigState] = useState<ConfigurationState>({
		currentProductId: null,
		selectedOptions: {} as Record<CharacteristicType, string>
	})
	const [availCharacteristicsMap, setAvailCharacteristicsMap] = useState<CharacteristicsMapType>(new Map())
	const [defaultCharacteristicsMap, setDefaultCharacteristicsMap] = useState<CharacteristicsMapType>(new Map())

	//TODO: review
	function setCurrentProduct(product: Product) {
		const initialOptions: Record<CharacteristicType, string> = {} as Record<CharacteristicType, string>;

		// group characteristics by type
		const aCharacteristicsMap = new Map<CharacteristicType, Option[]>();
		const dCharacteristicsMap = new Map<CharacteristicType, Option[]>();

		if (product.defaultCharacteristics) {
			product.defaultCharacteristics.forEach(characteristic => {
				if (!dCharacteristicsMap.has(characteristic.characteristicType)) {
					dCharacteristicsMap.set(characteristic.characteristicType, []);
				}
				dCharacteristicsMap.get(characteristic.characteristicType)!.push({ name: characteristic.name, inStock: characteristic.inStock });
			});
		}
		if (product.availableCharacteristics) {
			product.availableCharacteristics.forEach(characteristic => {
				if (!aCharacteristicsMap.has(characteristic.characteristicType)) {
					aCharacteristicsMap.set(characteristic.characteristicType, []);
				}
				aCharacteristicsMap.get(characteristic.characteristicType)!.push({ name: characteristic.name, inStock: characteristic.inStock });
			});
		}

		setAvailCharacteristicsMap(aCharacteristicsMap)
		setDefaultCharacteristicsMap(dCharacteristicsMap)

		aCharacteristicsMap.forEach((options, type) => {
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
		defaultCharacteristicsMap,
		availCharacteristicsMap,
	}

	return (
		<ConfigurationContext.Provider value={value}>
			{children}
		</ConfigurationContext.Provider>
	)
}
