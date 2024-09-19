import React, { useContext, useEffect, useState } from 'react'
import "./Myorders.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
export default function Myorders() {
const[data,setdata]= useState([])
const {url,token } = useContext(StoreContext);

const fetchOrders = async()=>{
    const response = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
setdata(response.data.data);
}

useEffect(()=>{
    if(token){
        fetchOrders()
    }
},[token])
  return (
    <div className='myorders'>
      <h1 className='heading'>My Orders</h1>
      {data.length===0?<div className="container-optional"><p>Your cart is hungry! Start adding your favourite dishes now  <a href="/" className='link text-center'>Explore Menu </a> </p>
      
        <img src="./public/Images/hungry.png" alt="" /> </div>:
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="myorder-order">
<img src="" alt="" />
<p>{order.items.map((item,index)=>{
if(index === order.items.length-1){
    return item.name+" x "+item.quantity
}
else{
    return item.name+" x "+item.quantity+", "
}
        })}</p>
        <p>${order.amount}</p>
        <p>Items : {order.items.length}</p>
        <p><span>&#x25cf;</span><b>{order.status}</b></p>
        <button onClick={fetchOrders}>Track Order</button>

                </div>
                )
        })}
      </div>}
    </div>
  )
}
