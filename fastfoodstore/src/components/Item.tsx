// Item.tsx
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/reducers/carSlice";
import { toast } from "react-toastify";
interface ItemProps {
  id: number;
  title: string;
  image: string;
  price: number;
  showProduct: (e: React.MouseEvent, id: number) => void; // Add showProduct prop
}

function Item({ id, title, image, price, showProduct }: ItemProps) {
  const dispatch = useDispatch();
  return (
    <div key={id} className="col-lg-4 col-md-6 text-center">
      <div className="single-product-item">
        <div className="product-image">
          <a href="single-product.html" onClick={(e) => showProduct(e, id)}>
            <img src={`http://127.0.0.1:8000/storage/${image}`} alt={title} />
          </a>
        </div>
        <h3>{title}</h3>
        <p className="product-price">
          <span>Tính Theo Số Lượng</span> {price}
        </p>
        <button
          onClick={() => {
            dispatch(
              addToCart({
                id,
                title,
                price,
                description: "",
                image,
                category_id: 0,
                created_at: "",
                updated_at: "",
              })
            );
            toast.success("added successfully");
          }}
        >
          <i className="fas fa-shopping-cart" /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Item;
