import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css"; // Create this file for custom styles if needed
import { StoreContext } from "../../Context/StoreContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function PlaceOrder({ route }) {
  const location = useLocation();
  const { promoAvailable, paramsAmount, discount, discountamounttotal } =
    location.state;
  const {
    getTotalAmount,
    getDiscountAmount,
    getFinalAmount,
    discountPercentage,
    foodList,
    url,
    token,
    cartitem
  } = useContext(StoreContext);
  
  const subtotal = getTotalAmount();
  const discountAmount = getDiscountAmount();
  const deliveryFee = subtotal >= 899 || subtotal === 0 ? 0 : 70;
  const totalAmount = promoAvailable ? paramsAmount : getFinalAmount();

const [data , setdata] = useState({
  firstname:"",
  lastname:"",
  email:"",
  phone:"",
  street:"",
  city:"",
  state:"",
  zipcode:"",
country:"",
  address:"",

})

const handlechange = (event) => {
  const name = event.target.name;
  const  value  = event.target.value
setdata(data=>({...data,[name]:value}))
}

const placeOrder = async(event)=>{
  event.preventDefault()
  let orderItems = [];
  foodList.map((item)=>{
    if(cartitem[item._id]>0){
      let itemInfo = item;
      itemInfo["quantity"]= cartitem[item._id];
      orderItems.push(itemInfo);
     }
  })
  let orderData ={
    address:data,
    items:orderItems,
    amount:getFinalAmount()+deliveryFee,
  }
  let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
if(response.data.success){
  const {session_url}= response.data;
  window.location.replace(session_url);
}
else{
  alert("error");
}
}
const navigate = useNavigate();
useEffect(()=>{
if(!token){
  navigate("/cart");
}
else if (getTotalAmount===0){
  navigate("/cart");
  toast.error("Add some items in the cart ");
}
},[])

 
  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <h4>Delivery Information </h4>
        <div className="multi-fields">
          <input required type="text" placeholder="First name" onChange={handlechange} name="firstname" value={data.firstname}/>
          <input required  type="text" placeholder="Last name" onChange={handlechange} name="lastname" value={data.lastname} />
        </div>
        <input required type="email" placeholder="email" onChange={handlechange} name="email" value={data.email}/>
        <input required type="text" placeholder="street" onChange={handlechange} name="street" value={data.street} />
        <div className="multi-fields">
          <input required type="text" placeholder="City" onChange={handlechange} name="city" value={data.city}/>
          <input required type="text" placeholder="State" onChange={handlechange} name="state" value={data.state} />
        </div>
        <div className="multi-fields">
          <input required type="number" placeholder="Zip Code" onChange={handlechange} name="zipcode" value={data.zipcode}/>
          <input required type="text" placeholder="Country" onChange={handlechange} name="country" value={data.country} />
        </div>
        <input required type="number" placeholder="Phone" onChange={handlechange} name="phone" value={data.phone}/>
      </div>

      <div className="place-order-right">
        <div className="cart-bottom mb-5">
          <div className="cart-total">
            <h2 className="text-center">Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>&#8377;{subtotal}</p>
              </div>
              <hr />

              {subtotal >= 899 || subtotal === 0 ? (
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>FREE</p>
                </div>
              ) : (
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>&#8377;{deliveryFee}</p>
                </div>
              )}
              {discount !== 0 && discountamounttotal > 0 && (
                <>
                  <hr />
                  <div className="cart-total-details">
                    <p>Discount ({discount}%)</p>
                    <p>-&#8377;{discountamounttotal.toFixed(2)}</p>
                  </div>
                </>
              )}
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                {subtotal >= 899 || subtotal === 0 ? (
                  <b>&#8377;{totalAmount.toFixed(2)}</b>
                ) : (
                  <b>&#8377;{(totalAmount + deliveryFee).toFixed(2)}</b>
                )}
              </div>
            </div>
            <button className="cart-submit-btn" type="submit">Proceed to payment</button>
          </div>
        </div>
      </div>
    </form>
  );
}
