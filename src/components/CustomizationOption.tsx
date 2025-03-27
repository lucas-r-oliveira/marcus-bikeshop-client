import '../styles/components/CustomizationOption.css';
import { CharacteristicType, Option} from '../types/product';

interface Props {
	characteristicType: CharacteristicType;
	options: Option[];
	selectOption: (characteristicType: CharacteristicType, optionName: string) => void;
}

export default function CustomizationOption(props: Props/*props: ProductPart*/) {
	return (
		<div className="customization-option-container">

			<label>{props.characteristicType}:</label>
			<select 
				className='select-container' 
				onChange={(e)=> props?.selectOption(props.characteristicType, e.target.value)}>
				{props.options.map((option) => (
					<option 
						disabled={!option.inStock} 
						key={option.name} 
						value={option.name}
					>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}