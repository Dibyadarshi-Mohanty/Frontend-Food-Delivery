import React, { useContext } from "react";
import "./FoodItem.css";
import { StoreContext } from "../../Context/StoreContext";
export default function FoodItem({ id, name, description, price, image }) {
//   const [itemCount, setitemCount] = useState(0);
  const {cartitem , setcartitem,removefromcart,addtocart,url} = useContext(StoreContext);
  return (
    <div className=" food-item ">
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-img" />
        {!cartitem[id] ?
         (
          <img
            src="./public/Images/white-icon.png"
            alt=""
            className="add"
            onClick={() => addtocart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <img
              src="./public/Images/remove_icon_red.png"
              alt=""
              className="counter-btn"
              onClick={() => removefromcart(id)}
            />
            <p>{cartitem[id]}</p>
            <img
              src="./public/Images/add_icon_green.png"
              alt=""
              className="counter-btn"
              onClick={() => addtocart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <p>{name}</p>
      </div>
      <p className="food-item-description">{description}</p>
      <h5 className="food-item-price">&#8377;{price}</h5>
    </div>
  );
}
