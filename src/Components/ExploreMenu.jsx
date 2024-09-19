import React from 'react';
import { menulist } from '../Assests/assests';
import './ExploreMenu.css';

export default function ExploreMenu({category , setcategory}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1 className="display-5 fw-bold text-center" style={{ color: '#fa4a3b' }}>Explore Our Menu</h1>
      <p className='text-center'style={{ color: '#333', fontSize: '18px' }}>Our diverse menu offers a tantalizing selection of flavors and cuisines, crafted to delight every palate. Explore our menu and find the perfect meal to satisfy your cravings!</p>
      <div className="menu-list">
        {menulist.map((item, index) => (
          <div onClick={()=>setcategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="menu-list-item">
            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
