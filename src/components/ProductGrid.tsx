import React from "react"
import '../styles/components/ProductGrid.css'

type Props = {
	children?: React.ReactNode
}

export default function ProductGrid({children}: Props) {
	return(
		<div className="grid-container">
			{children}
	  </div>
	)
}