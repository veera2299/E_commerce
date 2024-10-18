import React, { useContext, useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { ShopContext } from '../../context/ShopContext';
const NewCollections = () => {

  const [newCollection, setNewCollection] = useState([]);
  const {Backend_URL} = useContext(ShopContext);

  useEffect(()=>{
    fetch(`${Backend_URL}/product/newcollections`)
    .then(res => res.json())
    .then(data => setNewCollection(data));
  },[])

  return (
  
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {newCollection.map((item,i)=>{
            return <Item  key={i} id={item.id} name ={item.name} image ={item.image} new_price={item.new_price} old_price = {item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewCollections
