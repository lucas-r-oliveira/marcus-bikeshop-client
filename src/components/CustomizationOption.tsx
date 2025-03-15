import '../styles/components/CustomizationOption.css';
import { ProductPart } from "../types/product";

// TODO: state? Track selected options for product
export default function CustomizationOption(props: ProductPart) {

	return (
		<div className="customization-option-container">
			<label>{props.name}:</label>
			<select value="Blue" className='select-container'>
				{props.options.map((partOption) => (
					<option 
						disabled={partOption.stockStatus === "OUT_OF_STOCK"} 
						key={partOption.id} 
						value={partOption.name}
					>
						{partOption.name}
					</option>
				))}
			</select>
		</div>
	)
}