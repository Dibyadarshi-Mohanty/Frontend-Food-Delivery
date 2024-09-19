import React, { useState } from 'react'
import "./Home.css"
import HeroSection from '../../Components/HeroSection'
import ExploreMenu from '../../Components/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay';
import Footer from '../../Components/Footer/Footer';

export default function Home() {
  const [category,setcategory]=useState("All");
  return (
    <div>
       {/* <Header/> */}
      <HeroSection/>
<ExploreMenu category={category} setcategory={setcategory}/>
<FoodDisplay category={category}/>
<Footer/>
    </div>
  )
}
