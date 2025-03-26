import '../styles/components/CustomizationOption.css';

//FIXME: defined in the parent component
interface Option {
	name: string;
	inStock: boolean;
}

interface Props {
	characteristicType: string;
	options: Option[];
	//TODO: review
	selectOption: (characteristicType: string, optionName: string) => void;
}
export default function CustomizationOption(props: Props/*props: ProductPart*/) {

	return (
		<div className="customization-option-container">

			<label>{props.characteristicType}:</label>
			<select className='select-container'>
				{props.options.map((option) => (
					<option 
						disabled={!option.inStock} 
						key={option.name} 
						value={option.name}
						onSelect={()=> props?.selectOption(props.characteristicType, option.name)}
					>
						{option.name}
					</option>
				))}
			</select>
		</div>
	)
}