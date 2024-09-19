import React, { useContext, useState, useEffect } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartitem, removefromcart, foodList, getTotalAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();
  const conversionRate = 83; // Conversion rate from USD to INR

  // State for promo code and discount
  const [promoCode, setPromoCode] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [alertMessage, setAlertMessage] = useState("");

  // List of valid promo codes and corresponding discount percentages
  const validPromoCodes = {
    SAVE10: 10,
    SAVE20: 20,
    SAVE30: 30,
  };

  // Total amount before applying the discount
  const subtotal = getTotalAmount();
  const deliveryFee = 0.84;
  const [discountAmount, setDiscountAmount] = useState(0);
  const totalAmount = subtotal - discountAmount;

  // Function to handle promo code submission
  const handlePromoSubmit = () => {
    if (validPromoCodes[promoCode]) {
      const newDiscount = validPromoCodes[promoCode];
      setIsPromoValid(true);
      setDiscount(newDiscount);
      setAlertMessage(`You saved ₹${(((subtotal*conversionRate) * newDiscount) / 100).toFixed(2)} in this order!!`);
    } else {
      setIsPromoValid(false);
      setDiscount(0);
      setAlertMessage("Invalid Promo Code! Please try again.");
    }
  };

  useEffect(() => {
    setDiscountAmount((subtotal * discount) / 100);
  }, [discount, subtotal]);

  return (
    <div className="cart">
      <h1 className="text-center mb-4">Your Cart</h1>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price (INR)</p>
          <p>Quantity</p>
          <p>Total (INR)</p>
          <p>Remove</p>
        </div>
        <hr />
        {foodList.map((item, index) => {
          if (cartitem[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  {/* Convert item price from USD to INR */}
                  <p>₹{Math.trunc(item.price * conversionRate)}</p> 
                  <p>{cartitem[item._id]}</p>
                  <p>₹{(cartitem[item._id] * Math.trunc(item.price * conversionRate)).toFixed(2)}</p>
                  <p className="cross" onClick={() => removefromcart(item._id)}> X </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
        <div className="cart-bottom mb-5">
          <div className="cart-total">
            <h2 className="text-center">Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                {/* Convert subtotal to INR */}
                <p>₹{(subtotal * conversionRate).toFixed(2)}</p>
              </div>
              <hr />

              {subtotal*conversionRate >= 499 || subtotal*conversionRate === 0 ? (
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>FREE</p>
                </div>
              ) : (
                <div className="cart-total-details">
                  <p>Delivery Fee</p>
                  <p>₹{Math.trunc(deliveryFee * conversionRate)}</p>
                </div>
              )}
              {isPromoValid && (
                <>
                  <hr />
                  <div className="cart-total-details">
                    <p>Discount ({discount}%)</p>
                    <p>-₹{(discountAmount * conversionRate).toFixed(2)}</p>
                  </div>
                </>
              )}
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                {subtotal*conversionRate >= 499 || subtotal*conversionRate === 0 ? (
                  <b>₹{(totalAmount * conversionRate).toFixed(2)}</b>
                ) : (
                  <b>₹{((totalAmount + deliveryFee) * conversionRate).toFixed(2)}</b>
                )}
              </div>
            </div>
            <button
              className="cart-submit-btn mb-5"
              onClick={() =>
                navigate("/order", {
                  state: {
                    paramsAmount: totalAmount,
                    promoAvailable: promoCode ? true : false,
                    discount: discount,
                    discountamounttotal: discountAmount
                  },
                })
              }
            >
              Proceed to check out
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, enter it here</p>
              <div className="promocode-input">
                <input
                  type="text"
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button onClick={handlePromoSubmit}>Submit</button>
              </div>
              {alertMessage && (
                <div className="alert alert-danger mt-2" role="alert" style={{ maxWidth: "400px" }}>
                  {alertMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
