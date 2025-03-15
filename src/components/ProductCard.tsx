import { Link } from "react-router";
import "../styles/components/ProductCard.css";

import { Action } from "../types/common";

interface ProductCardProps {
  productId: string;
  name: string; // can also be title
  price: number;
  currency: string;
  imageUrl: string;
  description: string;
  inStock: boolean;
  actions?: [Action];
}

export default function ProductCard(props: ProductCardProps) {
  return (
    <div className="card-container">
      <Link to={`/products/${props.productId}`}>
        <img alt="" src={props.imageUrl} width={400}></img>
        <div className="text-info-container">
          <h4> {props.name} </h4>
          <p>
            {" "}
            {props.price} {props.currency}{" "}
          </p>
          <p> {props.description} </p>
        </div>
      </Link>
      <div>
        {props.actions?.map((action: Action) => (
          <button onClick={action.action} className="action-btn">
            {action.text}
          </button>
        ))}
      </div>
    </div>
  );
}
