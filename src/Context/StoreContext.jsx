import { createContext, useState, useEffect } from "react";
import { foodList } from "../Assests/assests";
import axios from "axios";

export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {
  const [cartitem, setcartitem] = useState({});
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const url = "https://backend-food-delivery-vigj.onrender.com";
  const [token, setToken] = useState("");

  const [foodList, setfoodList] = useState([]);

  const addtocart = async (itemId) => {
    if (!cartitem[itemId]) {
      setcartitem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/addcart",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removefromcart = async (itemId) => {
    setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/removecart",
        { itemId },
        { headers: { token } }
      );
    }
  };
  const fetchfoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setfoodList(response.data.data);
    console.log(response.data.data);
  };
  const loadcartdata = async (token) => {
    try {
      const response = await axios.get(url + "/api/cart/getcart", {
        headers: { token },
      });
      setcartitem(response.data.cartData || {});
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchfoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadcartdata(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  //TODO  TODO styling
  if (foodList.length === 0) {
    return (
      <div className="buffer">
        <div className="loading"></div>
        <p className="buffer-text"><span>Bistro Bliss</span> will be right back </p>;
      </div>
    );
    
  }
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (let item in cartitem) {
      let iteminfo = foodList.find((product) => product._id === item);
      totalAmount += iteminfo.price * cartitem[item];
    }
    return totalAmount;
  };

  //   const applyDiscount = (discountPercent, promoCode) => {
  //     const subtotal = getTotalAmount();
  //     const discountValue = (subtotal * discountPercent) / 100;
  //     setDiscountAmount(discountValue);
  //     setDiscountPercentage(discountPercent);
  //     setPromoCode(promoCode);
  //   };
  // Calculate the discount amount
  const getDiscountAmount = () => {
    const subtotal = getTotalAmount();
    return (subtotal * discountPercentage) / 100;
  };

  // Get the final total amount after applying discounts and delivery fee
  const getFinalAmount = () => {
    const subtotal = getTotalAmount();
    const discountValue = getDiscountAmount();
    const deliveryFee = subtotal >= 899 || subtotal === 0 ? 0 : 70;
    return subtotal - discountValue + deliveryFee;
  };

  // Apply discount using promo code
  const applyDiscount = (discountPercent, promoCode) => {
    setDiscountPercentage(discountPercent);
    setPromoCode(promoCode);
  };
  const contextvalue = {
    foodList,
    cartitem,
    setcartitem,
    addtocart,
    removefromcart,
    getTotalAmount,
    getDiscountAmount,
    getFinalAmount,
    applyDiscount,
    discountPercentage,
    promoCode,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextvalue}>
      {props.children}
    </StoreContext.Provider>
  );
}
